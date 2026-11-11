
import * as FileSystem from 'expo-file-system/legacy';
import { PDFDocument, degrees } from 'pdf-lib';

export type PDFFile = {
  uri: string;
  name: string;
  mimeType?: string | null;
};

export type PDFResult = {
  uri: string;
  name: string;
};

/**
 * Read a PDF from the app's local cache as Base64.
 */
const getPDFBase64 = async (uri: string): Promise<string> => {
  if (!uri || !uri.startsWith('file://')) {
    throw new Error(
      'Invalid PDF location. Please select the PDF again.'
    );
  }

  const info = await FileSystem.getInfoAsync(uri);

  if (!info.exists || info.isDirectory) {
    throw new Error(
      'The selected PDF is not available in app storage.'
    );
  }

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (!base64) {
    throw new Error('The selected PDF is empty or unreadable.');
  }

  return base64;
};

/**
 * Load a PDF document.
 */
const loadPDF = async (file: PDFFile): Promise<PDFDocument> => {
  if (!file?.uri) {
    throw new Error('Please select a PDF file.');
  }

  const base64 = await getPDFBase64(file.uri);

  try {
    return await PDFDocument.load(base64, {
      ignoreEncryption: false,
    });
  } catch (error) {
    console.error('PDF loading error:', error);

    throw new Error(
      `Unable to open ${file.name}. Please select a valid, unprotected PDF.`
    );
  }
};

/**
 * Save a generated PDF in the app cache.
 */
const savePDF = async (
  pdf: PDFDocument,
  fileName: string
): Promise<PDFResult> => {
  try {
    const directory = FileSystem.cacheDirectory;

    if (!directory) {
      throw new Error('App cache directory is unavailable.');
    }

    const safeName = fileName.replace(/[<>:"/\\|?*]/g, '_');
    const outputName = `${Date.now()}_${safeName}`;
    const outputUri = `${directory}${outputName}`;

    const base64 = await pdf.saveAsBase64({
      dataUri: false,
    });

    await FileSystem.writeAsStringAsync(outputUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const info = await FileSystem.getInfoAsync(outputUri);

    if (!info.exists || info.isDirectory) {
      throw new Error('Generated PDF could not be saved.');
    }

    return {
      uri: outputUri,
      name: safeName,
    };
  } catch (error) {
    console.error('PDF save error:', error);

    throw new Error(
      error instanceof Error
        ? error.message
        : 'Unable to save the generated PDF.'
    );
  }
};

/**
 * 1. MERGE PDF FILES
 */
export const mergePDFs = async (
  files: PDFFile[]
): Promise<PDFResult> => {
  if (files.length < 2) {
    throw new Error('Select at least two PDF files to merge.');
  }

  const mergedPDF = await PDFDocument.create();

  for (const file of files) {
    const sourcePDF = await loadPDF(file);

    const pages = await mergedPDF.copyPages(
      sourcePDF,
      sourcePDF.getPageIndices()
    );

    pages.forEach((page) => mergedPDF.addPage(page));
  }

  return savePDF(mergedPDF, 'merged_document.pdf');
};

/**
 * 2. SPLIT PDF INTO INDIVIDUAL PAGES
 */
export const splitPDF = async (
  file: PDFFile
): Promise<PDFResult[]> => {
  const sourcePDF = await loadPDF(file);
  const totalPages = sourcePDF.getPageCount();

  const results: PDFResult[] = [];

  for (let i = 0; i < totalPages; i++) {
    const newPDF = await PDFDocument.create();

    const [page] = await newPDF.copyPages(sourcePDF, [i]);

    newPDF.addPage(page);

    const result = await savePDF(
      newPDF,
      `split_page_${i + 1}.pdf`
    );

    results.push(result);
  }

  return results;
};

/**
 * 3. ROTATE ALL PDF PAGES
 */
export const rotatePDF = async (
  file: PDFFile,
  rotation: 90 | 180 | 270 = 90
): Promise<PDFResult> => {
  const pdf = await loadPDF(file);

  pdf.getPages().forEach((page) => {
    const currentRotation = page.getRotation().angle;

    page.setRotation(
      degrees((currentRotation + rotation) % 360)
    );
  });

  return savePDF(pdf, 'rotated_document.pdf');
};

/**
 * 4. EXTRACT SELECTED PAGES
 * Page numbers start at 1.
 */
export const extractPDFPages = async (
  file: PDFFile,
  selectedPages: number[]
): Promise<PDFResult> => {
  if (!selectedPages.length) {
    throw new Error('Select at least one page to extract.');
  }

  const sourcePDF = await loadPDF(file);
  const totalPages = sourcePDF.getPageCount();

  const pageIndices = selectedPages.map((pageNumber) => {
    if (
      !Number.isInteger(pageNumber) ||
      pageNumber < 1 ||
      pageNumber > totalPages
    ) {
      throw new Error(
        `Page number must be between 1 and ${totalPages}.`
      );
    }

    return pageNumber - 1;
  });

  const extractedPDF = await PDFDocument.create();

  const pages = await extractedPDF.copyPages(
    sourcePDF,
    pageIndices
  );

  pages.forEach((page) => extractedPDF.addPage(page));

  return savePDF(extractedPDF, 'extracted_pages.pdf');
};

/**
 * 5. BASIC PDF RE-SAVE.
 * This does not guarantee a smaller file size.
 */
export const compressPDF = async (
  file: PDFFile
): Promise<PDFResult> => {
  const pdf = await loadPDF(file);

  return savePDF(pdf, 'compressed_document.pdf');
};

/**
 * 6. GET PDF PAGE COUNT
 */
export const getPDFPageCount = async (
  file: PDFFile
): Promise<number> => {
  const pdf = await loadPDF(file);

  return pdf.getPageCount();
};

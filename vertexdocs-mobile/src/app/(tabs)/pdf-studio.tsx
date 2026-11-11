
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

import type { PDFFile, PDFResult } from '../../services/pdfService';

import {
  mergePDFs,
  splitPDF,
  rotatePDF,
  extractPDFPages,
  compressPDF,
  getPDFPageCount,
} from '../../services/pdfService';

const C = {
  navy: '#142B4A',
  teal: '#087F73',
  bg: '#F4F7FB',
  white: '#FFFFFF',
  text: '#25364D',
  muted: '#788392',
  border: '#E7EAF0',
};

const toolItems = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files',
    icon: 'git-merge-outline',
    color: '#E9EFFB',
    tint: '#4773B8',
  },
  {
    title: 'Split PDF',
    description: 'Separate every page into a PDF',
    icon: 'cut-outline',
    color: '#FCEAE7',
    tint: '#C45B4D',
  },
  {
    title: 'Compress PDF',
    description: 'Re-save your PDF document',
    icon: 'file-tray-full-outline',
    color: '#E5F4EF',
    tint: '#24836E',
  },
  {
    title: 'Convert PDF',
    description: 'Convert PDF to other formats',
    icon: 'swap-horizontal-outline',
    color: '#F1EAF9',
    tint: '#8762AE',
  },
  {
    title: 'Rotate Pages',
    description: 'Rotate all pages by 90 degrees',
    icon: 'refresh-outline',
    color: '#FBF1E2',
    tint: '#B47D32',
  },
  {
    title: 'Extract Pages',
    description: 'Save selected pages',
    icon: 'copy-outline',
    color: '#E8F1F8',
    tint: '#477FA9',
  },
];

export default function PDFStudioScreen() {
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [pageRange, setPageRange] = useState('1-1');
  const [extractModalVisible, setExtractModalVisible] = useState(false);

  // Pick PDFs and use the app-cache copy created by DocumentPicker.
  const choosePDF = async (multiple = false): Promise<PDFFile[]> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple,
      });

      if (result.canceled || !result.assets?.length) {
        return [];
      }

      const files: PDFFile[] = [];

      for (const asset of result.assets) {
        // The picker must provide a local file URI.
        if (!asset.uri.startsWith('file://')) {
          throw new Error(
            'Android did not create a local PDF copy. Please try selecting the file again.'
          );
        }

        const info = await FileSystem.getInfoAsync(asset.uri);

        if (!info.exists || info.isDirectory) {
          throw new Error(
            `The selected file "${asset.name}" is not readable from app storage.`
          );
        }

        files.push({
          uri: asset.uri,
          name: asset.name,
          mimeType: asset.mimeType || 'application/pdf',
        });
      }

      return files;
    } catch (error: any) {
      console.error('PDF picker error:', error);

      throw new Error(
        error?.message || 'Unable to access the selected PDF.'
      );
    }
  };

  const selectPDF = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setStatus('Selecting PDF...');

      const files = await choosePDF(false);

      if (!files.length) return;

      setStatus('Checking PDF...');

      const count = await getPDFPageCount(files[0]);

      setSelectedFile(files[0]);
      setPageCount(count);

      Alert.alert(
        'PDF ready',
        `${files[0].name}\n${count} page(s) detected.`
      );
    } catch (error: any) {
      Alert.alert(
        'Unable to select PDF',
        error?.message || 'Please try again.'
      );
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const shareResult = async (result: PDFResult) => {
    try {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        Alert.alert(
          'Sharing unavailable',
          'Sharing is unavailable on this device.'
        );
        return;
      }

      await Sharing.shareAsync(result.uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Save or share ${result.name}`,
      });
    } catch (error: any) {
      Alert.alert(
        'Sharing failed',
        error?.message || 'Unable to share this PDF.'
      );
    }
  };

  const runTask = async (
    label: string,
    task: () => Promise<void>
  ) => {
    if (loading) return;

    try {
      setLoading(true);
      setStatus(label);
      await task();
    } catch (error: any) {
      Alert.alert(
        'Operation failed',
        error?.message || 'Unable to process this PDF.'
      );
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const getOneFile = async (): Promise<PDFFile | null> => {
    if (selectedFile) return selectedFile;

    const files = await choosePDF(false);

    if (!files.length) return null;

    const count = await getPDFPageCount(files[0]);

    setSelectedFile(files[0]);
    setPageCount(count);

    return files[0];
  };

  const handleMerge = () => {
    runTask('Selecting PDFs...', async () => {
      const files = await choosePDF(true);

      if (files.length < 2) {
        Alert.alert('Select PDFs', 'Choose at least two PDF files.');
        return;
      }

      setStatus('Merging PDF files...');

      const result = await mergePDFs(files);

      Alert.alert('Merge complete', 'Your merged PDF is ready.', [
        { text: 'Close', style: 'cancel' },
        {
          text: 'Share PDF',
          onPress: () => shareResult(result),
        },
      ]);
    });
  };

  const handleSplit = () => {
    runTask('Splitting PDF...', async () => {
      const file = await getOneFile();

      if (!file) return;

      const results = await splitPDF(file);

      Alert.alert(
        'Split completed',
        `${results.length} individual PDF files created.`,
        [
          { text: 'Close', style: 'cancel' },
          {
            text: 'Share first page',
            onPress: () => shareResult(results[0]),
          },
        ]
      );
    });
  };

  const handleRotate = () => {
    runTask('Rotating pages...', async () => {
      const file = await getOneFile();

      if (!file) return;

      const result = await rotatePDF(file, 90);

      Alert.alert(
        'Rotation complete',
        'All pages were rotated by 90 degrees.',
        [
          { text: 'Close', style: 'cancel' },
          {
            text: 'Share PDF',
            onPress: () => shareResult(result),
          },
        ]
      );
    });
  };

  const handleCompress = () => {
    runTask('Re-saving PDF...', async () => {
      const file = await getOneFile();

      if (!file) return;

      const result = await compressPDF(file);

      Alert.alert(
        'PDF re-saved',
        'A new PDF was created. This basic re-save does not guarantee a smaller file size.',
        [
          { text: 'Close', style: 'cancel' },
          {
            text: 'Share PDF',
            onPress: () => shareResult(result),
          },
        ]
      );
    });
  };

  const handleExtract = async () => {
    if (loading) return;

    try {
      let file = selectedFile;

      if (!file) {
        setLoading(true);
        setStatus('Selecting PDF...');

        const files = await choosePDF(false);

        if (!files.length) return;

        file = files[0];

        const count = await getPDFPageCount(file);

        setSelectedFile(file);
        setPageCount(count);
      }

      setPageRange('1-1');
      setExtractModalVisible(true);
    } catch (error: any) {
      Alert.alert(
        'Unable to select PDF',
        error?.message || 'Please select a valid PDF.'
      );
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const confirmExtract = () => {
    if (!selectedFile) return;

    const match = pageRange.trim().match(/^(\d+)\s*-\s*(\d+)$/);

    if (!match) {
      Alert.alert('Invalid page range', 'Enter a range such as 1-3.');
      return;
    }

    const start = Number(match[1]);
    const end = Number(match[2]);

    if (
      start < 1 ||
      end < start ||
      end > (pageCount || 0)
    ) {
      Alert.alert(
        'Invalid page range',
        `Enter a range between 1 and ${pageCount || 0}.`
      );
      return;
    }

    const pages = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );

    setExtractModalVisible(false);

    runTask('Extracting pages...', async () => {
      const result = await extractPDFPages(selectedFile, pages);

      Alert.alert('Extraction complete', 'Your extracted PDF is ready.', [
        { text: 'Close', style: 'cancel' },
        {
          text: 'Share PDF',
          onPress: () => shareResult(result),
        },
      ]);
    });
  };

  const handleTool = (title: string) => {
    switch (title) {
      case 'Merge PDF':
        handleMerge();
        break;
      case 'Split PDF':
        handleSplit();
        break;
      case 'Compress PDF':
        handleCompress();
        break;
      case 'Rotate Pages':
        handleRotate();
        break;
      case 'Extract Pages':
        handleExtract();
        break;
      case 'Convert PDF':
        Alert.alert(
          'Conversion not connected',
          'PDF conversion requires a separate conversion engine. This feature is not implemented yet.'
        );
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>DOCUMENT TOOLS</Text>
            <Text style={styles.heading}>PDF Studio</Text>
            <Text style={styles.subheading}>
              Everything for your PDF documents.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={C.teal}
            />
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="documents-outline"
              size={25}
              color={C.white}
            />
          </View>

          <Text style={styles.heroTitle}>Your PDF workspace</Text>

          <Text style={styles.heroDescription}>
            Manage and organize your documents from one place.
          </Text>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={selectPDF}
            disabled={loading}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={19}
              color={C.navy}
            />
            <Text style={styles.selectButtonText}>Select PDF File</Text>
          </TouchableOpacity>
        </View>

        {selectedFile && (
          <View style={styles.selectedCard}>
            <View style={styles.fileIcon}>
              <Ionicons
                name="document-text"
                size={23}
                color="#C45B4D"
              />
            </View>

            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1}>
                {selectedFile.name}
              </Text>
              <Text style={styles.fileMeta}>
                {pageCount ?? 0} page(s) · Ready to process
              </Text>
            </View>

            <TouchableOpacity onPress={selectPDF} disabled={loading}>
              <Ionicons
                name="refresh-outline"
                size={20}
                color={C.teal}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>PDF Tools</Text>
            <Text style={styles.sectionSub}>
              Choose a document operation
            </Text>
          </View>
          <Text style={styles.count}>06 TOOLS</Text>
        </View>

        <View style={styles.toolsCard}>
          {toolItems.map((tool, index) => (
            <TouchableOpacity
              key={tool.title}
              style={[
                styles.toolRow,
                index === toolItems.length - 1 && styles.lastRow,
              ]}
              onPress={() => handleTool(tool.title)}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.toolIcon,
                  { backgroundColor: tool.color },
                ]}
              >
                <Ionicons
                  name={tool.icon as any}
                  size={22}
                  color={tool.tint}
                />
              </View>

              <View style={styles.toolDetails}>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDescription}>
                  {tool.description}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#A0A8B3"
              />
            </TouchableOpacity>
          ))}
        </View>

        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator color={C.teal} />
            <Text style={styles.loadingText}>
              {status || 'Processing...'}
            </Text>
          </View>
        )}

        <View style={styles.infoCard}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={C.teal}
          />
          <View style={styles.infoDetails}>
            <Text style={styles.infoTitle}>Document workspace</Text>
            <Text style={styles.infoDescription}>
              PDF processing is performed locally on your device. Share
              the generated file to save it in your preferred location.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>VERTEX DOCS · PDF STUDIO</Text>
        <View style={{ height: 35 }} />
      </ScrollView>

      <Modal
        visible={extractModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setExtractModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Extract PDF Pages</Text>

            <Text style={styles.modalDescription}>
              Enter the page range to extract. This PDF has {pageCount || 0}
              {' '}page(s).
            </Text>

            <TextInput
              style={styles.rangeInput}
              value={pageRange}
              onChangeText={setPageRange}
              placeholder="Example: 1-3"
              placeholderTextColor={C.muted}
              keyboardType="numbers-and-punctuation"
            />

            <Text style={styles.rangeHint}>
              Example: 1-3 extracts pages 1, 2 and 3.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setExtractModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.extractButton}
                onPress={confirmExtract}
              >
                <Text style={styles.extractButtonText}>Extract</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    paddingHorizontal: 21,
    paddingTop: 17,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  eyebrow: {
    color: C.teal,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 7,
  },
  heading: {
    fontSize: 27,
    fontWeight: '700',
    color: C.navy,
  },
  subheading: {
    fontSize: 12,
    color: C.muted,
    marginTop: 5,
  },
  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    backgroundColor: C.navy,
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  heroIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: C.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: C.white,
  },
  heroDescription: {
    fontSize: 12,
    color: '#D0DCE8',
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 17,
  },
  selectButton: {
    alignSelf: 'flex-start',
    backgroundColor: C.white,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectButtonText: {
    color: C.navy,
    fontSize: 12,
    fontWeight: '700',
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 13,
    marginBottom: 23,
  },
  fileIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FCEAE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileDetails: {
    flex: 1,
    marginHorizontal: 11,
  },
  fileName: {
    color: C.text,
    fontWeight: '700',
    fontSize: 12,
  },
  fileMeta: {
    color: C.muted,
    fontSize: 10,
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: C.navy,
  },
  sectionSub: {
    fontSize: 11,
    color: C.muted,
    marginTop: 4,
  },
  count: {
    fontSize: 9,
    fontWeight: '700',
    color: C.teal,
    letterSpacing: 0.7,
  },
  toolsCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 13,
    marginBottom: 20,
  },
  toolRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  toolIcon: {
    width: 43,
    height: 43,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolDetails: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  toolTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
  },
  toolDescription: {
    fontSize: 10,
    color: C.muted,
    marginTop: 5,
  },
  loadingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: C.white,
    borderRadius: 12,
    marginBottom: 20,
  },
  loadingText: {
    color: C.navy,
    fontSize: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F5F2',
    borderRadius: 12,
    padding: 14,
    gap: 11,
  },
  infoDetails: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: C.navy,
  },
  infoDescription: {
    fontSize: 10,
    color: C.muted,
    lineHeight: 16,
    marginTop: 4,
  },
  footer: {
    textAlign: 'center',
    fontSize: 9,
    color: '#A0A8B3',
    letterSpacing: 1,
    fontWeight: '600',
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 22,
  },
  modalTitle: {
    color: C.navy,
    fontSize: 20,
    fontWeight: '700',
  },
  modalDescription: {
    color: C.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  rangeInput: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: C.text,
    fontSize: 16,
    marginTop: 18,
  },
  rangeHint: {
    color: C.muted,
    fontSize: 11,
    marginTop: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 22,
  },
  cancelButton: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: '#EEF1F5',
  },
  cancelButtonText: {
    color: C.text,
    fontWeight: '600',
  },
  extractButton: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: C.teal,
  },
  extractButtonText: {
    color: C.white,
    fontWeight: '700',
  },
});

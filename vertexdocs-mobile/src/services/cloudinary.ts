
import * as FileSystem from 'expo-file-system/legacy';

const CLOUD_NAME = 'mldv9tae';
const UPLOAD_PRESET = 'vertexdocs_upload';

interface DocumentFile {
  uri: string;
  name: string;
  mimeType?: string | null;
}

interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  name: string;
  format: string;
  size: number;
}

export async function uploadDocument(
  file: DocumentFile
): Promise<CloudinaryUploadResult> {
  if (!file.uri) {
    throw new Error('No document URI was provided.');
  }

  const uploadUrl =
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  const response = await FileSystem.uploadAsync(
    uploadUrl,
    file.uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
      mimeType: file.mimeType || 'application/octet-stream',
      parameters: {
        upload_preset: UPLOAD_PRESET,
        folder: 'vertexdocs',
      },
    }
  );

  let result: any;

  try {
    result = JSON.parse(response.body);
  } catch {
    throw new Error('Cloudinary returned an invalid response.');
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      result.error?.message || 'Document upload failed.'
    );
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
    name: file.name,
    format: result.format || '',
    size: result.bytes || 0,
  };
}

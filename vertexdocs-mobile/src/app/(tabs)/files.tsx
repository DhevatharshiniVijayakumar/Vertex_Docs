
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { uploadDocument } from '../../services/cloudinary';

const C = {
  navy: '#142B4A',
  teal: '#087F73',
  background: '#F4F7FB',
  white: '#FFFFFF',
  text: '#25364D',
  secondary: '#788392',
  muted: '#A0A8B3',
  border: '#E7EAF0',
  lightTeal: '#E7F5F2',
};

const sampleFiles = [
  {
    id: '1',
    name: 'Project_Proposal.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: 'Today',
    icon: 'document-text-outline',
    color: '#FCEAE7',
    iconColor: '#C45B4D',
  },
  {
    id: '2',
    name: 'College_Report.docx',
    type: 'DOCX',
    size: '1.1 MB',
    date: 'Today',
    icon: 'document-outline',
    color: '#E9EFFB',
    iconColor: '#4773B8',
  },
  {
    id: '3',
    name: 'Tamil_Notes.pdf',
    type: 'PDF',
    size: '850 KB',
    date: 'Yesterday',
    icon: 'document-text-outline',
    color: '#E5F4EF',
    iconColor: '#24836E',
  },
  {
    id: '4',
    name: 'Presentation.pptx',
    type: 'PPTX',
    size: '3.2 MB',
    date: 'Yesterday',
    icon: 'easel-outline',
    color: '#F1EAF9',
    iconColor: '#8762AE',
  },
  {
    id: '5',
    name: 'Data_Analysis.xlsx',
    type: 'XLSX',
    size: '720 KB',
    date: '20 Oct 2026',
    icon: 'grid-outline',
    color: '#E8F3E9',
    iconColor: '#54875D',
  },
];

const filters = ['All', 'PDF', 'DOCX', 'PPTX', 'XLSX'];

const allowedExtensions = ['PDF', 'DOCX', 'PPTX', 'XLSX'];

const getFileIcon = (extension: string) => {
  switch (extension) {
    case 'PDF':
      return 'document-text-outline';
    case 'PPTX':
      return 'easel-outline';
    case 'XLSX':
      return 'grid-outline';
    default:
      return 'document-outline';
  }
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return 'Uploaded';

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function FilesScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const allFiles = useMemo(
    () => [...uploadedFiles, ...sampleFiles],
    [uploadedFiles]
  );

  const filteredFiles = useMemo(() => {
    return allFiles.filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFilter =
        filter === 'All' || file.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [allFiles, search, filter]);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      if (!file) {
        Alert.alert('Error', 'No file was selected.');
        return;
      }

      const extension =
        file.name.split('.').pop()?.toUpperCase() || '';

      if (!allowedExtensions.includes(extension)) {
        Alert.alert(
          'Unsupported file',
          'Please select a PDF, DOCX, PPTX or XLSX file.'
        );
        return;
      }

      const maxSize = 10 * 1024 * 1024;

      if (file.size !== undefined && file.size > maxSize) {
        Alert.alert(
          'File too large',
          'Please select a file smaller than 10 MB.'
        );
        return;
      }

      setUploading(true);

      const uploaded = await uploadDocument({
        uri: file.uri,
        name: file.name,
        mimeType: file.mimeType,
      });

      const newFile = {
        id: uploaded.publicId,
        name: file.name,
        type: extension,
        size: formatFileSize(file.size),
        date: 'Just now',
        icon: getFileIcon(extension),
        color: C.lightTeal,
        iconColor: C.teal,
        url: uploaded.url,
        publicId: uploaded.publicId,
      };

      setUploadedFiles((previous) => [newFile, ...previous]);

      Alert.alert(
        'Upload successful!',
        `${file.name} uploaded successfully.`
      );
    } catch (error: any) {
      Alert.alert(
        'Upload failed',
        error?.message ||
          'Something went wrong. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const showFileOptions = (file: any) => {
    const actions: any[] = [];

    if (file.url) {
      actions.push({
        text: 'Copy file link',
        onPress: () => {
          Alert.alert('File uploaded', file.url);
        },
      });
    }

    actions.push({
      text: 'Rename',
      onPress: () =>
        Alert.alert(
          'Rename',
          'Rename functionality will be connected next.'
        ),
    });

    actions.push({
      text: 'Delete',
      style: 'destructive',
      onPress: () =>
        Alert.alert(
          'Delete',
          'Delete functionality will be connected next.'
        ),
    });

    actions.push({
      text: 'Cancel',
      style: 'cancel',
    });

    Alert.alert(file.name, 'File actions', actions);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR WORKSPACE</Text>
            <Text style={styles.title}>My Files</Text>
            <Text style={styles.subtitle}>
              All your documents, in one place.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            activeOpacity={0.75}
            onPress={() =>
              Alert.alert(
                'Profile',
                'Open your Profile tab to manage your account.'
              )
            }
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={C.navy}
            />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={19}
            color={C.secondary}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search files and documents"
            placeholderTextColor={C.muted}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons
                name="close-circle"
                size={19}
                color={C.secondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Storage */}
        <View style={styles.storageCard}>
          <View style={styles.storageTop}>
            <View style={styles.storageIcon}>
              <Ionicons
                name="cloud-outline"
                size={21}
                color={C.teal}
              />
            </View>

            <View style={styles.storageHeading}>
              <Text style={styles.storageLabel}>
                CLOUD STORAGE
              </Text>
              <Text style={styles.storageTitle}>
                Your space
              </Text>
            </View>

            <Text style={styles.storagePercent}>21%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.storageBottom}>
            <Text style={styles.storageUsed}>3.2 GB used</Text>
            <Text style={styles.storageTotal}>of 15 GB</Text>
          </View>
        </View>

        {/* Documents heading */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Documents
            </Text>
            <Text style={styles.sectionSubtitle}>
              Browse your saved files
            </Text>
          </View>

          <Text style={styles.fileCount}>
            {filteredFiles.length}{' '}
            {filteredFiles.length === 1 ? 'FILE' : 'FILES'}
          </Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((item) => {
            const active = filter === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.filterButton,
                  active && styles.activeFilter,
                ]}
                onPress={() => setFilter(item)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.activeFilterText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* File list */}
        <View style={styles.fileList}>
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file, index) => (
              <View
                key={file.id}
                style={[
                  styles.fileRow,
                  index === filteredFiles.length - 1 &&
                    styles.lastFileRow,
                ]}
              >
                <View
                  style={[
                    styles.fileIcon,
                    { backgroundColor: file.color },
                  ]}
                >
                  <Ionicons
                    name={file.icon as any}
                    size={22}
                    color={file.iconColor}
                  />
                </View>

                <View style={styles.fileInfo}>
                  <Text
                    style={styles.fileName}
                    numberOfLines={1}
                  >
                    {file.name}
                  </Text>

                  <View style={styles.fileMeta}>
                    <Text style={styles.fileType}>
                      {file.type}
                    </Text>

                    <View style={styles.metaDot} />

                    <Text style={styles.fileDetails}>
                      {file.size}
                    </Text>

                    <View style={styles.metaDot} />

                    <Text style={styles.fileDetails}>
                      {file.date}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => showFileOptions(file)}
                  activeOpacity={0.65}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={19}
                    color={C.secondary}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="folder-open-outline"
                  size={30}
                  color={C.teal}
                />
              </View>

              <Text style={styles.emptyTitle}>
                No files found
              </Text>

              <Text style={styles.emptySubtitle}>
                Try a different name or choose another file type.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setSearch('');
                  setFilter('All');
                }}
              >
                <Text style={styles.resetText}>
                  Clear filters
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Upload */}
        <TouchableOpacity
          style={[
            styles.uploadButton,
            uploading && { opacity: 0.7 },
          ]}
          activeOpacity={0.85}
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color={C.white} />
          ) : (
            <Ionicons
              name="cloud-upload-outline"
              size={20}
              color={C.white}
            />
          )}

          <Text style={styles.uploadText}>
            {uploading
              ? 'Uploading document...'
              : 'Upload new document'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          VERTEX DOCS  ·  YOUR DOCUMENT WORKSPACE
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 21,
    paddingTop: 17,
    paddingBottom: 42,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: C.teal,
    marginBottom: 7,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: C.navy,
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: 13,
    color: C.secondary,
    marginTop: 5,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 19,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: C.text,
  },
  storageCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 15,
    padding: 17,
    marginBottom: 29,
  },
  storageTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storageIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: C.lightTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storageHeading: {
    flex: 1,
    marginLeft: 11,
  },
  storageLabel: {
    fontSize: 9,
    letterSpacing: 1.1,
    color: C.secondary,
    fontWeight: '700',
  },
  storageTitle: {
    fontSize: 14,
    color: C.navy,
    fontWeight: '700',
    marginTop: 3,
  },
  storagePercent: {
    fontSize: 17,
    color: C.teal,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E9EEF2',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 17,
  },
  progressFill: {
    width: '21.3%',
    height: '100%',
    backgroundColor: C.teal,
    borderRadius: 5,
  },
  storageBottom: {
    flexDirection: 'row',
    marginTop: 9,
  },
  storageUsed: {
    fontSize: 11,
    color: C.text,
    fontWeight: '600',
  },
  storageTotal: {
    fontSize: 11,
    color: C.secondary,
    marginLeft: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: C.navy,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: C.secondary,
    marginTop: 4,
  },
  fileCount: {
    fontSize: 10,
    color: C.teal,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  filterScroll: {
    flexGrow: 0,
    marginBottom: 14,
  },
  filterContent: {
    paddingRight: 5,
  },
  filterButton: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.white,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: C.navy,
    borderColor: C.navy,
  },
  filterText: {
    fontSize: 11,
    color: C.secondary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: C.white,
  },
  fileList: {
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 13,
  },
  fileRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
    paddingVertical: 12,
  },
  lastFileRow: {
    borderBottomWidth: 0,
  },
  fileIcon: {
    width: 43,
    height: 43,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
  },
  fileName: {
    fontSize: 12,
    color: C.text,
    fontWeight: '700',
  },
  fileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  fileType: {
    fontSize: 9,
    color: C.teal,
    fontWeight: '700',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: C.muted,
    marginHorizontal: 6,
  },
  fileDetails: {
    fontSize: 9,
    color: C.secondary,
  },
  moreButton: {
    padding: 7,
    marginLeft: 3,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 42,
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: C.lightTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.navy,
    marginTop: 14,
  },
  emptySubtitle: {
    fontSize: 11,
    color: C.secondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  resetText: {
    fontSize: 12,
    color: C.teal,
    fontWeight: '700',
    marginTop: 13,
  },
  uploadButton: {
    height: 49,
    borderRadius: 10,
    backgroundColor: C.navy,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    gap: 9,
  },
  uploadText: {
    fontSize: 13,
    color: C.white,
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    color: C.muted,
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '600',
    marginTop: 25,
  },
});


import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const documents = [
  {
    name: 'Project_Proposal.pdf',
    details: '10m ago • 2.4 MB',
    type: 'PDF',
    color: '#FFE5E2',
    icon: '📕',
  },
  {
    name: 'College_Report.docx',
    details: '2h ago • 1.1 MB',
    type: 'DOCX',
    color: '#E1EAFE',
    icon: '📘',
  },
  {
    name: 'Tamil_Notes.pdf',
    details: 'Yesterday • 850 KB',
    type: 'PDF',
    color: '#D9F8F1',
    icon: '🌐',
  },
];

const tools = [
  { name: 'PDF Studio', desc: 'Annotate & sign', icon: '📑', color: '#FFE0DD' },
  { name: 'Language', desc: 'EN ↔ TA Bridge', icon: '🌐', color: '#B8FFF0' },
  { name: 'Ask Vertex AI', desc: 'Instant doc synthesis', icon: '✨', color: '#E9DFFF' },
  { name: 'Scan Doc', desc: 'Auto-edge capture', icon: '📷', color: '#DFE9FF' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FD" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>V</Text>
            </View>
            <Text style={styles.brandName}>Vertex Docs</Text>
          </View>

          <TouchableOpacity style={styles.avatar}>
            <Text style={{ fontSize: 23 }}>👩🏻</Text>
          </TouchableOpacity>
        </View>

        {/* GREETING */}
        <View style={styles.greetingRow}>
          <View>
            <Text style={styles.greeting}>Hello, Alex ✨</Text>
            <Text style={styles.subtitle}>
              Your documents, all in one place
            </Text>
          </View>

          <TouchableOpacity style={styles.notification}>
            <Text style={{ fontSize: 22 }}>♧</Text>
            <View style={styles.dot} />
          </TouchableOpacity>
        </View>

        {/* UPLOAD CARD */}
        <View style={styles.uploadCard}>
          <View style={styles.uploadIcon}>
            <Text style={{ fontSize: 30 }}>☁</Text>
          </View>

          <Text style={styles.uploadTitle}>Upload Document</Text>

          <Text style={styles.uploadDescription}>
            Tap to select PDF, DOCX, XLSX, or scan
            {'\n'}directly from camera
          </Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => alert('Document upload will be added next!')}
          >
            <Text style={styles.uploadButtonText}>
              ⊕  Upload New File
            </Text>
          </TouchableOpacity>
        </View>

        {/* QUICK TOOLS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK TOOLS</Text>
          <Text style={styles.ready}>Bilingual Ready</Text>
        </View>

        <View style={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={styles.toolCard}
              onPress={() => alert(tool.name + ' will be developed next!')}
            >
              <View style={[styles.toolIcon, { backgroundColor: tool.color }]}>
                <Text style={{ fontSize: 21 }}>{tool.icon}</Text>
              </View>

              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolDescription}>{tool.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT DOCUMENTS */}
        <View style={styles.sectionHeader}>
          <View style={styles.recentTitleRow}>
            <Text style={styles.sectionHeading}>Recent Documents</Text>
            <Text style={styles.total}>12 Total</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {documents.map((doc, index) => (
          <TouchableOpacity key={index} style={styles.documentCard}>
            <View style={[styles.documentIcon, { backgroundColor: doc.color }]}>
              <Text style={{ fontSize: 22 }}>{doc.icon}</Text>
            </View>

            <View style={styles.documentInfo}>
              <Text style={styles.documentName}>{doc.name}</Text>
              <View style={styles.documentDetails}>
                <Text style={styles.documentMeta}>{doc.details}</Text>
                <Text style={styles.documentReady}>Ready</Text>
              </View>
            </View>

            <Text style={styles.more}>⋮</Text>
          </TouchableOpacity>
        ))}

        {/* LIVE SYNCHRONIZATION */}
        <Text style={styles.sectionTitle}>LIVE SYNCHRONIZATION</Text>

        <View style={styles.syncCard}>
          <View style={styles.syncRow}>
            <Text style={{ fontSize: 19 }}>🌐</Text>
            <View style={styles.syncInfo}>
              <Text style={styles.syncTitle}>
                Tamil_Notes.pdf translated to English Draft
              </Text>
              <Text style={styles.syncDescription}>
                2h ago • Verified Unicode
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.syncRow}>
            <Text style={{ fontSize: 19 }}>🔄</Text>
            <View style={styles.syncInfo}>
              <Text style={styles.syncTitle}>Cloud sync completed</Text>
              <Text style={styles.syncDescription}>
                4h ago • 3 files synced to Vertex Cloud
              </Text>
            </View>
          </View>
        </View>

        {/* STORAGE */}
        <View style={styles.storageCard}>
          <View style={styles.storageHeader}>
            <Text style={styles.storageTitle}>☁  Storage Usage</Text>
            <Text style={styles.storageAmount}>3.2 GB of 15 GB</Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.storageFooter}>
            <Text style={styles.storageLegend}>● PDFs (1.8 GB)</Text>
            <Text style={styles.storageLegend}>● Docs (1.4 GB)</Text>
            <Text style={styles.upgrade}>Upgrade</Text>
          </View>
        </View>

      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        {[
          ['⌂', 'Home'],
          ['▣', 'Files'],
          ['▤', 'PDF Studio'],
          ['文', 'Language'],
          ['♙', 'Profile'],
        ].map(([icon, label], index) => (
          <TouchableOpacity key={label} style={styles.navItem}>
            <Text style={[styles.navIcon, index === 0 && styles.activeIcon]}>
              {icon}
            </Text>
            <Text style={[styles.navLabel, index === 0 && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8FD',
  },
  scroll: {
    paddingHorizontal: 17,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  logo: {
    width: 36,
    height: 36,
    backgroundColor: '#142B50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#5DE4D0',
    fontSize: 23,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#142B50',
  },
  avatar: {
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#DCE5EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#15294D',
  },
  subtitle: {
    color: '#646B7A',
    fontSize: 13,
    marginTop: 4,
  },
  notification: {
    width: 43,
    height: 43,
    borderRadius: 24,
    backgroundColor: '#EDF1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#008675',
    right: 10,
    top: 9,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 19,
    alignItems: 'center',
    marginBottom: 23,
    elevation: 3,
    shadowColor: '#AAB8C5',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  uploadIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#DCEEEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#17294E',
  },
  uploadDescription: {
    color: '#687080',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#007466',
    width: '100%',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#51596A',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  ready: {
    color: '#008675',
    fontSize: 11,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 19,
  },
  toolCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 9,
    minHeight: 104,
    elevation: 1,
  },
  toolIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#192C50',
  },
  toolDescription: {
    fontSize: 10,
    color: '#70798A',
    marginTop: 3,
  },
  recentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#17294E',
  },
  total: {
    fontSize: 9,
    color: '#52617A',
    backgroundColor: '#E8ECF7',
    padding: 4,
    borderRadius: 6,
  },
  seeAll: {
    fontSize: 12,
    color: '#007466',
    fontWeight: 'bold',
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIcon: {
    width: 39,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  documentName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#263552',
  },
  documentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 5,
  },
  documentMeta: {
    fontSize: 9,
    color: '#737B89',
  },
  documentReady: {
    color: '#008675',
    backgroundColor: '#E1F5ED',
    fontSize: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  more: {
    fontSize: 22,
    color: '#566176',
    paddingHorizontal: 5,
  },
  syncCard: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    marginBottom: 14,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  syncInfo: {
    flex: 1,
  },
  syncTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#283A59',
  },
  syncDescription: {
    fontSize: 9,
    color: '#7C8491',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#EFF1F5',
    marginVertical: 11,
  },
  storageCard: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderRadius: 14,
    marginBottom: 15,
  },
  storageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storageTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#283A59',
  },
  storageAmount: {
    fontSize: 10,
    color: '#52617A',
  },
  progressBackground: {
    height: 7,
    backgroundColor: '#E8EDF2',
    borderRadius: 5,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    width: '21.3%',
    height: '100%',
    backgroundColor: '#007466',
    borderRadius: 5,
  },
  storageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  storageLegend: {
    fontSize: 9,
    color: '#536078',
  },
  upgrade: {
    fontSize: 10,
    color: '#008675',
    fontWeight: 'bold',
  },
  bottomNav: {
    height: 65,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEEF3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    fontSize: 21,
    color: '#667085',
  },
  activeIcon: {
    color: '#007466',
  },
  navLabel: {
    fontSize: 9,
    color: '#697386',
    marginTop: 3,
  },
  activeLabel: {
    color: '#007466',
    fontWeight: 'bold',
  },
});


import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  useLuxuryTheme,
  luxurySpacing,
  luxuryRadius,
} from '../constants/designSystem';

import { auth } from '../../config/firebase';

const recentFiles = [
  {
    name: 'Project_Proposal.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: '10 min ago',
    icon: 'document-text-outline' as const,
  },
  {
    name: 'College_Report.docx',
    type: 'DOCX',
    size: '1.1 MB',
    date: '2 hours ago',
    icon: 'document-outline' as const,
  },
  {
    name: 'Tamil_Notes.pdf',
    type: 'PDF',
    size: '850 KB',
    date: 'Yesterday',
    icon: 'document-text-outline' as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const C = useLuxuryTheme();

  // Get the currently logged-in Firebase user's name
  const userName =
    auth.currentUser?.displayName?.trim() ||
    auth.currentUser?.email?.split('@')[0] ||
    'there';

  const isDark = C.background === '#101A20';

  const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: C.background,
    },
    scroll: {
      flex: 1,
    },
    content: {
      paddingHorizontal: luxurySpacing.screen,
      paddingTop: 12,
      paddingBottom: 38,
    },

    // HEADER
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 34,
    },
    brandGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
    },
    brandMark: {
      width: 42,
      height: 42,
      backgroundColor: C.primary,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandMarkText: {
      color: C.background,
      fontSize: 21,
      fontWeight: '800',
      letterSpacing: -1,
    },
    brandName: {
      color: C.foreground,
      fontSize: 19,
      fontWeight: '800',
      letterSpacing: -0.7,
    },
    brandCaption: {
      color: C.secondary,
      fontSize: 9,
      letterSpacing: 2,
      marginTop: 2,
      textTransform: 'uppercase',
    },
    profileButton: {
      height: 43,
      width: 43,
      borderRadius: 22,
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // GREETING
    greetingLabel: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 2,
      color: C.accent,
      textTransform: 'uppercase',
      marginBottom: 10,
    },
    greetingTitle: {
      color: C.foreground,
      fontSize: 31,
      lineHeight: 38,
      fontWeight: '700',
      letterSpacing: -1.3,
    },
    greetingSubtitle: {
      fontSize: 13,
      color: C.secondary,
      lineHeight: 21,
      marginTop: 8,
      marginBottom: 26,
    },

    // HERO
    hero: {
      backgroundColor: C.hero,
      borderRadius: luxuryRadius.large,
      padding: 23,
      overflow: 'hidden',
      marginBottom: 35,
      minHeight: 225,
    },
    heroDecoration: {
      position: 'absolute',
      right: -40,
      top: -55,
      width: 190,
      height: 190,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: C.heroMuted,
      opacity: 0.18,
    },
    heroDecorationInner: {
      position: 'absolute',
      right: -5,
      top: -20,
      width: 125,
      height: 125,
      borderRadius: 70,
      borderWidth: 1,
      borderColor: C.heroMuted,
      opacity: 0.18,
    },
    heroEyebrow: {
      color: C.heroMuted,
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 2,
      marginBottom: 13,
    },
    heroTitle: {
      color: C.heroText,
      fontSize: 25,
      fontWeight: '700',
      lineHeight: 32,
      letterSpacing: -0.6,
      maxWidth: 240,
    },
    heroDescription: {
      color: C.heroMuted,
      fontSize: 12,
      lineHeight: 19,
      marginTop: 9,
      maxWidth: 235,
    },
    heroButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: C.accent,
      paddingHorizontal: 17,
      height: 43,
      borderRadius: 10,
      marginTop: 19,
      gap: 9,
    },
    heroButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },

    // SECTIONS
    section: {
      marginBottom: 34,
    },
    sectionHeading: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 17,
    },
    sectionTitle: {
      fontSize: 19,
      color: C.foreground,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
    sectionCaption: {
      fontSize: 10,
      color: C.secondary,
      marginTop: 4,
    },
    viewAll: {
      fontSize: 11,
      color: C.accent,
      fontWeight: '700',
    },

    // QUICK TOOLS
    toolsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    tool: {
      width: '48%',
      flexGrow: 1,
      minHeight: 91,
      padding: 14,
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: luxuryRadius.medium,
      justifyContent: 'space-between',
    },
    toolTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toolNumber: {
      fontSize: 10,
      color: C.muted,
    },
    toolTitle: {
      color: C.foreground,
      fontSize: 13,
      fontWeight: '700',
      marginTop: 13,
    },

    // RECENT FILES
    fileList: {
      borderTopWidth: 1,
      borderTopColor: C.border,
    },
    fileRow: {
      minHeight: 76,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: C.border,
      gap: 13,
    },
    fileIcon: {
      width: 43,
      height: 46,
      borderRadius: 11,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fileDetails: {
      flex: 1,
    },
    fileName: {
      color: C.foreground,
      fontSize: 12,
      fontWeight: '700',
    },
    fileMeta: {
      color: C.secondary,
      fontSize: 10,
      marginTop: 6,
    },

    // STORAGE
    storagePanel: {
      backgroundColor: C.surface,
      borderRadius: luxuryRadius.medium,
      borderWidth: 1,
      borderColor: C.border,
      padding: 18,
    },
    storageTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    storageLabel: {
      color: C.secondary,
      fontSize: 11,
    },
    storageValue: {
      color: C.foreground,
      fontSize: 21,
      fontWeight: '700',
      marginTop: 5,
    },
    storageTotal: {
      color: C.secondary,
      fontSize: 11,
    },
    progressTrack: {
      height: 7,
      backgroundColor: C.progressTrack,
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 20,
    },
    progressFill: {
      width: '21.3%',
      height: '100%',
      backgroundColor: C.accent,
      borderRadius: 10,
    },
    storageFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    storageFooterText: {
      color: C.secondary,
      fontSize: 10,
    },
    footer: {
      textAlign: 'center',
      color: C.muted,
      fontSize: 10,
      letterSpacing: 0.5,
      paddingTop: 4,
      paddingBottom: 12,
    },
  });

  const openPlaceholder = (feature: string) => {
    Alert.alert(
      feature,
      'This feature will be connected in a future update.'
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* BRAND HEADER */}
        <View style={styles.header}>
          <View style={styles.brandGroup}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>V.</Text>
            </View>

            <View>
              <Text style={styles.brandName}>Vertex Docs</Text>
              <Text style={styles.brandCaption}>
                Your document space
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="person-outline"
              size={19}
              color={C.foreground}
            />
          </TouchableOpacity>
        </View>

        {/* GREETING */}
        <Text style={styles.greetingLabel}>
          YOUR WORKSPACE
        </Text>

        <Text style={styles.greetingTitle}>
          Welcome, {userName}!
        </Text>

        <Text style={styles.greetingSubtitle}>
          A quieter space for better work. Everything you need,
          beautifully organized.
        </Text>

        {/* FEATURED UPLOAD PANEL */}
        <View style={styles.hero}>
          <View style={styles.heroDecoration} />
          <View style={styles.heroDecorationInner} />

          <Text style={styles.heroEyebrow}>
            DOCUMENT MANAGEMENT
          </Text>

          <Text style={styles.heroTitle}>
            Your ideas deserve a place.
          </Text>

          <Text style={styles.heroDescription}>
            Bring your documents together and keep your work
            moving effortlessly.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => openPlaceholder('Upload document')}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={19} color="#FFFFFF" />
            <Text style={styles.heroButtonText}>
              Upload a document
            </Text>
          </TouchableOpacity>
        </View>

        {/* QUICK TOOLS */}
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Made for your workflow
              </Text>
              <Text style={styles.sectionCaption}>
                Your essential tools, close at hand
              </Text>
            </View>
          </View>

          <View style={styles.toolsGrid}>
            <TouchableOpacity
              style={styles.tool}
              onPress={() => router.push('/(tabs)/pdf-studio')}
              activeOpacity={0.75}
            >
              <View style={styles.toolTop}>
                <Ionicons
                  name="documents-outline"
                  size={21}
                  color={C.accent}
                />
                <Text style={styles.toolNumber}>01</Text>
              </View>
              <Text style={styles.toolTitle}>PDF Studio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tool}
              onPress={() => router.push('/(tabs)/language')}
              activeOpacity={0.75}
            >
              <View style={styles.toolTop}>
                <Ionicons
                  name="globe-outline"
                  size={21}
                  color={C.accent}
                />
                <Text style={styles.toolNumber}>02</Text>
              </View>
              <Text style={styles.toolTitle}>Language tools</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tool}
              onPress={() => openPlaceholder('Ask Vertex AI')}
              activeOpacity={0.75}
            >
              <View style={styles.toolTop}>
                <Ionicons
                  name="sparkles-outline"
                  size={21}
                  color={C.accent}
                />
                <Text style={styles.toolNumber}>03</Text>
              </View>
              <Text style={styles.toolTitle}>Ask Vertex AI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tool}
              onPress={() => openPlaceholder('Scan document')}
              activeOpacity={0.75}
            >
              <View style={styles.toolTop}>
                <Ionicons
                  name="scan-outline"
                  size={21}
                  color={C.accent}
                />
                <Text style={styles.toolNumber}>04</Text>
              </View>
              <Text style={styles.toolTitle}>Scan document</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RECENT DOCUMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Recently opened
              </Text>
              <Text style={styles.sectionCaption}>
                Pick up where you left off
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/files')}
            >
              <Text style={styles.viewAll}>
                VIEW ALL →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fileList}>
            {recentFiles.map((file) => (
              <TouchableOpacity
                key={file.name}
                style={styles.fileRow}
                onPress={() => openPlaceholder(file.name)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.fileIcon,
                    { backgroundColor: C.surfaceAlt },
                  ]}
                >
                  <Ionicons
                    name={file.icon}
                    size={22}
                    color={C.accent}
                  />
                </View>

                <View style={styles.fileDetails}>
                  <Text
                    style={styles.fileName}
                    numberOfLines={1}
                  >
                    {file.name}
                  </Text>

                  <Text style={styles.fileMeta}>
                    {file.type} · {file.size} · {file.date}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color={C.muted}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* STORAGE */}
        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>
                Your storage
              </Text>
              <Text style={styles.sectionCaption}>
                Space at a glance
              </Text>
            </View>
          </View>

          <View style={styles.storagePanel}>
            <View style={styles.storageTop}>
              <View>
                <Text style={styles.storageLabel}>
                  Currently using
                </Text>
                <Text style={styles.storageValue}>
                  3.2 GB
                </Text>
              </View>

              <Text style={styles.storageTotal}>
                of 15 GB
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>

            <View style={styles.storageFooter}>
              <Text style={styles.storageFooterText}>
                21.3% used
              </Text>
              <Text style={styles.storageFooterText}>
                11.8 GB available
              </Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
          VERTEX DOCS · MADE FOR CLARITY
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}


import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const C = {
  navy: '#142B4A',
  teal: '#087F73',
  bg: '#F4F7FB',
  white: '#FFFFFF',
  text: '#25364D',
  secondary: '#788392',
  muted: '#A0A8B3',
  border: '#E7EAF0',
  lightTeal: '#E7F5F2',
};

const languages = [
  { name: 'English', native: 'English', code: 'EN' },
  { name: 'Tamil', native: 'தமிழ்', code: 'TA' },
  { name: 'Hindi', native: 'हिन्दी', code: 'HI' },
  { name: 'Malayalam', native: 'മലയാളം', code: 'ML' },
  { name: 'Telugu', native: 'తెలుగు', code: 'TE' },
  { name: 'Kannada', native: 'ಕನ್ನಡ', code: 'KN' },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState('English');
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      languages.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.native.toLowerCase().includes(search.toLowerCase()) ||
          item.code.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const selectedLanguage = languages.find(
    (item) => item.name === selected
  );

  const applyLanguage = () => {
    Alert.alert(
      'Language Preference',
      `${selected} has been selected as your preferred language.`
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>PERSONAL PREFERENCES</Text>
            <Text style={styles.title}>Language</Text>
            <Text style={styles.subtitle}>
              Make your documents feel familiar.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="language-outline"
              size={23}
              color={C.teal}
            />
          </View>
        </View>

        {/* FEATURE BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerTop}>
            <View style={styles.bannerIcon}>
              <Ionicons
                name="globe-outline"
                size={25}
                color={C.white}
              />
            </View>
            <Text style={styles.bannerLabel}>LANGUAGE BRIDGE</Text>
          </View>

          <Text style={styles.bannerTitle}>
            Your language.{'\n'}Your documents.
          </Text>

          <Text style={styles.bannerDescription}>
            Choose the language you are most comfortable with
            and personalize your Vertex Docs experience.
          </Text>

          <View style={styles.bannerFooter}>
            <Ionicons
              name="checkmark-circle-outline"
              size={17}
              color="#A9E9DC"
            />
            <Text style={styles.bannerFooterText}>
              6 languages available
            </Text>
          </View>
        </View>

        {/* SELECTED LANGUAGE */}
        <View style={styles.selectedSection}>
          <Text style={styles.sectionTitle}>Current preference</Text>

          <View style={styles.selectedCard}>
            <View style={styles.selectedIcon}>
              <Ionicons
                name="checkmark"
                size={22}
                color={C.teal}
              />
            </View>

            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>SELECTED LANGUAGE</Text>
              <Text style={styles.selectedName}>
                {selectedLanguage?.name}
              </Text>
              <Text style={styles.selectedNative}>
                {selectedLanguage?.native}
              </Text>
            </View>

            <View style={styles.selectedCode}>
              <Text style={styles.selectedCodeText}>
                {selectedLanguage?.code}
              </Text>
            </View>
          </View>
        </View>

        {/* LANGUAGE LIST */}
        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>Choose a language</Text>
            <Text style={styles.sectionSubtitle}>
              Select your preferred option
            </Text>
          </View>

          <Text style={styles.count}>
            {filtered.length} LANGUAGES
          </Text>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={19}
            color={C.secondary}
          />

          <TextInput
            placeholder="Search languages..."
            placeholderTextColor={C.muted}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            autoCapitalize="none"
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons
                name="close-circle"
                size={19}
                color={C.muted}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* LANGUAGE OPTIONS */}
        <View style={styles.languageList}>
          {filtered.map((item, index) => {
            const active = selected === item.name;

            return (
              <TouchableOpacity
                key={item.code}
                style={[
                  styles.languageCard,
                  active && styles.activeCard,
                  index === filtered.length - 1 && styles.lastCard,
                ]}
                activeOpacity={0.75}
                onPress={() => setSelected(item.name)}
              >
                <View
                  style={[
                    styles.languageCode,
                    active && styles.activeCode,
                  ]}
                >
                  <Text
                    style={[
                      styles.codeText,
                      active && styles.activeCodeText,
                    ]}
                  >
                    {item.code}
                  </Text>
                </View>

                <View style={styles.languageInfo}>
                  <Text style={styles.languageName}>
                    {item.name}
                  </Text>
                  <Text style={styles.nativeName}>
                    {item.native}
                  </Text>
                </View>

                <Ionicons
                  name={
                    active
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={23}
                  color={active ? C.teal : C.muted}
                />
              </TouchableOpacity>
            );
          })}

          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="search-outline"
                size={30}
                color={C.muted}
              />
              <Text style={styles.emptyTitle}>
                No languages found
              </Text>
              <Text style={styles.emptyText}>
                Try searching with another language name.
              </Text>
            </View>
          )}
        </View>

        {/* APPLY BUTTON */}
        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.85}
          onPress={applyLanguage}
        >
          <Text style={styles.applyText}>Apply Language</Text>
          <Ionicons
            name="arrow-forward"
            size={19}
            color={C.white}
          />
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={17}
            color={C.teal}
          />
          <Text style={styles.footerText}>
            Your language preference is yours to control.
          </Text>
        </View>

        <Text style={styles.brandFooter}>
          VERTEX DOCS  ·  LANGUAGE BRIDGE
        </Text>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    paddingHorizontal: 21,
    paddingTop: 17,
    paddingBottom: 45,
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
    letterSpacing: 1.3,
    color: C.teal,
    marginBottom: 7,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: C.navy,
  },
  subtitle: {
    fontSize: 12,
    color: C.secondary,
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
  banner: {
    backgroundColor: C.navy,
    borderRadius: 16,
    padding: 21,
    marginBottom: 27,
  },
  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  bannerIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: C.teal,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  bannerLabel: {
    color: '#B9D8D9',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  bannerTitle: {
    color: C.white,
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '700',
  },
  bannerDescription: {
    color: '#D0DCE8',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
  },
  bannerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#38506A',
    gap: 8,
  },
  bannerFooterText: {
    color: '#D5E7E9',
    fontSize: 11,
    fontWeight: '600',
  },
  selectedSection: {
    marginBottom: 27,
  },
  sectionTitle: {
    color: C.navy,
    fontSize: 17,
    fontWeight: '700',
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: '#B9E1D8',
    borderRadius: 14,
    padding: 15,
    marginTop: 13,
  },
  selectedIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: C.lightTeal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedInfo: {
    flex: 1,
    marginLeft: 12,
  },
  selectedLabel: {
    color: C.secondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  selectedName: {
    color: C.navy,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  selectedNative: {
    color: C.secondary,
    fontSize: 11,
    marginTop: 2,
  },
  selectedCode: {
    backgroundColor: C.lightTeal,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  selectedCodeText: {
    color: C.teal,
    fontSize: 11,
    fontWeight: '700',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionSubtitle: {
    color: C.secondary,
    fontSize: 11,
    marginTop: 4,
  },
  count: {
    color: C.teal,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  searchBox: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 11,
    paddingHorizontal: 13,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    color: C.text,
    fontSize: 12,
    marginLeft: 9,
    paddingVertical: 0,
  },
  languageList: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 13,
    marginBottom: 18,
  },
  languageCard: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
    paddingVertical: 11,
  },
  activeCard: {
    backgroundColor: '#F5FBF9',
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  languageCode: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F0F3F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCode: {
    backgroundColor: C.lightTeal,
  },
  codeText: {
    color: C.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  activeCodeText: {
    color: C.teal,
  },
  languageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  languageName: {
    color: C.text,
    fontSize: 13,
    fontWeight: '700',
  },
  nativeName: {
    color: C.secondary,
    fontSize: 11,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyTitle: {
    color: C.navy,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  emptyText: {
    color: C.secondary,
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },
  applyButton: {
    minHeight: 51,
    backgroundColor: C.teal,
    borderRadius: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  applyText: {
    color: C.white,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    gap: 7,
  },
  footerText: {
    color: C.secondary,
    fontSize: 10,
  },
  brandFooter: {
    textAlign: 'center',
    color: C.muted,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 22,
  },
});

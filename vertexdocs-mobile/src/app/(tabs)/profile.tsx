
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../../config/firebase';

const C = {
  navy: '#142B4A',
  teal: '#087F73',
  bg: '#F4F7FB',
  white: '#FFFFFF',
  text: '#25364D',
  secondary: '#788392',
  muted: '#A0A8B3',
  border: '#E7EAF0',
  red: '#D94343',
};

const settings = [
  {
    title: 'Edit Profile',
    description: 'Update your personal information',
    icon: 'person-outline' as const,
  },
  {
    title: 'Notifications',
    description: 'Manage alerts and reminders',
    icon: 'notifications-outline' as const,
  },
  {
    title: 'Privacy & Security',
    description: 'Manage your account security',
    icon: 'lock-closed-outline' as const,
  },
  {
    title: 'Help & Support',
    description: 'Get help with Vertex Docs',
    icon: 'help-circle-outline' as const,
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(auth.currentUser);

  // Listen for Firebase authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Redirect to login if the user is not authenticated
      if (!currentUser) {
        router.replace('/login');
      }
    });

    return unsubscribe;
  }, [router]);

  // Get registered user's details
  const userName =
    user?.displayName?.trim() ||
    user?.email?.split('@')[0] ||
    'Vertex Docs User';

  const userEmail = user?.email || 'No email available';

  // Firebase logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert(
                'Logout Failed',
                'Unable to logout. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

  const handleSetting = (title: string) => {
    Alert.alert(
      title,
      `${title} settings will be available soon.`
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
            <Text style={styles.title}>My Profile</Text>
            <Text style={styles.subtitle}>
              Manage your account and preferences.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="person-outline"
              size={23}
              color={C.teal}
            />
          </View>
        </View>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={39}
                color={C.teal}
              />
            </View>

            <View style={styles.memberBadge}>
              <Ionicons
                name="checkmark-circle"
                size={13}
                color={C.teal}
              />
              <Text style={styles.memberBadgeText}>
                MEMBER
              </Text>
            </View>
          </View>

          {/* FIREBASE USER DETAILS */}
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>

          <View style={styles.profileDivider} />

          <View style={styles.memberInfo}>
            <View style={styles.memberIcon}>
              <Ionicons
                name="documents-outline"
                size={17}
                color={C.teal}
              />
            </View>

            <View>
              <Text style={styles.memberTitle}>
                Vertex Docs Member
              </Text>
              <Text style={styles.memberSubtitle}>
                Your personal document workspace
              </Text>
            </View>
          </View>
        </View>

        {/* ACCOUNT SETTINGS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Account Settings
            </Text>
            <Text style={styles.sectionSubtitle}>
              Personalize your experience
            </Text>
          </View>

          <Ionicons
            name="settings-outline"
            size={20}
            color={C.secondary}
          />
        </View>

        <View style={styles.settingsCard}>
          {settings.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.7}
              style={[
                styles.settingRow,
                index === settings.length - 1 &&
                  styles.lastSetting,
              ]}
              onPress={() => handleSetting(item.title)}
            >
              <View style={styles.settingIcon}>
                <Ionicons
                  name={item.icon}
                  size={21}
                  color={C.teal}
                />
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>
                  {item.title}
                </Text>
                <Text style={styles.settingDescription}>
                  {item.description}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={C.muted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* APP INFORMATION */}
        <View style={styles.appCard}>
          <View style={styles.appIcon}>
            <Ionicons
              name="document-text"
              size={25}
              color={C.white}
            />
          </View>

          <View style={styles.appInfo}>
            <Text style={styles.appName}>Vertex Docs</Text>
            <Text style={styles.appDescription}>
              Your documents, organized.
            </Text>
          </View>

          <Text style={styles.versionBadge}>v1.0.0</Text>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={C.red}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          MADE FOR A SIMPLER DOCUMENT EXPERIENCE
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
    color: C.teal,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
    marginBottom: 7,
  },
  title: {
    color: C.navy,
    fontSize: 27,
    fontWeight: '700',
  },
  subtitle: {
    color: C.secondary,
    fontSize: 12,
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
  profileCard: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 28,
  },
  profileTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E7F5F2',
    borderWidth: 3,
    borderColor: '#D3ECE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F5F2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 5,
  },
  memberBadgeText: {
    color: C.teal,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  name: {
    color: C.navy,
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    color: C.secondary,
    fontSize: 12,
    marginTop: 5,
  },
  profileDivider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 17,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  memberIcon: {
    width: 37,
    height: 37,
    borderRadius: 10,
    backgroundColor: '#E7F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberTitle: {
    color: C.text,
    fontSize: 12,
    fontWeight: '700',
  },
  memberSubtitle: {
    color: C.secondary,
    fontSize: 10,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: C.navy,
    fontSize: 17,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: C.secondary,
    fontSize: 11,
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: C.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 13,
    marginBottom: 20,
  },
  settingRow: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F3',
    paddingVertical: 11,
  },
  lastSetting: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 41,
    height: 41,
    borderRadius: 10,
    backgroundColor: '#E7F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  settingTitle: {
    color: C.text,
    fontSize: 13,
    fontWeight: '700',
  },
  settingDescription: {
    color: C.secondary,
    fontSize: 10,
    marginTop: 5,
  },
  appCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.navy,
    borderRadius: 14,
    padding: 15,
    marginBottom: 17,
  },
  appIcon: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: C.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfo: {
    flex: 1,
    marginLeft: 12,
  },
  appName: {
    color: C.white,
    fontSize: 13,
    fontWeight: '700',
  },
  appDescription: {
    color: '#C9D6E2',
    fontSize: 10,
    marginTop: 4,
  },
  versionBadge: {
    color: '#D0E5E1',
    fontSize: 10,
    fontWeight: '600',
  },
  logoutButton: {
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: '#F0DADA',
    borderRadius: 11,
  },
  logoutText: {
    color: C.red,
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    color: C.muted,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.8,
    textAlign: 'center',
    marginTop: 22,
  },
});


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const COLORS = {
  navy: '#142B4A',
  teal: '#16B8A6',
  background: '#F4F7FB',
  white: '#FFFFFF',
  text: '#263B5C',
  secondary: '#697386',
  muted: '#8992A3',
  border: '#E2E8F0',
};

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      Alert.alert('Missing Details', 'Please fill in all fields.');
      return;
    }

    if (cleanName.length < 2) {
      Alert.alert('Invalid Name', 'Please enter your full name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      // Create account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      const user = userCredential.user;

      // Save the user's display name
      await updateProfile(user, {
        displayName: cleanName,
      });

      // Save user information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: cleanName,
        email: cleanEmail,
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        'Registration Successful',
        'Your Vertex Docs account has been created successfully.',
        [
          {
            text: 'Continue to Login',
            onPress: () => router.replace('/login'),
          },
        ]
      );
    } catch (error: any) {
      console.error('Registration error:', error);

      let message = 'Something went wrong. Please try again.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already registered. Please log in.';
          break;

        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;

        case 'auth/weak-password':
          message = 'Please choose a stronger password.';
          break;

        case 'auth/network-request-failed':
          message = 'Network error. Please check your internet connection.';
          break;

        case 'permission-denied':
        case 'firestore/permission-denied':
          message =
            'Your account was created, but the profile could not be saved. Please contact support.';
          break;
      }

      Alert.alert('Registration Failed', message);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    label: string,
    placeholder: string,
    icon: React.ComponentProps<typeof Ionicons>['name'],
    value: string,
    onChangeText: (value: string) => void,
    options: {
      secure?: boolean;
      visible?: boolean;
      toggle?: () => void;
      keyboardType?: 'default' | 'email-address';
      autoCapitalize?: 'none' | 'words';
    } = {}
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        <Ionicons name={icon} size={19} color={COLORS.muted} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={options.secure && !options.visible}
          keyboardType={options.keyboardType ?? 'default'}
          autoCapitalize={options.autoCapitalize ?? 'none'}
          autoCorrect={false}
          editable={!loading}
          returnKeyType="next"
        />

        {options.toggle && (
          <TouchableOpacity
            onPress={options.toggle}
            disabled={loading}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={
              options.visible ? 'Hide password' : 'Show password'
            }
          >
            <Ionicons
              name={options.visible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brandSection}>
            <View style={styles.logo}>
              <Ionicons
                name="document-text"
                size={29}
                color={COLORS.white}
              />
            </View>

            <Text style={styles.brand}>
              Vertex <Text style={styles.brandAccent}>Docs</Text>
            </Text>

            <Text style={styles.tagline}>Create your account</Text>
          </View>

          {/* Registration Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Get Started!</Text>

            <Text style={styles.description}>
              Create your account and manage all your documents in one place.
            </Text>

            {renderInput(
              'Full Name',
              'Enter your full name',
              'person-outline',
              name,
              setName,
              { autoCapitalize: 'words' }
            )}

            {renderInput(
              'Email Address',
              'Enter your email',
              'mail-outline',
              email,
              setEmail,
              { keyboardType: 'email-address' }
            )}

            {renderInput(
              'Password',
              'Create a password',
              'lock-closed-outline',
              password,
              setPassword,
              {
                secure: true,
                visible: showPassword,
                toggle: () => setShowPassword(!showPassword),
              }
            )}

            {renderInput(
              'Confirm Password',
              'Confirm your password',
              'shield-checkmark-outline',
              confirmPassword,
              setConfirmPassword,
              {
                secure: true,
                visible: showConfirmPassword,
                toggle: () =>
                  setShowConfirmPassword(!showConfirmPassword),
              }
            )}

            {/* Create Account */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleRegister}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.registerButtonText}>
                    Create Account
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={COLORS.white}
                  />
                </>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginRow}>
              <Text style={styles.loginLabel}>
                Already have an account?{' '}
              </Text>

              <TouchableOpacity
                onPress={() => router.replace('/login')}
                disabled={loading}
              >
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color={COLORS.secondary}
            />

            <Text style={styles.footer}>
              Your documents, securely organized with Vertex Docs.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 28,
  },

  brandSection: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 56,
    height: 56,
    borderRadius: 15,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  brand: {
    fontSize: 23,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: -0.5,
  },

  brandAccent: {
    color: COLORS.teal,
  },

  tagline: {
    color: COLORS.secondary,
    fontSize: 13,
    marginTop: 5,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 21,
    borderWidth: 1,
    borderColor: '#EDF1F5',
    elevation: 2,
    shadowColor: '#142B4A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  heading: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.navy,
    letterSpacing: -0.4,
  },

  description: {
    fontSize: 12,
    color: COLORS.secondary,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 20,
  },

  field: {
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 7,
  },

  inputBox: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
    backgroundColor: COLORS.white,
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 13,
    paddingVertical: 11,
  },

  registerButton: {
    height: 50,
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 7,
  },

  disabledButton: {
    opacity: 0.65,
  },

  registerButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 21,
  },

  loginLabel: {
    fontSize: 12,
    color: COLORS.secondary,
  },

  loginLink: {
    fontSize: 12,
    color: COLORS.teal,
    fontWeight: '800',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 23,
  },

  footer: {
    color: COLORS.secondary,
    fontSize: 10,
    textAlign: 'center',
  },
});

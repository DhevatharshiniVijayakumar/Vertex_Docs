
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const COLORS = {
  background: '#F4F7FB',
  primary: '#142B4A',
  teal: '#16B8A6',
  secondaryText: '#667085',
  muted: '#98A2B3',
  border: '#E5EAF0',
  surface: '#FFFFFF',
  white: '#FFFFFF',
};

const SPACING = {
  lg: 24,
};

const SIZES = {
  screenPadding: 24,
  inputRadius: 14,
  buttonRadius: 14,
};

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, cleanEmail, password);

      Alert.alert('Welcome back!', 'You have signed in successfully.', [
        {
          text: 'Continue',
          onPress: () => router.replace('/(tabs)'),
        },
      ]);
    } catch (error: any) {
      let message = 'Unable to sign in. Please try again.';

      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          message = 'Incorrect email or password. Please check your details.';
          break;

        case 'auth/invalid-email':
          message = 'Please enter a valid email address.';
          break;

        case 'auth/user-disabled':
          message = 'This account has been disabled.';
          break;

        case 'auth/too-many-requests':
          message = 'Too many attempts. Please try again later.';
          break;

        case 'auth/network-request-failed':
          message = 'Network error. Please check your internet connection.';
          break;
      }

      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topRow}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <Ionicons name="document-text" size={25} color={COLORS.white} />
              </View>

              <Text style={styles.brandName}>
                Vertex<Text style={styles.brandAccent}> Docs</Text>
              </Text>
            </View>

            <Text style={styles.version}>WORKSPACE</Text>
          </View>

          <View style={styles.intro}>
            <Text style={styles.eyebrow}>YOUR DOCUMENT WORKSPACE</Text>

            <Text style={styles.heading}>
              Welcome{' \n'}back.
            </Text>

            <Text style={styles.description}>
              Sign in to access your documents, pick up where you left off,
              and keep everything in one place.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email address</Text>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={19}
                color={COLORS.secondaryText}
              />

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={COLORS.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.passwordHeading}>
              <Text style={styles.label}>Password</Text>

              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={19}
                color={COLORS.secondaryText}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.secondaryText}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Sign in</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={COLORS.white}
                  />
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>NEW TO VERTEX DOCS?</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push('/register')}
            activeOpacity={0.8}
          >
            <Text style={styles.registerText}>Create an account</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={15}
              color={COLORS.secondaryText}
            />

            <Text style={styles.footerText}>
              Your workspace, organized and accessible.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.screenPadding,
    paddingTop: SPACING.lg,
    paddingBottom: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.7,
  },
  brandAccent: {
    color: COLORS.teal,
  },
  version: {
    color: COLORS.secondaryText,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.3,
  },
  intro: {
    marginTop: 55,
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 10,
    color: COLORS.teal,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 13,
  },
  heading: {
    fontSize: 43,
    lineHeight: 49,
    fontWeight: '800',
    letterSpacing: -1.8,
    color: COLORS.primary,
  },
  description: {
    color: COLORS.secondaryText,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 13,
    maxWidth: 310,
  },
  form: {
    gap: 12,
  },
  label: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrapper: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.inputRadius,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 11,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 14,
    color: COLORS.primary,
    paddingVertical: 0,
  },
  passwordHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },
  forgot: {
    color: COLORS.teal,
    fontSize: 12,
    fontWeight: '700',
  },
  loginButton: {
    minHeight: 54,
    borderRadius: SIZES.buttonRadius,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 15,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 30,
    marginBottom: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  separatorText: {
    color: COLORS.secondaryText,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  registerButton: {
    height: 52,
    borderRadius: SIZES.buttonRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 30,
  },
  footerText: {
    color: COLORS.secondaryText,
    fontSize: 11,
  },
});

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const activeColor = '#007466';
const inactiveColor = '#697386';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 65,
          paddingTop: 7,
          paddingBottom: 7,
          borderTopColor: '#E8EDF2',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={String(color ?? activeColor)} />
          ),
        }}
      />

      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder-outline" size={size} color={String(color ?? activeColor)} />
          ),
        }}
      />

      <Tabs.Screen
        name="pdf-studio"
        options={{
          title: 'PDF Studio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={String(color ?? activeColor)} />
          ),
        }}
      />

      <Tabs.Screen
        name="language"
        options={{
          title: 'Language',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="language-outline" size={size} color={String(color ?? activeColor)} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={String(color ?? activeColor)} />
          ),
        }}
      />
    </Tabs>
  );
}
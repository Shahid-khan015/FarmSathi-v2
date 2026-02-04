import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import { OwnerDashboard } from '../screens/owner/OwnerDashboard';
import { OwnerFleetManagement } from '../screens/owner/OwnerFleetManagement';
import { OwnerAddTractor } from '../screens/owner/OwnerAddTractor';
import { OwnerAddImplement } from '../screens/owner/OwnerAddImplement';
import { OperatorDashboard } from '../screens/operator/OperatorDashboard';
import { FarmerDashboard } from '../screens/farmer/FarmerDashboard';
import { FarmerAlerts } from '../screens/farmer/FarmerAlerts';
import { FarmerReports } from '../screens/farmer/FarmerReports';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return (
      <RegistrationScreen onNavigateToLogin={() => setShowRegister(false)} />
    );
  }

  return (
    <LoginScreen onNavigateToRegister={() => setShowRegister(true)} />
  );
}

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <Text style={{ color: focused ? '#22c55e' : '#9ca3af', fontSize: 20 }}>
      {name === 'Home' ? '🏠' : name === 'Fleet' ? '🚜' : name === 'Alerts' ? '🔔' : name === 'Reports' ? '📊' : '📋'}
    </Text>
  );
}

function FleetScreen() {
  const navigation = useNavigation();
  return <OwnerFleetManagement navigation={navigation} />;
}

function OwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={OwnerDashboard} />
      <Tab.Screen name="Fleet" component={FleetScreen} />
    </Tab.Navigator>
  );
}

function OperatorTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={OperatorDashboard} />
    </Tab.Navigator>
  );
}

function FarmerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={FarmerDashboard} />
      <Tab.Screen name="Alerts" component={FarmerAlerts} />
      <Tab.Screen name="Reports" component={FarmerReports} />
    </Tab.Navigator>
  );
}

function RoleNavigator() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'owner':
      return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OwnerTabs" component={OwnerTabs} />
          <Stack.Screen name="AddTractor" component={AddTractorScreen} />
          <Stack.Screen name="AddImplement" component={AddImplementScreen} />
        </Stack.Navigator>
      );
    case 'operator':
      return <OperatorTabs />;
    case 'farmer':
      return <FarmerTabs />;
    default:
      return <OwnerTabs />;
  }
}

function AddTractorScreen({ navigation }: any) {
  return (
    <OwnerAddTractor
      onSuccess={() => navigation.goBack()}
      onCancel={() => navigation.goBack()}
    />
  );
}

function AddImplementScreen({ navigation }: any) {
  return (
    <OwnerAddImplement
      onSuccess={() => navigation.goBack()}
      onCancel={() => navigation.goBack()}
    />
  );
}

export function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={RoleNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
});

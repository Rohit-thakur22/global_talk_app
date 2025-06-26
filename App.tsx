/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import LocationPermissionScreen from './src/screens/LocationPermissionScreen';
const Stack = createStackNavigator();

const MainScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Main App Screen</Text>
  </View>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setShowOnboarding(!seen);
      setLoading(false);
    };
    checkOnboarding();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#ff6600" /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={showOnboarding ? 'Onboarding' : 'LocationPermission'} screenOptions={{ headerShown: false }}>
        {showOnboarding && (
          <Stack.Screen name="Onboarding" component={props => <OnboardingScreen {...props} onFinish={async () => {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            props.navigation.replace('LocationPermission');
          }} />} />
        )}
        <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

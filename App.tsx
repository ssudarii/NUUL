// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from './components/Onboarding/LoginScreen';
import StepOneScreen from './components/Onboarding/StepOneScreen';
import StepTwoScreen from './components/Onboarding/StepTwoScreen';
import CharacterIntroScreen from './components/Onboarding/CharacterIntroScreen';
import HomeScreen from './components/HomeScreen';
import ExploreScreen from './components/ExploreScreen';
import CommunityHomeScreen from './components/CommunityHomeScreen';
import CommunityScreen from './components/CommunityScreen';
import GroupActivityScreen from './components/GroupActivityScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';
import DecorateScreen from './components/DecorateScreen';
import MyListScreen from './components/MyListScreen';
import AlarmListScreen from './components/AlarmListScreen';
import AlarmEditScreen from './components/AlarmEditScreen';
import FriendListScreen from './components/FriendListScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';

const RootStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CommunityStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const ExploreStack = createNativeStackNavigator();

function OnboardingStackScreen() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="StepOne" component={StepOneScreen} />
      <OnboardingStack.Screen name="StepTwo" component={StepTwoScreen} />
      <OnboardingStack.Screen name="CharacterIntro" component={CharacterIntroScreen} />
    </OnboardingStack.Navigator>
  );
}

function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator>
      <CommunityStack.Screen
        name="CommunityHome"
        component={CommunityHomeScreen}
        options={{ headerShown: false }}
      />
      <CommunityStack.Screen
        name="CommunityDetail"
        component={CommunityScreen}
        options={({ route }) => ({ title: route.params?.groupName || '모임 상세' })}
      />
      <CommunityStack.Screen
        name="GroupActivityScreen"
        component={GroupActivityScreen}
        options={({ route }) => ({ title: route.params?.groupName || '모임 활동' })}
      />
    </CommunityStack.Navigator>
  );
}

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsHome" component={SettingsScreen} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
      <SettingsStack.Screen name="Decorate" component={DecorateScreen} />
      <SettingsStack.Screen name="MyList" component={MyListScreen} />
      <SettingsStack.Screen name="AlarmList" component={AlarmListScreen} />
      <SettingsStack.Screen name="AlarmEdit" component={AlarmEditScreen} />
      <SettingsStack.Screen name="FriendList" component={FriendListScreen} />
    </SettingsStack.Navigator>
  );
}

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="ExploreHome" component={ExploreScreen} />
      <ExploreStack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
    </ExploreStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === '홈') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === '탐색') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === '커뮤니티') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === '설정') iconName = focused ? 'settings' : 'settings-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#d8ead8',
          borderTopColor: '#e0e0e0',
          height: 70,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: 'rgb(60, 93, 93)',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="탐색" component={ExploreStackScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityStackScreen} />
      <Tab.Screen name="설정" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <RootStack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <RootStack.Screen name="Onboarding" component={OnboardingStackScreen} />
            <RootStack.Screen name="Main" component={MainTabNavigator} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

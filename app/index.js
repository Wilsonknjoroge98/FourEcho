import { NavigationContainer } from '@react-navigation/native';
import InspectionNavigator from '../components/nav/Navigator';
import { AppProvider } from '../components/context/AppContext';
import { useFonts } from 'expo-font';
import { Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';

const Index = () => {
  // const preLoadAssets = async () => {
  //   await Image.prefetch('../assets/images/homelogo.png');
  // };

  // useEffect(() => {
  //   preLoadAssets();
  // });

  return (
    <AppProvider>
      <NavigationContainer independent={true}>
        <InspectionNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default Index;

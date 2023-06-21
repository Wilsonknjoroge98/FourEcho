import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import StartButton from '../components/StartButton';
import TitleLogo from '../components/TitleLogo';
import { LayoutAnimation } from 'react-native';

const Home = () => {
  // returns a boolean of the font's load status
  const [fontsLoaded] = useFonts({
    'Kite-One': require('../assets/fonts/Kite_One/kite__one.ttf'),
    'Open-Sans': require('../assets/fonts/Open_Sans/open__sans.ttf'),
  });

  // The useCallback hook is a built-in hook in React that is used for memoizing functions.
  // If any of the dependencies in the array change, the memoized function will be recreated
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // hide the apps splash screen, render the component
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // fonts not finished loading
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={style}>
      <TitleLogo />
      <StartButton />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  height: '100%',
});

export default Home;

import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import StartButton from './subcomponents/StartButton';
import TitleLogo from './subcomponents/TitleLogo';

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Kite-One': require('../../assets/fonts/Kite_One/kite__one.ttf'),
    'Open-Sans': require('../../assets/fonts/Open_Sans/open__sans.ttf'),
    Cairo: require('../../assets/fonts/Cairo/Cairo.ttf'),
    Raj: require('../../assets/fonts/Rajdhani/rajdhani__regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.contentContainer}>
        <TitleLogo />
        <StartButton navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    marginBottom: 200,
  },
});

export default Home;

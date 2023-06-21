import { View, Text, Image, StyleSheet } from 'react-native';

const TitleLogo = () => {
  return (
    <View style={styles.titleAndLogoContainer}>
      <Text style={styles.title}>Public Health</Text>
      <Image
        style={styles.logo}
        source={require('../assets/images/homelogo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleAndLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Kite-One',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  logo: { width: 150, height: 150 },
});

export default TitleLogo;

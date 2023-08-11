import { View, Text, Image, StyleSheet } from 'react-native';

const TitleLogo = ({ setImageLoaded }) => {
  return (
    <View style={styles.titleAndLogoContainer}>
      <Text style={styles.title}>Public Health</Text>
      <Image
        onLoadEnd={() => setImageLoaded(true)}
        style={styles.logo}
        source={require('../../../assets/images/homelogo.png')}
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
    fontFamily: 'Cairo',
    color: 'black',
    fontSize: 50,
  },
  logo: { width: 150, height: 150 },
});

export default TitleLogo;

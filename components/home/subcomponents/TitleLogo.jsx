import { View, Text, Image, StyleSheet } from 'react-native';

const TitleLogo = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Four Echo</Text>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/homelogo.jpg')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
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

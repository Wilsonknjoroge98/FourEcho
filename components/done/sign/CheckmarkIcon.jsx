import { View, Image, StyleSheet } from 'react-native';
const CheckmarkIcon = () => {
  return (
    <View style={styles.contentContainer}>
      <Image
        style={styles.icon}
        source={require('../../../assets/images/finished__icon.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 150, height: 150 },
});
export default CheckmarkIcon;

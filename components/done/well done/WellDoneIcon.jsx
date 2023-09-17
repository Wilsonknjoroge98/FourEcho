import { View, Image, StyleSheet } from 'react-native';
const WellDoneIcon = () => {
  return (
    <View style={styles.contentContainer}>
      <Image
        style={styles.icon}
        source={require('../../../assets/images/well__done.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 250, height: 250 },
});
export default WellDoneIcon;

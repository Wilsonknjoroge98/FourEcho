import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const StartButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => router.push('formView')}
    >
      <Text style={styles.button}>START INPSECTION</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    textTransofrm: 'uppercase',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#76ff03',
    padding: 30,
    marginTop: 10,
  },
  button: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default StartButton;

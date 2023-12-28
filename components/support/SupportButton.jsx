import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SupportButton = () => {
  const { setSupportModalVisible } = useContext(AppContext);

  return (
    <TouchableOpacity style={styles.button} onPress={() => setSupportModalVisible()}>
      <Text style={styles.buttonText}>Support / Feedback</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginTop: 10,
    width: 300,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Raj',
  },
});

export default SupportButton;

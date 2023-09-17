import { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const Buttons = ({ navigation, main, signDoc }) => {
  const {
    inspectorSignature,
    setInspectorSignature,
    picSignature,
    setPICSignature,
  } = useContext(AppContext);
  const handleReSign = () => {
    setInspectorSignature(null);
    setPICSignature(null);
  };

  const handlePress = () => {
    signDoc()
      .then(pdf => main(pdf))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.buttonContainer}>
      {inspectorSignature && picSignature ? (
        <>
          <TouchableOpacity style={styles.greenButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Sign and Send PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blueButton} onPress={handleReSign}>
            <Text style={styles.buttonText}>Re-Sign PDF</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.blueButton}
          onPress={() => navigation.push('review')}
        >
          <Text style={styles.buttonText}>review PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    justifyContent: 'center',
    marginBottom: 200,
  },
  greenButton: {
    borderRadius: 5,
    backgroundColor: '#76ff03',
    padding: 15,
    margin: 10,
    width: 300,
    alignSelf: 'center',
  },
  blueButton: {
    borderRadius: 5,
    backgroundColor: '#4dd0e1',
    padding: 15,
    margin: 10,
    width: 300,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Raj',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Buttons;

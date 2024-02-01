import { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import * as Network from 'expo-network';
import ErrorModal from '../inspection/error modal/ErrorModal';

const Buttons = ({ navigation, main, signDoc, setLoading }) => {
  const {
    inspectorSignature,
    setInspectorSignature,
    picSignature,
    setPICSignature,
    setErrorModalVisible,
    setErrorMessage,
    pdf,
  } = useContext(AppContext);
  const handleReSign = () => {
    setInspectorSignature(null);
    setPICSignature(null);
  };

  const handleSubmit = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected || !networkState.isInternetReachable) {
      setErrorModalVisible(true);
      setErrorMessage(
        'The DD 2973 cannot be processed, most likely due to network connectivity issues. Please try again when you establish a stable connection.',
      );
    } else {
      signDoc()
        .then(pdf => main(pdf))
        .catch(err => console.log(err));
    }
  };

  const handleSubmitWithoutSignature = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected || !networkState.isInternetReachable) {
      setErrorModalVisible(true);
      setErrorMessage(
        'The DD 2973 cannot be processed, most likely due to network connectivity issues. Please try again when you establish a stable connection.',
      );
    } else {
      try {
        setLoading(true);
        await main(pdf);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ErrorModal />
      <View style={styles.buttonContainer}>
        {inspectorSignature && picSignature ? (
          <>
            <TouchableOpacity style={styles.greenButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign and Send PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blueButton} onPress={handleReSign}>
              <Text style={styles.buttonText}>Re-Sign PDF</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.blueButton}
              onPress={() => navigation.push('review')}
            >
              <Text style={styles.buttonText}>review PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.blueButton}
              onPress={handleSubmitWithoutSignature}
            >
              <Text style={styles.buttonText}>send w/o signing</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
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

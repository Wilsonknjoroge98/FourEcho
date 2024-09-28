import { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
import * as Network from 'expo-network';
import ErrorModal from '../inspection/error modal/ErrorModal';
import InspectorMessageModal from './InspectorMessageModal';

const Buttons = ({ navigation, sendDoc, signDoc }) => {
  const {
    inspectorSignature,
    setInspectorSignature,
    picSignature,
    setPICSignature,
    setErrorModalVisible,
    setErrorMessage,
    pdf,
    setPdf,
    setPageLoading,
    inspectorMessageModalVisible,
    setInspectorMessageModalVisible,
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
        'The DD 2973 cannot be signed, most likely due to network connectivity issues. Please try again when you establish a stable connection.',
      );
    } else {
      try {
        setPageLoading(true);
        const pdf = await signDoc();
        setPdf(pdf);
        setPageLoading(false);
        setInspectorMessageModalVisible(true);
      } catch (error) {
        setErrorModalVisible(true);
        setErrorMessage('The DD 2973 cannot be signed due to an unexpected error');
        console.log(error);
      }
    }
  };

  const handleSubmitWithoutSignature = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected || !networkState.isInternetReachable) {
      setErrorModalVisible(true);
      setErrorMessage(
        'The DD 2973 cannot be signed, most likely due to network connectivity issues. Please try again when you establish a stable connection.',
      );
    } else {
      try {
        setPageLoading(true);
        setPdf(pdf);
        setPageLoading(false);
        setInspectorMessageModalVisible(true);
      } catch (error) {
        setErrorModalVisible(true);
        setErrorMessage('The DD 2973 cannot be signed due to an unexpected error');
        console.log(error);
      }
    }
  };

  return (
    <>
      <ErrorModal />
      <InspectorMessageModal sendDoc={sendDoc} />
      <View style={styles.buttonContainer}>
        {inspectorSignature && picSignature ? (
          <>
            <TouchableOpacity style={styles.greenButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blueButton} onPress={handleReSign}>
              <Text style={styles.buttonText}>Re-Sign PDF</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.blueButton} onPress={() => navigation.push('review')}>
              <Text style={styles.buttonText}>Review PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.blueButton} onPress={handleSubmitWithoutSignature}>
              <Text style={styles.buttonText}>Proceed w/o signing</Text>
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

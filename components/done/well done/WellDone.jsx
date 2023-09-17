import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WellDoneIcon from './WellDoneIcon';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const WellDone = ({ navigation }) => {
  const {
    setPdf,
    setBase64Pdf,
    setIHH,
    setStartTime,
    setDiscrepanciesList,
    backgroundValues,
    setBackgroundValues,
    setInspectionTypeOther,
    setInspectionTypeOtherText,
    setValidEmailInspector,
    setValidEmailPIC,
    setSanitizingConcentrationValues,
    setSanitizingTempValues,
    setTempValues,
    setTempArr,
    setItemGroup,
    setItemId,
    setFilterLoading,
    setDiscrepancy,
    setModalVisible,
    setInspectorSignature,
    setPICSignature,
  } = useContext(AppContext);
  const handleNewInspection = () => {
    setPdf(null);
    setBase64Pdf(null);
    setDiscrepanciesList([]);
    setBackgroundValues([]);
    setInspectionTypeOther(false);
    setInspectionTypeOtherText('');
    setValidEmailPIC(false);
    setValidEmailInspector(false);
    setTempValues([{}]);
    setSanitizingConcentrationValues([{}]);
    setSanitizingTempValues([{}]);
    setTempArr(Array.from(Array(3).keys()));
    setItemGroup(null);
    setItemId('');
    setFilterLoading(false);
    setDiscrepancy({});
    setModalVisible(false);
    setIHH('');
    setStartTime('');
    setInspectorSignature(null);
    setPICSignature(null);
    navigation.replace('background');
  };

  return (
    <>
      <WellDoneIcon />
      <Text style={styles.confirmationText}>
        The DD2973 has been sent to {backgroundValues[6]?.text} and{' '}
        {backgroundValues[10]?.text}
      </Text>
      <View style={{ margin: 30 }}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleNewInspection}
        >
          <Text style={styles.startButtonText}>Start New Inspection</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  confirmationText: {
    fontFamily: 'Raj',
    fontSize: 25,
  },
  startButton: {
    borderRadius: 10,
    borderColor: 'black',
    alignSelf: 'center',
    backgroundColor: '#76ff03',
    padding: 15,
    marginTop: 10,
    width: 300,
  },
  startButtonText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Raj',
  },
});

export default WellDone;

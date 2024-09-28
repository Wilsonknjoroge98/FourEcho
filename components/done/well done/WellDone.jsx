import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WellDoneIcon from './WellDoneIcon';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HighlightText from '@sanar/react-native-highlight-text';
import SupportButton from '../../support/SupportButton';
import SupportModal from '../../support/SupportModal';
import moment from 'moment/moment';

const WellDone = ({ navigation }) => {
  const {
    setPdf,
    setBase64Pdf,
    setStartTime,
    setDiscrepanciesList,
    backgroundValues,
    setBackgroundValues,
    setInspectionTypeOther,
    setInspectionTypeOtherText,
    setValidEmailInspector,
    setValidEmailPIC,
    setValidEmailPersonal,
    setSanitizingConcentrationValues,
    setSanitizingTempValues,
    setTempValues,
    setTempArr,
    setItemGroup,
    setItemId,
    setFilterLoading,
    setDiscrepancy,
    setInspectorSignature,
    setPICSignature,
    setInspectorEmailMessage,
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
    setValidEmailPersonal(false);
    setTempValues([{}]);
    setSanitizingConcentrationValues([{}]);
    setSanitizingTempValues([{}]);
    setTempArr(Array.from(Array(3).keys()));
    setItemGroup(null);
    setItemId('');
    setFilterLoading(false);
    setDiscrepancy({});
    setStartTime(moment().format('h:mm'));
    setInspectorSignature(null);
    setPICSignature(null);
    setInspectorEmailMessage('');
    navigation.replace('background');
  };

  return (
    <>
      <SupportModal />
      <WellDoneIcon />
      <View style={styles.textContainer}>
        <Text style={styles.confirmationText}>
          The DD2973 has been sent to the following emails
        </Text>
        <Text style={styles.confirmationText}>‣ {backgroundValues[6]?.text}</Text>
        <Text style={styles.confirmationText}>‣ {backgroundValues[10]?.text}</Text>
        <Text style={styles.confirmationText}>‣ {backgroundValues[12].text}</Text>
      </View>
      <View style={styles.textContainer}>
        <HighlightText
          style={{ ...styles.confirmationText, fontSize: 25 }}
          highlightStyle={{ backgroundColor: 'yellow' }}
          searchWords={['fourxecho@gmail.com']}
          textToHighlight='Search your inbox for fourxecho@gmail.com to find the inspection.'
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity style={styles.startButton} onPress={handleNewInspection}>
          <Text style={styles.startButtonText}>Start New Inspection</Text>
        </TouchableOpacity>
      </View>
      <SupportButton />
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  confirmationText: {
    fontFamily: 'Raj',
    fontSize: 20,
    margin: 5,
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

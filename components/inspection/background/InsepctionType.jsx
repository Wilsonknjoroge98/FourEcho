import { useContext } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { Text, TextInput, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

const inpectionTypes = [
  'Routine',
  'Follow-up',
  'Complaint',
  'Preoperational',
  'Other',
];

const InspectionType = ({ index, handleInput }) => {
  const {
    inspectionTypeOther,
    inspectionTypeOtherText,
    setInspectionTypeOtherText,
  } = useContext(AppContext);
  return (
    <>
      <SelectDropdown
        data={inpectionTypes}
        onSelect={text => handleInput(text, index)}
        buttonStyle={{ width: 350 }}
      />
      {inspectionTypeOther && (
        <>
          <Text style={styles.label}>specify other</Text>
          <TextInput
            style={styles.textBox}
            onChangeText={text => setInspectionTypeOtherText(text)}
            value={inspectionTypeOtherText}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Raj',
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
  textBox: {
    height: 40,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default InspectionType;

import { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { AppContext } from '../../../context/AppContext';

const chemicalSanitizerFields = [
  'Dishwasher chemical sanitizer',
  '3-compartment sink chemical sanitizer',
  'Sanitizer -- food contact surfaces',
];

const SanatizingConcetration = () => {
  const { sanitizingConcentrationValues, setSanitizingConcentrationValues } =
    useContext(AppContext);

  const handleInput = (text, i, key) => {
    setSanitizingConcentrationValues(prevSanitizingConcentrationValues => {
      const updatedSanitizingConcentrationValues = [
        ...prevSanitizingConcentrationValues,
      ];
      updatedSanitizingConcentrationValues[i] = {
        ...updatedSanitizingConcentrationValues[i],
        [key]: text,
      };
      return updatedSanitizingConcentrationValues;
    });
  };

  const handleNAPress = i => {
    setSanitizingConcentrationValues(prevSanitizingConcentrationValues => {
      const updatedSanitizingConcentrationValues = [
        ...prevSanitizingConcentrationValues,
      ];
      updatedSanitizingConcentrationValues[i] = {
        ...updatedSanitizingConcentrationValues[i],
        NA: !updatedSanitizingConcentrationValues[i]?.NA,
      };
      return updatedSanitizingConcentrationValues;
    });
  };

  return chemicalSanitizerFields.map((el, i) => (
    <View
      key={i}
      style={
        sanitizingConcentrationValues[i]?.NA === true
          ? styles.solutionCardNA
          : styles.solutionCard
      }
    >
      <View>
        <Text style={styles.solutionCardLabel}>{el}</Text>
      </View>
      <View style={styles.solutionCardBottomRow}>
        <View style={styles.NAContainer}>
          <View>
            <Text style={styles.NALabel}>N/A</Text>
          </View>
          <View>
            <TouchableOpacity
              style={
                sanitizingConcentrationValues[i]?.NA === true
                  ? styles.NAButtonPressed
                  : styles.NAButton
              }
              onPress={() => handleNAPress(i)}
            ></TouchableOpacity>
          </View>
        </View>
        <SelectDropdown
          data={['Quats', 'Bleach']}
          defaultValue={''}
          onSelect={text => handleInput(text, i, 'solution')}
          buttonStyle={
            sanitizingConcentrationValues[i]?.NA === true
              ? styles.solutionSelectDropDownPressed
              : styles.solutionSelectDropDown
          }
        />
        <View style={styles.ppmContentContainer}>
          <View>
            <Text style={styles.ppmLabel}>PPM</Text>
          </View>
          <TextInput
            style={styles.ppmTextInput}
            keyboardType="numeric"
            onChangeText={text => handleInput(text, i, 'ppm')}
            value={sanitizingConcentrationValues[i]?.ppm ?? ''}
          />
        </View>
      </View>
    </View>
  ));
};

const styles = StyleSheet.create({
  solutionCard: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
    width: 400,
    height: 110,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  solutionCardNA: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
    width: 400,
    height: 110,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  solutionCardLabel: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Kite-One',
  },
  solutionCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  solutionSelectDropDown: {
    width: 175,
    borderRadius: 5,
    height: 40,
    marginTop: 15,
  },
  solutionSelectDropDownPressed: {
    width: 175,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#000000',
    marginTop: 15,
  },
  ppmContentContainer: {
    marginBottom: 10,
  },
  ppmLabel: {
    alignSelf: 'center',
    fontSize: 15,
    fontFamily: 'Raj',
  },
  ppmTextInput: {
    height: 40,
    width: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Raj',
    fontSize: 15,
    textAlign: 'center',
    margin: 3,
    marginTop: 5,
    marginBottom: 5,
  },
  NAContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  NAButton: {
    borderWidth: 1,
    height: 30,
    width: 30,
    margin: 3,
    marginTop: 20,
    borderRadius: 5,
  },
  NAButtonPressed: {
    borderWidth: 1,
    height: 30,
    width: 30,
    margin: 3,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: '#dd2c00',
  },
  NALabel: {
    margin: 3,
    marginTop: 27,
    fontSize: 15,
    fontFamily: 'Raj',
  },
});

export default SanatizingConcetration;

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

const solutionTypes = ['Quats', 'Bleach'];

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
          data={solutionTypes}
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
            <Text style={styles.ppmLabel}>ppm</Text>
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
    backgroundColor: '#ffeb3b75',
  },
  solutionSelectDropDownPressed: {
    width: 175,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#000000',
  },
  ppmContentContainer: {
    flexDirection: 'row',
  },
  ppmLabel: {
    marginTop: 25,
    marginRight: 2,
    fontSize: 13,
  },
  ppmTextInput: {
    height: 40,
    width: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
    textAlign: 'center',
    margin: 3,
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
    borderRadius: 5,
  },
  NAButtonPressed: {
    borderWidth: 1,
    height: 30,
    width: 30,
    margin: 3,
    borderRadius: 5,
    backgroundColor: '#dd2c00',
  },
  NALabel: {
    margin: 3,
    marginTop: 10,
  },
});

export default SanatizingConcetration;

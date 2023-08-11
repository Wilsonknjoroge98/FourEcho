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

const waterTempFields = [
  'Dishwasher hot temperature',
  '3-compartment sink hot temperature',
];
const tempMetrics = ['F', 'C'];

const SanatizingTemperature = () => {
  const { sanitizingTempValues, setSanitizingTempValues } =
    useContext(AppContext);

  const handleInput = (text, i, key) => {
    setSanitizingTempValues(prevSanitizingTempValues => {
      const updatedSanitizingTempValues = [...prevSanitizingTempValues];
      updatedSanitizingTempValues[i] = {
        ...updatedSanitizingTempValues[i],
        [key]: text,
      };

      return updatedSanitizingTempValues;
    });
  };

  const handleNAPress = i => {
    setSanitizingTempValues(prevSanitizingTempValues => {
      const updatedSanitizingTempValues = [...prevSanitizingTempValues];
      updatedSanitizingTempValues[i] = {
        ...updatedSanitizingTempValues[i],
        NA: !updatedSanitizingTempValues[i]?.NA,
      };

      return updatedSanitizingTempValues;
    });
  };

  return waterTempFields.map((el, i) => (
    <View
      key={i}
      style={
        sanitizingTempValues[i]?.NA === true
          ? styles.tempCardNA
          : styles.tempCard
      }
    >
      <View>
        <Text style={styles.tempCardLabel}>{el}</Text>
      </View>
      <View style={styles.tempCardBottomRow}>
        <View style={styles.NAContainer}>
          <View>
            <Text style={styles.NALabel}>N/A</Text>
          </View>
          <View>
            <TouchableOpacity
              style={
                sanitizingTempValues[i]?.NA === true
                  ? styles.NAButtonPressed
                  : styles.NAButton
              }
              onPress={() => handleNAPress(i)}
            ></TouchableOpacity>
          </View>
        </View>
        <View style={styles.tempLabelAndTextContainer}>
          <View>
            <Text style={styles.label}>Temp</Text>
          </View>
          <View>
            <TextInput
              style={styles.tempTextInput}
              keyboardType="numeric"
              onChangeText={text => handleInput(text, i, 'temp')}
              value={sanitizingTempValues[i]?.temp ?? ''}
            />
          </View>
        </View>
        <View style={styles.metricLabelAndDropdownContainer}>
          <View>
            <Text style={styles.label}>Metric</Text>
          </View>
          <SelectDropdown
            data={tempMetrics}
            defaultValue={''}
            onSelect={text => handleInput(text, i, 'metric')}
            buttonStyle={
              sanitizingTempValues[i]?.NA === true
                ? styles.metricSelectDropDownNA
                : styles.metricSelectDropDown
            }
          />
        </View>
      </View>
    </View>
  ));
};

const styles = StyleSheet.create({
  tempCard: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
    width: 400,
    height: 120,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'space-between',
  },
  tempCardNA: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
    width: 400,
    height: 120,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'space-between',
    backgroundColor: '#000000',
  },
  tempCardLabel: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Kite-One',
  },
  tempCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  tempLabelAndTextContainer: { margin: 2 },
  tempTextInput: {
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
  metricLabelAndDropdownContainer: {
    margin: 3,
  },
  label: {
    fontFamily: 'Open-Sans',
    fontSize: 13,
    marginBottom: 3,
    textAlign: 'center',
  },
  metricSelectDropDown: {
    width: 75,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#ffeb3b75',
  },
  metricSelectDropDownNA: {
    width: 75,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#000000',
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

export default SanatizingTemperature;

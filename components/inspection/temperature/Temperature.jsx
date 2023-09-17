import { useContext } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { AppContext } from '../../context/AppContext';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Temperature = ({ navigation }) => {
  const { tempValues, setTempValues, tempArr, setTempArr } =
    useContext(AppContext);

  const handleInput = (text, i, key) => {
    setTempValues(prevTempValues => {
      const updatedTempValues = [...prevTempValues];
      updatedTempValues[i] = {
        ...updatedTempValues[i],
        [key]: text,
      };
      return updatedTempValues;
    });
  };

  const handleAddField = tempArr => {
    const len = tempArr.length;
    if (len < 10) setTempArr(Array.from(Array(len + 1).keys()));
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <View style={styles.listContainer}>
          {tempArr.map((el, i) => (
            <View key={i} style={styles.contentContainer}>
              <View style={styles.descriptionContainers}>
                <View>
                  <Text style={styles.label}>Food Item & Location</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.descriptionTextInput}
                    onChangeText={text => handleInput(text, i, 'description')}
                    value={tempValues[i]?.description ?? ''}
                  />
                </View>
              </View>
              <View style={styles.tempContainers}>
                <View>
                  <Text style={styles.label}>Temp</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.tempTextInput}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={text => handleInput(text, i, 'temp')}
                    value={tempValues[i]?.temp ?? ''}
                  />
                </View>
              </View>
              <View style={styles.metricContainer}>
                <View>
                  <Text style={styles.label}>Metric</Text>
                </View>
                <SelectDropdown
                  data={['F', 'C']}
                  defaultValue={''}
                  onSelect={text => handleInput(text, i, 'metric')}
                  buttonStyle={{
                    width: 50,
                    borderRadius: 5,
                    height: 40,
                  }}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addFieldButton}
            onPress={() => handleAddField(tempArr)}
          >
            <Text style={styles.addFieldButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.naivgateButton}
            onPress={() => navigation.push('nav')}
          >
            <Text style={styles.navigateButtonText}>Move On To...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  listContainer: {
    marginBottom: 400,
  },
  contentContainer: { flexDirection: 'row', margin: 5 },
  descriptionContainers: { margin: 5 },
  tempContainers: { margin: 5 },
  metricContainer: { margin: 5 },
  descriptionTextInput: {
    height: 40,
    width: 250,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
  },
  tempTextInput: {
    height: 40,
    width: 75,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
    textAlign: 'center',
  },
  label: {
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Raj',
  },
  naivgateButton: {
    textTransform: 'uppercase',
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: '#4dd0e1',
    padding: 15,
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },
  navigateButtonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  addFieldButton: {
    textTransform: 'uppercase',
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: '#bdbdbd',
    padding: 15,
    margin: 10,
    width: 45,
    alignSelf: 'flex-start',
  },
  addFieldButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Temperature;

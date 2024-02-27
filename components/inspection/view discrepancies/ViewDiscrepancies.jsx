import { Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useContext, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../context/AppContext';
import SelectDropdown from 'react-native-select-dropdown';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import DiscrepancyExcerpt from '../select discrepancies/discrepancy modal/subcomponents/DiscrepancyExerpt';

const ViewDiscrepancies = ({ navigation }) => {
  const { setDiscrepanciesList, discrepanciesList } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState();

  const initiateDelete = item => {
    setSelectedDiscrepancy(item);
    setModalVisible(true);
  };

  const handleDelete = item => {
    setDiscrepanciesList(prevDiscrepanciesList => {
      const updatedDiscrepanciesList = prevDiscrepanciesList.filter(listItem => listItem !== item);
      return updatedDiscrepanciesList;
    });
  };

  const handleTextUpdate = (text, i, key) => {
    setDiscrepanciesList(prevDiscrepanciesList => {
      const updatedDiscrepanciesList = [...prevDiscrepanciesList];
      updatedDiscrepanciesList[i] = {
        ...updatedDiscrepanciesList[i],
        [key]: text,
      };

      return updatedDiscrepanciesList;
    });
  };

  const handleDropdownUpdate = (text, i, key) => {
    const value = text === 'Yes' ? true : false;
    setDiscrepanciesList(prevDiscrepanciesList => {
      const updatedDiscrepanciesList = [...prevDiscrepanciesList];
      updatedDiscrepanciesList[i] = {
        ...updatedDiscrepanciesList[i],
        [key]: value,
      };

      return updatedDiscrepanciesList;
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        <ConfirmDeleteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleDelete={handleDelete}
          selectedDiscrepancy={selectedDiscrepancy}
        />

        <View style={styles.discrepancyCard}>
          <View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => initiateDelete(item)}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Discrepancy</Text>
          <View style={{ marginRight: 5, marginLeft: 5 }}>
            <DiscrepancyExcerpt discrepancy={item} />
          </View>

          <View style={styles.textContentContainer}>
            <Text style={styles.label}>Observation Details</Text>
            <TextInput
              onChangeText={text => {
                handleTextUpdate(text, index, 'observation');
              }}
              value={item.observation}
              multiline={true}
              style={styles.textInput}
            />
          </View>
          <View style={styles.textContentContainer}>
            <Text style={styles.label}>Corrective Action</Text>
            <TextInput
              onChangeText={text => {
                handleTextUpdate(text, index, 'corrective');
              }}
              value={item.corrective}
              multiline={true}
              style={styles.textInput}
            />
          </View>
          <View style={styles.dropdownContentContainer}>
            <Text style={styles.dropdownLabel}>Corrected on site?</Text>
            <SelectDropdown
              data={['Yes', 'No']}
              defaultValue={item.COS ? 'Yes' : 'No'}
              onSelect={text => handleDropdownUpdate(text, index, 'COS')}
              buttonStyle={item.COS ? styles.dropdownSuccess : styles.dropdownDanger}
            />
          </View>
          <View style={styles.dropdownContentContainer}>
            <Text style={styles.dropdownLabel}>Repeat Finding?</Text>
            <SelectDropdown
              data={['Yes', 'No']}
              defaultValue={item.repeat ? 'Yes' : 'No'}
              onSelect={text => handleDropdownUpdate(text, index, 'repeat')}
              buttonStyle={item.repeat ? styles.dropdownSuccess : styles.dropdownDanger}
            />
          </View>
          <View style={styles.dropdownContentContainer}>
            <Text style={styles.dropdownLabel}>Imminent Health Hazard?</Text>
            <SelectDropdown
              data={['Yes', 'No']}
              defaultValue={item.ihh ? 'Yes' : 'No'}
              onSelect={text => handleDropdownUpdate(text, index, 'ihh')}
              buttonStyle={item.ihh ? styles.dropdownSuccess : styles.dropdownDanger}
            />
          </View>
        </View>
      </>
    );
  };

  if (discrepanciesList.length !== 0) {
    return (
      <View style={styles.parentContainer}>
        <FlatList
          data={discrepanciesList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.section}${index}`}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.parentContainer}>
        <TouchableOpacity
          style={styles.addDiscrepanciesButton}
          onPress={() => navigation.push('find discrepancies')}
        >
          <Text style={styles.addDiscrepanciesButtonText}>Add Discrepancies</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  dropdownSuccess: {
    width: 100,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#76ff03',
    marginTop: 15,
  },
  dropdownDanger: {
    width: 100,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#d50000',
    marginTop: 15,
  },
  dropdownContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentContainerStyle: {
    paddingBottom: 400,
  },
  textContentContainer: {
    marginTop: 15,
  },
  dropdownLabel: {
    alignSelf: 'center',
    fontFamily: 'Raj',
    fontSize: 22,
    width: 200,
    marginTop: 7,
  },
  label: {
    alignSelf: 'center',
    fontFamily: 'Raj',
    fontSize: 22,
    marginBottom: 5,
  },
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  discrepancyCard: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    height: 100,
    borderRadius: 15,
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  addDiscrepanciesButton: {
    borderRadius: 5,
    backgroundColor: '#4dd0e1',
    padding: 15,
    margin: 10,
    width: 300,
    alignSelf: 'center',
  },
  addDiscrepanciesButtonText: {
    textAlign: 'center',
    fontFamily: 'Raj',
    fontSize: 20,
  },
  discrepancyContainer: {
    borderRadius: 1,
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    borderColor: 'black',
  },
  paragraph: {
    width: 'auto',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
  cancelButton: {
    borderRadius: 5,
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
    width: 30,
    margin: 5,
    height: 30,
  },
  cancelButtonText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ViewDiscrepancies;

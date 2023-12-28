import { TextInput, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const IHH = ({ navigation }) => {
  const { iHH, setIHH } = useContext(AppContext);

  return (
    <>
      <ScrollView
        style={styles.parentContainer}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Describe the Imminent Health Hazard</Text>

          <TextInput
            onChangeText={text => {
              setIHH(text);
            }}
            value={iHH}
            multiline={true}
            style={iHH != '' ? styles.warningTextInput : styles.textInput}
          />
          {iHH != '' && (
            <Text style={styles.warningLabel}>
              Warning: If this field is not left blank, the inspection is an automatic fail!
            </Text>
          )}

          <TouchableOpacity style={styles.naivgateButton} onPress={() => navigation.push('nav')}>
            <Text style={styles.navigateButtonText}>Move On To...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  contentContainer: {
    padding: 10,
    marginBottom: 200,
  },
  label: {
    fontFamily: 'Raj',
    fontSize: 22,
    alignSelf: 'center',
  },
  warningLabel: {
    fontFamily: 'Raj',
    fontSize: 22,
    alignSelf: 'center',
    color: 'red',
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    height: 350,
    width: 350,
    borderRadius: 15,
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  warningTextInput: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    height: 350,
    width: 350,
    borderRadius: 15,
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
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
});

export default IHH;

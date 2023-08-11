import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const IHH = () => {
  const [submited, setSubmited] = useState(false);
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
          {!submited ? (
            <>
              <Text style={styles.label}>
                Describe the Imminent Health Hazard
              </Text>
              <TextInput
                onChangeText={text => {
                  setIHH(text);
                }}
                value={iHH}
                multiline={true}
                style={styles.textInput}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => () => setSubmited(true)}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View>
                <Text style={styles.doneText}>IHH completed</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSubmited(false)}
                >
                  <Text style={styles.buttonText}>Edit IHH</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
  doneText: {
    fontFamily: 'Raj',
    fontSize: 18,
  },
  label: {
    fontFamily: 'Raj',
    fontSize: 22,
    alignSelf: 'center',
  },
  button: {
    textTransofrm: 'uppercase',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#76ff03',
    padding: 15,
    marginTop: 10,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Open-Sans',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    height: 350,
    borderRadius: 15,
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default IHH;

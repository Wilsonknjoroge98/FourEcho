import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppContext';
import ErrorModal from '../inspection/error modal/ErrorModal';
import * as Network from 'expo-network';

const Navigation = ({ navigation }) => {
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];
  const {
    validEmailPIC,
    validEmailInspector,
    validEmailPersonal,
    setErrorModalVisible,
    setErrorMessage,
  } = useContext(AppContext);

  const onFinished = async () => {
    const networkState = await Network.getNetworkStateAsync();

    if (!networkState.isConnected || !networkState.isInternetReachable) {
      setErrorMessage(
        'The DD 2973 cannot be processed, most likely due to network connectivity issues. Please try again when you establish a stable connection.',
      );
      setErrorModalVisible(true);
    } else {
      if (validEmailPIC && validEmailInspector && validEmailPersonal) {
        navigation.navigate('done');
      } else {
        setErrorMessage('Make sure to enter valid emails in all of the email fields.');
        setErrorModalVisible(true);
        navigation.navigate('background');
      }
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ErrorModal />
      <ScrollView>
        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          <View>
            {/* <LinearGradient
              colors={['#4ae02e', '#2EE06B', '#A3E02E']}
              end={{ x: 0.1, y: 0.7 }}
              style={prevRoute.name === 'assistant' ? styles.navButtonDisabled : styles.hawkButton}
            >
              <TouchableOpacity
                onPress={() => navigation.replace('assistant')}
                disabled={prevRoute.name === 'assistant' ? true : false}
              >
                <Text style={{ ...styles.navButtonText, fontSize: 25 }}>AI assistant</Text>
              </TouchableOpacity>
            </LinearGradient> */}
            <TouchableOpacity
              style={prevRoute.name === 'background' ? styles.navButtonDisabled : styles.navButton}
              onPress={() => navigation.replace('background')}
              disabled={prevRoute.name === 'background' ? true : false}
            >
              <Text style={styles.navButtonText}>Backgound</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                prevRoute.name === 'find discrepancies'
                  ? styles.navButtonDisabled
                  : styles.navButton
              }
              onPress={() => navigation.replace('find discrepancies')}
              disabled={prevRoute.name === 'find discrepancies' ? true : false}
            >
              <Text style={styles.navButtonText}>Add Discrepancies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                prevRoute.name === 'view discrepancies'
                  ? styles.navButtonDisabled
                  : styles.navButton
              }
              onPress={() => navigation.replace('view discrepancies')}
              disabled={prevRoute.name === 'view discrepancies' ? true : false}
            >
              <Text style={styles.navButtonText}>View / Edit Discrepancies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={prevRoute.name === 'nano' ? styles.navButtonDisabled : styles.navButton}
              onPress={() => navigation.replace('nano')}
              disabled={prevRoute.name === 'nano' ? true : false}
            >
              <Text style={styles.navButtonText}>NA / NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={prevRoute.name === 'temperature' ? styles.navButtonDisabled : styles.navButton}
              onPress={() => navigation.replace('temperature')}
              disabled={prevRoute.name === 'temperature' ? true : false}
            >
              <Text style={styles.navButtonText}>Temperature</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={prevRoute.name === 'sanitizing' ? styles.navButtonDisabled : styles.navButton}
              onPress={() => navigation.replace('sanitizing')}
              disabled={prevRoute.name === 'sanitizing' ? true : false}
            >
              <Text style={styles.navButtonText}>Sanitizing</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={prevRoute.name === 'ihh' ? styles.navButtonDisabled : styles.navButton}
              onPress={() => navigation.replace('ihh')}
              disabled={prevRoute.name === 'ihh' ? true : false}
            >
              <Text style={styles.navButtonText}>Imminent Health Hazard</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={prevRoute.name === 'free text' ? styles.navButtonDisabled : styles.navButton}
              onPress={() => navigation.replace('free text')}
              disabled={prevRoute.name === 'free text' ? true : false}
            >
              <Text style={styles.navButtonText}>Free Text</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={prevRoute.name === 'done' ? styles.navButtonDisabled : styles.navButton}
              onPress={onFinished}
              disabled={prevRoute.name === 'done' ? true : false}
            >
              <Text style={styles.navButtonText}>Finish Inspection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 100,
  },
  parentContainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  navButton: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#4dd0e1',
  },
  hawkButton: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#4ae02e',
  },
  navButtonDisabled: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#bdbdbd',
  },
  navButtonText: {
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  cancelButtonContainer: {
    marginTop: 50,
    marginBottom: 10,
  },
  cancelButton: {
    borderRadius: 15,
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
    width: 50,
    margin: 15,
    height: 50,
  },
  cancelButtonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Navigation;

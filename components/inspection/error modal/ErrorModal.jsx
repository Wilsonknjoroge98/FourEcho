import { useContext } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const ErrorModal = () => {
  const { errorModalVisible, setErrorModalVisible, errorMessage } =
    useContext(AppContext);

  const navigation = useNavigation();
  const routes = navigation.getState()?.routes;
  const currRoute = routes[routes.length - 1];

  return (
    <>
      <Modal
        animationType="slide"
        visible={errorModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View
          style={
            currRoute.name === 'background' && routes.length === 1
              ? styles.contentContainerWarning
              : styles.contentContainerError
          }
        >
          <View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>
                {currRoute.name === 'background' && routes.length === 1
                  ? 'Warning!'
                  : 'Error!'}
              </Text>
              <View style={styles.bodyContainer}>
                <Text style={styles.body}>{errorMessage}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerWarning: {
    flex: 1,
    backgroundColor: '#ffff00',
  },
  contentContainerError: {
    flex: 1,
    backgroundColor: '#f44336',
  },
  body: {
    fontFamily: 'Raj',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontFamily: 'Raj',
    fontSize: 60,
    alignSelf: 'center',
  },
  bodyContainer: {
    marginTop: 50,
    margin: 5,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 400,
    padding: 20,
  },
  modalLabel: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Open-Sans',
  },
  cancelButton: {
    borderRadius: 15,
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
    width: 50,
    marginTop: 50,
    marginLeft: 15,
    height: 50,
  },
  cancelButtonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ErrorModal;

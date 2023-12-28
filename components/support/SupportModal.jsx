import { useContext, useState } from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../../firebase';
import { AppContext } from '../context/AppContext';
import CheckmarkIcon from '../done/sign/CheckmarkIcon';

const SupportModal = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { supportModalVisible, setSupportModalVisible } = useContext(AppContext);

  const sendEmail = async () => {
    // upload special array to firestore which triggers email
    const db = getFirestore(firebaseApp);
    await addDoc(collection(db, 'mail'), {
      to: 'fourxecho@gmail.com',
      message: {
        subject: 'Feedback',
        html: `return email: ${email} /// message: ${message} `,
      },
    });
  };

  const handleModalClose = () => {
    setSupportModalVisible(false);
    setFormSubmitted(false);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    sendEmail();
  };

  return (
    <Modal
      animationType="slide"
      visible={supportModalVisible}
      onRequestClose={() => console.log('close')}
    >
      <View>
        <TouchableOpacity style={styles.cancelButton} onPress={handleModalClose}>
          <Text style={styles.cancelButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.modalContainer}>
        {!formSubmitted ? (
          <>
            <View style={styles.textFieldFlexBox}>
              <Text style={styles.label}>return email (optional)</Text>
              <TextInput
                style={styles.emailTextField}
                value={email}
                onChangeText={text => setEmail(text)}
              ></TextInput>
            </View>
            <View style={styles.textFieldFlexBox}>
              <Text style={styles.label}>message</Text>
              <TextInput
                style={styles.messageTextField}
                multiline={true}
                value={message}
                onChangeText={text => setMessage(text)}
              ></TextInput>
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleFormSubmit}>
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.submitContainer}>
              <Text style={styles.confirmationText}>Your message was submitted!</Text>
              <CheckmarkIcon />
            </View>
          </>
        )}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 200,
  },
  modalButton: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#76ff03',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textFieldFlexBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  emailTextField: {
    height: 40,
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
  },
  messageTextField: {
    height: 300,
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
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
  submitContainer: {
    marginTop: 200,
  },
  confirmationText: {
    textAlign: 'center',
    fontFamily: 'Raj',
    fontSize: 25,
  },
});

export default SupportModal;

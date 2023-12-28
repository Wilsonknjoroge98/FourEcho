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
import SelectDiscrepancies from '../../select discrepancies/SelectDiscrepancies';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../../../../firebase';
import { AppContext } from '../../../context/AppContext';
import axios from 'axios';
import { OpenAI } from 'openai';

const Assistant = () => {
  const handleSubmit = async () => {
    const openai = new OpenAI({
      apiKey: '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',
    });
    const assitant = await openai.beta.assistants.retrieve('asst_l5hSyKGnVVSVnK1MMmwFZAe7');
    // const message = await OpenAI.Beta.Threads.Messages.create(thread.id, {
    //   role: 'user',
    //   content: 'employees are not washing their hands',
    // });
    // const run = await OpenAI.Beta.Threads.Runs.create(thread.id, {
    //   assistant_id: 'asst_l5hSyKGnVVSVnK1MMmwFZAe7',
    //   instructions: 'Please address the user as Jane Doe. The user has a premium account.',
    // });
    // const messages = await OpenAI.Beta.Threads.Messages.list(thread.id);
    // console.log(messages);
  };
  return (
    <ScrollView style={styles.modalContainer}>
      <View style={styles.textFieldFlexBox}>
        <Text style={styles.label}>Provide a description of the potential finding</Text>
        <TextInput style={styles.messageTextField} multiline={true}></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSubmit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 200,
  },
  button: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#76ff03',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  buttonContainer: {
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

export default Assistant;

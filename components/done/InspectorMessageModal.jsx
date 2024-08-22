import { useContext } from 'react';
import { TextInput, Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../context/AppContext';

const InspectorMessageModal = ({ sendDoc }) => {
  const {
    setInspectorEmailMessage,
    inspectorEmailMessage,
    pdf,
    inspectorMessageModalVisible,
    setInspectorMessageModalVisible,
  } = useContext(AppContext);

  const handleSend = () => {
    setInspectorMessageModalVisible(false);
    sendDoc(pdf);
  };

  return (
    <Modal
      animationType='slide'
      visible={inspectorMessageModalVisible}
      onRequestClose={() => console.log('close')}
    >
      <ScrollView>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.modalLabel}>
              Optional message from inspector to include in the email
            </Text>
            <TextInput
              onChangeText={(text) => {
                setInspectorEmailMessage(text);
              }}
              value={inspectorEmailMessage}
              multiline={true}
              style={styles.textInput}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleSend} style={styles.modalButtonSuccess}>
                <Text style={styles.modalButtonText}>Send PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 300,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 400,
  },
  modalButtonSuccess: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#76ff03',
  },
  modalButtonDisabled: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#bdbdbd',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    height: 200,
    borderRadius: 15,
    fontSize: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  paragraph: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },

  modalLabel: {
    fontSize: 22,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Raj',
  },
});

export default InspectorMessageModal;

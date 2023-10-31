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
import HighlightText from '@sanar/react-native-highlight-text';

const NanoModal = ({ nanoModalVisible, setNanoModalVisible }) => {
  const { nanoInfo } = useContext(AppContext);
  return (
    <>
      <Modal
        animationType="slide"
        visible={nanoModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setNanoModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View>
              <HighlightText
                style={styles.infoText}
                highlightStyle={{ backgroundColor: 'yellow' }}
                searchWords={[nanoInfo.highlight]}
                textToHighlight={nanoInfo.body}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  infoText: {
    fontFamily: 'Raj',
    fontSize: 20,
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

export default NanoModal;

import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const InfoModal = ({ infoModalVisible, setInfoModalVisible }) => {
  return (
    <>
      <Modal
        animationType="slide"
        visible={infoModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setInfoModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.textView}>
              <Text style={styles.infoText}>
                Tap the white provision cards to reveal all of the children
                (e.g. lettered sections, numbered sections) of the provision.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.infoText}>
                If the provision contains children, the sub-section cards will
                be exposed below the card that was tapped.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.infoText}>
                This process can be done repeatedly until you reach to the most
                specific sub-section (e.g 2-102.12 (A) (1) (c)).
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.infoText}>
                Upon reaching a section that does not have sub-sections, the
                card will not respond to taps as there are no more descendants
                to reveal.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.infoText}>
                At this point, press and hold the final card to select the
                discrepancy{' '}
              </Text>
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
  textView: {
    marginTop: 20,
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

export default InfoModal;

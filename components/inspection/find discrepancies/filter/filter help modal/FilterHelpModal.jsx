import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const FilterHelpModal = ({ helpModalVisible, setHelpModalVisible }) => {
  return (
    <>
      <Modal
        animationType="slide"
        visible={helpModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setHelpModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.textView}>
              <Text style={styles.text}>
                All section cards containing the search word will be exposed
                when using search.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                All parent sections of the section card that contains the search
                word will be exposed.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Tap any section's card to reveal all of the children
                (reagardless of if they contain the search word) if you seek
                context for the provison.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                While the search is active, all cards that contain the search
                word will remain exposed--regardless of taps. In other words,
                tapping an expandable section will reveal child cards (including
                those that do not contain the search word) , however, when you
                attempt to re-collapse the cards, all section cards will be
                hidden with the exeption of the cards that contain the search
                word.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                When you reach a card that aligns with your observation, press
                and hold the section card to designate the discrepancy a finding
                in your inspection report.{' '}
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                For the sake of specificity, sections that have children cannot
                be selected. Only the most deeply nested section cards can be
                reported as findings.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}></Text>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
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

export default FilterHelpModal;

import { Modal, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HighlightText from '@sanar/react-native-highlight-text';

const staticHelpModal = ({ helpModalVisible, setHelpModalVisible }) => {
  return (
    <>
      <Modal
        animationType="slide"
        visible={helpModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setHelpModalVisible(false)}>
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={styles.textView}>
              <Text style={styles.text}>
                The Tri Service Food Code provisions are organized in a hiererichal structure using
                cards. Each white card represents a top-level section (e.g. 2-105.12). All
                subsections of the top-level sections are displayed as nested cards.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Tap the white provision cards to reveal all of the nested sections (i.e. capital
                lettered sections) of that provision.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                If the provision contains capital lettered sub-sections, cards corresponding to
                those lettered sections will be exposed below the card that was tapped.
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                This process can be done repeatedly until you reach the most specific sub-section
                card (e.g 2-102.12 (A) (1) (c)).
              </Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Upon reaching a section that does not have additional sub-sections, that section
                card will not respond to taps as there are no more descendant cards to reveal.
              </Text>
            </View>
            <View style={styles.textView}>
              <HighlightText
                style={styles.text}
                highlightStyle={{ backgroundColor: 'yellow' }}
                searchWords={[
                  'press and hold the section card to designate the discrepancy a finding in your inspection report',
                ]}
                textToHighlight="At this point, press and hold the section card to designate the discrepancy a finding in your inspection report"
              />
            </View>
            <View style={styles.textView}>
              <Text style={styles.text}>
                For the sake of specificity, sections that have children cannot be selected. Only
                the most deeply nested section cards can be reported as findings.
              </Text>
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

export default staticHelpModal;

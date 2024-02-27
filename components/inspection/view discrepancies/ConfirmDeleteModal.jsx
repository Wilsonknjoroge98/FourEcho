import { Modal, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DiscrepancyExcerpt from '../select discrepancies/discrepancy modal/subcomponents/DiscrepancyExerpt';

const ConfirmDeleteModal = ({
  modalVisible,
  setModalVisible,
  handleDelete,
  selectedDiscrepancy,
}) => {
  const closeDelete = () => {
    handleDelete(selectedDiscrepancy);
    setModalVisible(false);
  };
  return (
    <Modal animationType="slide" visible={modalVisible} onRequestClose={() => console.log('close')}>
      <ScrollView>
        <View style={styles.modalContainer}>
          <View style={{ marginRight: 30, marginLeft: 30 }}>
            <DiscrepancyExcerpt discrepancy={selectedDiscrepancy} />
          </View>

          <View>
            <Text style={styles.modalLabel}>Delete this discrepancy?</Text>
          </View>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButtonSuccess} onPress={closeDelete}>
              <Text style={styles.modalButtonText}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonDanger}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 100,
    marginBottom: 400,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalLabel: {
    fontSize: 22,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  modalButtonSuccess: {
    margin: 10,
    padding: 20,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#76ff03',
  },
  modalButtonDanger: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 150,
    borderColor: 'black',
    backgroundColor: '#d50000',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontFamily: 'Raj',
  },
  paragraph: {
    width: 'auto',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
});

export default ConfirmDeleteModal;

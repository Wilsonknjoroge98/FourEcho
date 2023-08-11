import { useContext, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import BinaryModal from './subcomponents/BinaryModal';
import FormModal from './subcomponents/FormModal';
import DiscrepancyExcerpt from './subcomponents/DiscrepancyExerpt';
import { AppContext } from '../../../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const DiscrepancyModal = ({}) => {
  const { discrepancy, modalVisible, setModalVisible } = useContext(AppContext);
  const [modalLabel, setModalLabel] = useState('Corrected on site?');
  const [formModal, setFormModal] = useState(false);

  const handleCancel = () => {
    setModalVisible(false);
    setModalLabel('Corrected on site?');
    setFormModal(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancel()}
          >
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View>
              <DiscrepancyExcerpt discrepancy={discrepancy} />
            </View>
            <View>
              <Text style={styles.modalLabel}>{modalLabel}</Text>
              {formModal ? (
                <FormModal
                  discrepancy={discrepancy}
                  setFormModal={setFormModal}
                  modalLabel={modalLabel}
                  setModalLabel={setModalLabel}
                />
              ) : (
                <BinaryModal
                  modalLabel={modalLabel}
                  setModalLabel={setModalLabel}
                  setFormModal={setFormModal}
                />
              )}
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
  modalContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 400,
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

export default DiscrepancyModal;

import { useContext, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import BinaryModal from './subcomponents/BinaryModal';
import FormModal from './subcomponents/FormModal';
import DiscrepancyExcerpt from './subcomponents/DiscrepancyExerpt';
import { AppContext } from '../../../context/AppContext';
import { ScrollView } from 'react-native-gesture-handler';

const DiscrepancyModal = ({}) => {
  const { discrepancy, discrepancyModalVisible, setDiscrepancyModalVisible } =
    useContext(AppContext);
  const [modalLabel, setModalLabel] = useState('Description of the observation');
  const [binaryModal, setBinaryModal] = useState(false);

  const handleCancel = () => {
    setDiscrepancyModalVisible(false);
    setModalLabel('Description of the observation');
    setBinaryModal(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={discrepancyModalVisible}
        onRequestClose={() => console.log('close')}
      >
        <View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel()}>
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContainer}>
            <View style={{ marginRight: 30, marginLeft: 30 }}>
              <DiscrepancyExcerpt discrepancy={discrepancy} />
            </View>

            <View>
              <Text style={styles.modalLabel}>{modalLabel}</Text>
              {binaryModal ? (
                <BinaryModal
                  modalLabel={modalLabel}
                  setModalLabel={setModalLabel}
                  setBinaryModal={setBinaryModal}
                />
              ) : (
                <FormModal
                  discrepancy={discrepancy}
                  setBinaryModal={setBinaryModal}
                  modalLabel={modalLabel}
                  setModalLabel={setModalLabel}
                />
              )}
            </View>
            {modalLabel === 'Imminent Health Hazard?' && (
              <View>
                <Text style={styles.ihhText}>
                  IHH: Emergency such as a fire, flood, extended interruption of electrical or water
                  service (greater than 2 hours), SEWAGE backup, misuse of POISONOUS OR TOXIC
                  MATERIALS, onset of an apparent foodborne illness outbreak, gross insanitary
                  occurrence or condition, or other circumstance that may endanger public health.{' '}
                </Text>
              </View>
            )}
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
    fontSize: 22,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Raj',
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
  ihhText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: 'Raj',
  },
});

export default DiscrepancyModal;

import { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../../../../context/AppContext';

const BinaryModal = ({ modalLabel, setModalLabel, setFormModal }) => {
  const { discrepancy, setDiscrepancy } = useContext(AppContext);

  const handleYes = () => {
    if (modalLabel === 'Corrected on site?') {
      setModalLabel('Repeat finding?');
      setDiscrepancy({
        ...discrepancy,
        COS: true,
      });
    } else if (modalLabel === 'Repeat finding?') {
      setDiscrepancy({
        ...discrepancy,
        repeat: true,
      });
      setFormModal(true);
      setModalLabel('Description of the observation');
    }
  };

  const handleNo = () => {
    if (modalLabel === 'Corrected on site?') {
      setModalLabel('Repeat finding?');
      setDiscrepancy({
        ...discrepancy,
        COR: false,
      });
    } else if (modalLabel === 'Repeat finding?') {
      setDiscrepancy({
        ...discrepancy,
        repeat: false,
      });
      setFormModal(true);
      setModalLabel('Description of the observation');
    }
  };
  return (
    <>
      <View style={styles.modalButtonContainer}>
        <TouchableOpacity style={styles.modalButtonSuccess} onPress={handleYes}>
          <Text style={styles.modalButtonText}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButtonDanger} onPress={handleNo}>
          <Text style={styles.modalButtonText}>NO</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
  },
});

export default BinaryModal;

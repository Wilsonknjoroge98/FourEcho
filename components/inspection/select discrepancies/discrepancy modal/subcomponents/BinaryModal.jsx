import { useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../../../../context/AppContext';

const BinaryModal = ({ modalLabel, setModalLabel, setBinaryModal }) => {
  const {
    discrepancy,
    setDiscrepancy,
    discrepanciesList,
    setDiscrepanciesList,
    setDiscrepancyModalVisible,
  } = useContext(AppContext);

  useEffect(() => {
    if (discrepancy.ihh != undefined) {
      setDiscrepanciesList([...discrepanciesList, discrepancy]);
      setBinaryModal(false);
      setDiscrepancyModalVisible(false);
      setModalLabel('Description of the observation');
    }
  }, [discrepancy]);

  const handleYes = () => {
    if (modalLabel === 'Corrected on site?') {
      setModalLabel('Repeat finding?');
      setDiscrepancy({
        ...discrepancy,
        COS: true,
      });
    } else if (modalLabel === 'Repeat finding?') {
      setModalLabel('Imminent Health Hazard?');
      setDiscrepancy({
        ...discrepancy,
        repeat: true,
      });
    } else if (modalLabel === 'Imminent Health Hazard?') {
      setDiscrepancy({
        ...discrepancy,
        ihh: true,
      });
    }
  };

  const handleNo = () => {
    if (modalLabel === 'Corrected on site?') {
      setModalLabel('Repeat finding?');
      setDiscrepancy({
        ...discrepancy,
        COS: false,
      });
    } else if (modalLabel === 'Repeat finding?') {
      setModalLabel('Imminent Health Hazard?');
      setDiscrepancy({
        ...discrepancy,
        repeat: false,
      });
    } else if (modalLabel === 'Imminent Health Hazard?') {
      setDiscrepancy({
        ...discrepancy,
        ihh: false,
      });
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
    fontFamily: 'Raj',
  },
});

export default BinaryModal;

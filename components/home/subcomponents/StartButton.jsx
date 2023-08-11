import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import moment from 'moment/moment';

const StartButton = ({ navigation }) => {
  const { setStartTime } = useContext(AppContext);

  const handleStart = () => {
    setStartTime(moment().format('h:mm'));
    navigation.replace('background');
  };
  return (
    <TouchableOpacity style={styles.startButton} onPress={handleStart}>
      <Text style={styles.startButtonText}>Start Inspection</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  startButton: {
    textTransofrm: 'uppercase',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#76ff03',
    padding: 15,
    marginTop: 10,
  },
  startButtonText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Cairo',
  },
});

export default StartButton;

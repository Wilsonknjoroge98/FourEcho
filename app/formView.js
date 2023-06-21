import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Form from '../components/Form';

const FormView = () => {
  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.formContainer}>
        <Form />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: 200,
  },
});

export default FormView;

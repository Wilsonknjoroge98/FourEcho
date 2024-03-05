import { useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

const EmailFields = ({ index, handleInput, backgroundValues }) => {
  const {
    validEmailInspector,
    setValidEmailInspector,
    validEmailPIC,
    setValidEmailPIC,
    validEmailPersonal,
    setValidEmailPersonal,
  } = useContext(AppContext);

  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateEmail = (text, index) => {
    if (re.test(text)) {
      if (index === 6) {
        setValidEmailInspector(true);
      } else if (index === 10) {
        setValidEmailPIC(true);
      } else {
        setValidEmailPersonal(true);
      }
    } else {
      if (index === 6) {
        setValidEmailInspector(false);
      } else if (index === 10) {
        setValidEmailPIC(false);
      } else {
        setValidEmailPersonal(false);
      }
    }
    handleInput(text, index);
  };

  if (index === 6) {
    return (
      <TextInput
        style={validEmailInspector ? styles.textBoxGood : styles.textBoxBad}
        onChangeText={text => validateEmail(text, index)}
        value={backgroundValues[6]?.text ?? ''}
      />
    );
  } else if (index === 10) {
    return (
      <TextInput
        style={validEmailPIC ? styles.textBoxGood : styles.textBoxBad}
        onChangeText={text => validateEmail(text, index)}
        value={backgroundValues[10]?.text ?? ''}
      />
    );
  } else {
    return (
      <TextInput
        style={validEmailPersonal ? styles.textBoxGood : styles.textBoxBad}
        onChangeText={text => validateEmail(text, index)}
        value={backgroundValues[12]?.text ?? ''}
      />
    );
  }
};

const styles = StyleSheet.create({
  textBoxGood: {
    height: 40,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 13,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  textBoxBad: {
    height: 40,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d50000',
    fontFamily: 'Open-Sans',
    fontSize: 13,
    alignSelf: 'center',
  },
});

export default EmailFields;

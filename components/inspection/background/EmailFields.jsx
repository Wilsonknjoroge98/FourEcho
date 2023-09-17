import { useContext } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { AppContext } from '../../context/AppContext';

const EmailFields = ({ index, handleInput, backgroundValues }) => {
  const {
    validEmailInspector,
    setValidEmailInspector,
    validEmailPIC,
    setValidEmailPIC,
  } = useContext(AppContext);

  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateEmail = (text, index) => {
    if (re.test(text)) {
      index === 6 ? setValidEmailInspector(true) : setValidEmailPIC(true);
    } else {
      index === 6 ? setValidEmailInspector(false) : setValidEmailPIC(false);
    }
    handleInput(text, index);
  };

  return (
    <>
      {index === 6 ? (
        <TextInput
          style={validEmailInspector ? styles.textBoxGood : styles.textBoxBad}
          onChangeText={text => validateEmail(text, index)}
          value={backgroundValues[6]?.text ?? ''}
        />
      ) : (
        <TextInput
          style={validEmailPIC ? styles.textBoxGood : styles.textBoxBad}
          onChangeText={text => validateEmail(text, index)}
          value={backgroundValues[10]?.text ?? ''}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textBoxGood: {
    height: 40,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Open-Sans',
    fontSize: 15,
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
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default EmailFields;

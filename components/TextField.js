import { TextInput, StyleSheet } from 'react-native';

const TextField = ({ text, setText }) => {
  return (
    <TextInput
      style={style}
      onChangeText={text => setText(text)}
      value={text}
    />
  );
};

const style = StyleSheet.create({
  height: 50,
  width: 350,
  padding: 10,
  borderWidth: 1,
  borderRadius: 5,
  fontFamily: 'Open-Sans',
  fontSize: 30,
});

export default TextField;

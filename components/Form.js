import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';
import TextField from './TextField';
import SelectField from './SelectField';

const fillPDF = async obj => {
  const response = await axios.get(
    'https://publichealthapp-5964a.web.app/dd__2973__blank.pdf',
    { responseType: 'arraybuffer' }
  );
  const formPdfBytes = response.data;
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();
  const keys = obj.keys;
  for (let i = 0; i < keys.length; i++) {
    const nameField = form.getTextField(keys[i]);
    nameField.setText(obj[keys[i]]);
  }
  const pdfBytes = await pdfDoc.save();
};

const fields = [
  'FACILITY NAME',
  'INSTALLATION',
  'FACILITY ADDRESS',
  'INSPECTION TYPE',
  'INSPECTOR NAME AND RANK',
  'INSPECTOR PHONE',
  'INSPECTOR EMAIL',
  'INSPECTOR UNIT',
  'Person In Charge FULL NAME',
  'Person In Charge PHONE',
  'Person In Charge E-MAIL',
];

const Form = () => {
  const [obj, setobj] = useState({});
  const [header, setHeader] = useState('FACILITY NAME');
  const [text, setText] = useState('');
  const [objFull, setObjFull] = useState(false);

  useEffect(() => {
    const router = useRouter();
    router.push('pdfView');
  }, [objFull]);

  const onPress = () => {
    setobj({
      ...obj,
      [header]: text,
    });

    if (obj.keys.length == 11) setObjFull(true);

    setHeader(fields[fields.indexOf(header) + 1]);
    setText('');
  };

  if (objFull) {
    return <>PDF</>;
  } else if (header !== 'INSPECTION TYPE') {
    return (
      <>
        <Text style={styles.label}>{header}</Text>
        <TextField text={text} setText={setText} />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </>
    );
  } else if (header === 'INSPECTION TYPE') {
    return (
      <>
        <Text style={styles.label}>{header}</Text>
        <SelectField text={text} setText={setText} />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </>
    );
  }
};

const styles = StyleSheet.create({
  label: { marginBottom: 10, fontSize: 20, fontFamily: 'Open-Sans' },
  button: {
    textTransofrm: 'uppercase',
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#2196f375',
    padding: 15,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Form;

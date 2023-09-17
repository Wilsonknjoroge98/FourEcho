import { useContext, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';
import { AppContext } from '../../context/AppContext';
import CheckmarkIcon from './CheckmarkIcon';

const Signatures = () => {
  const inspectorRef = useRef();
  const PICRef = useRef();

  const {
    inspectorSignature,
    setInspectorSignature,
    picSignature,
    setPICSignature,
  } = useContext(AppContext);
  return (
    <>
      <View style={{ height: 215 }}>
        <Text style={styles.headerText}>Insepctor Signature</Text>
        {inspectorSignature === null ? (
          <Signature
            ref={inspectorRef}
            onOK={img => setInspectorSignature(img)}
            descriptionText={''}
            maxWidth={0.5}
            webStyle={`
              .m-signature-pad {
              height: 75px;
              }
              .m-signature-pad--footer {
                height: 30px;
                width: 400px
              }
           `}
          />
        ) : (
          <CheckmarkIcon />
        )}
      </View>
      <View style={{ height: 215 }}>
        <Text style={styles.headerText}>PIC Signature</Text>
        {picSignature === null ? (
          <Signature
            ref={PICRef}
            onOK={img => setPICSignature(img)}
            descriptionText={''}
            maxWidth={0.5}
            webStyle={`
              .m-signature-pad {
              height: 75px;
              }
              .m-signature-pad--footer {
                height: 30px;
                width: 400px
              }
           `}
          />
        ) : (
          <CheckmarkIcon />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'Raj',
    padding: 20,
  },
});

export default Signatures;

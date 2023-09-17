import { useContext } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { AppContext } from '../../context/AppContext';
import Pdf from 'react-native-pdf';

const PdfView = () => {
  const { base64Pdf } = useContext(AppContext);

  return (
    <View style={styles.parentContainter}>
      <Pdf
        source={{
          uri: `data:application/pdf;base64,${base64Pdf}`,
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainter: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfView;

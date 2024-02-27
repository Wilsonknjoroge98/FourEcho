import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DiscrepancyExcerpt = ({ discrepancy }) => {
  return (
    <>
      <View style={styles.paragraph}>
        <Text>{discrepancy.header}</Text>
      </View>
      {discrepancy.header != discrepancy.text && (
        <>
          <LinearGradient colors={['#b2ff59', '#ccff90']} style={styles.paragraph}>
            <Text>{discrepancy.text}</Text>
          </LinearGradient>
          {discrepancy.children && discrepancy.children.length !== 0 && (
            <>
              <LinearGradient colors={['#18ffff', '#84ffff']} style={styles.paragraph}>
                <Text>{discrepancy.children[0].text}</Text>
              </LinearGradient>
              {discrepancy.children.children && discrepancy.children.children.length !== 0 && (
                <>
                  <LinearGradient colors={['#ffd740', '#ffe57f']} style={styles.paragraph}>
                    <Text>{discrepancy.children.children[0].text}</Text>
                  </LinearGradient>
                  {discrepancy.children.children.children &&
                    discrepancy.children.children.children.length !== 0 && (
                      <>
                        <LinearGradient
                          colors={['#e040fb80', '#ea80fc80']}
                          style={styles.paragraph}
                        >
                          <Text>{discrepancy.children.children.children[0].text}</Text>
                        </LinearGradient>
                      </>
                    )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    width: 'auto',
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
});

export default DiscrepancyExcerpt;

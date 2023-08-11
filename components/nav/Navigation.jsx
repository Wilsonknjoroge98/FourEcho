import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Navigation = ({ navigation }) => {
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  return (
    <SafeAreaView>
      <View style={styles.cancelButtonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={
            prevRoute.name === 'find discrepancies'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('find discrepancies')}
          disabled={prevRoute.name === 'find discrepancies' ? true : false}
        >
          <Text style={styles.navButtonText}>Add Discrepancies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            prevRoute.name === 'view discrepancies'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('view discrepancies')}
          disabled={prevRoute.name === 'view discrepancies' ? true : false}
        >
          <Text style={styles.navButtonText}>View Discrepancies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            prevRoute.name === 'background'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('background')}
          disabled={prevRoute.name === 'background' ? true : false}
        >
          <Text style={styles.navButtonText}>Backgound</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            prevRoute.name === 'temperature'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('temperature')}
          disabled={prevRoute.name === 'temperature' ? true : false}
        >
          <Text style={styles.navButtonText}>Temperature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            prevRoute.name === 'sanitizing'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('sanitizing')}
          disabled={prevRoute.name === 'sanitizing' ? true : false}
        >
          <Text style={styles.navButtonText}>Sanitizing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            prevRoute.name === 'ihh'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('ihh')}
          disabled={prevRoute.name === 'ihh' ? true : false}
        >
          <Text style={styles.navButtonText}>Imminent Health Hazard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            prevRoute.name === 'done'
              ? styles.navButtonDisabled
              : styles.navButton
          }
          onPress={() => navigation.replace('done')}
          disabled={prevRoute.name === 'done' ? true : false}
        >
          <Text style={styles.navButtonText}>Finish Inspection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navButton: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#4dd0e1',
  },
  navButtonDisabled: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#bdbdbd',
  },
  navButtonText: {
    textAlign: 'center',
  },
  cancelButtonContainer: {
    marginTop: 50,
    marginBottom: 75,
  },
  cancelButton: {
    borderRadius: 15,
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
    width: 50,
    margin: 15,
    height: 50,
  },
  cancelButtonText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Navigation;

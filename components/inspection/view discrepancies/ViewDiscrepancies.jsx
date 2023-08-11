import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../context/AppContext';

const ViewDiscrepancies = ({ navigation }) => {
  const { setDiscrepanciesList, discrepanciesList } = useContext(AppContext);

  const handleDelete = item => {
    setDiscrepanciesList(prevDiscrepanciesList => {
      const updatedDiscrepanciesList = prevDiscrepanciesList.filter(
        listItem => listItem !== item
      );
      return updatedDiscrepanciesList;
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.contentContainer}>
        <View>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleDelete(item)}
          >
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paragraph}>
          <Text>{item.header}</Text>
        </View>
        {item.header != item.text && (
          <>
            <LinearGradient
              colors={['#b2ff59', '#ccff90']}
              style={styles.paragraph}
            >
              <Text>{item.text}</Text>
            </LinearGradient>
            {item.children && item.children.length !== 0 && (
              <>
                <LinearGradient
                  colors={['#18ffff', '#84ffff']}
                  style={styles.paragraph}
                >
                  <Text>{item.children[0].text}</Text>
                </LinearGradient>
                {item.children.children &&
                  item.children.children.length !== 0 && (
                    <>
                      <LinearGradient
                        colors={['#ffd740', '#ffe57f']}
                        style={styles.paragraph}
                      >
                        <Text>{item.children.children[0].text}</Text>
                      </LinearGradient>
                      {item.children.children.children &&
                        item.children.children.children.length !== 0 && (
                          <>
                            <LinearGradient
                              colors={['#f48fb1', '#f8bbd0']}
                              style={styles.paragraph}
                            >
                              <Text>
                                {item.children.children.children[0].text}
                              </Text>
                            </LinearGradient>
                          </>
                        )}
                    </>
                  )}
              </>
            )}
          </>
        )}
      </View>
    );
  };

  if (discrepanciesList.length !== 0) {
    return (
      <View style={styles.parentContainer}>
        <FlatList
          data={discrepanciesList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.section}${index}`}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.parentContainer}>
        <TouchableOpacity
          style={styles.addDiscrepanciesButton}
          onPress={() => navigation.push('find discrepancies')}
        >
          <Text style={styles.addDiscrepanciesButtonText}>
            Add Discrepancies
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginBottom: 250,
  },
  parentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
  contentContainer: {
    margin: 20,
  },
  addDiscrepanciesButton: {
    textTransofrm: 'uppercase',
    borderRadius: 5,
    borderColor: 'black',
    width: 300,
    marginLeft: 30,
    marginRight: 30,
    borderColor: 'black',
    padding: 20,
    borderWidth: 1,
    marginBottom: 150,
    backgroundColor: '#4dd0e1',
  },
  addDiscrepanciesButtonText: {
    textAlign: 'center',
    fontFamily: 'Cairo',
    fontSize: 20,
  },
  discrepancyContainer: {
    borderRadius: 1,
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    borderColor: 'black',
  },
  paragraph: {
    width: 'auto',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 1,
    marginBottom: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
  cancelButton: {
    borderRadius: 5,
    backgroundColor: '#bdbdbd',
    justifyContent: 'center',
    width: 30,
    margin: 5,
    height: 30,
  },
  cancelButtonText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ViewDiscrepancies;

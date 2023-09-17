import { useState, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Numbers from './Numbers';
import { AppContext } from '../../../context/AppContext';

const BigLetter = ({ items, expandedSection, parentIndex }) => {
  const [expandedBigLetter, setExpandedBigLetter] = useState({});
  const { setDiscrepancy, setDiscrepancyModalVisible } = useContext(AppContext);

  const handleBigLetterPress = index => {
    setExpandedBigLetter(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleLongPress = item => {
    setDiscrepancy(item);
    setDiscrepancyModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <>
      {expandedSection[parentIndex] && (
        <>
          <TouchableOpacity
            onPress={() => {
              if (!item.selectable) handleBigLetterPress(index);
            }}
            onLongPress={() => {
              if (item.selectable) handleLongPress(item);
            }}
          >
            <View style={styles.card}>
              <LinearGradient
                colors={['#b2ff59', '#ccff90']}
                style={styles.textContainer}
              >
                <Text>{item.text}</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <Numbers
            items={item.children}
            expandedBigLetter={expandedBigLetter}
            parentIndex={index}
            bigLetterItem={item}
          />
        </>
      )}
    </>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={dict => dict.id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    padding: 0,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  textContainer: {
    elevation: 5,
    width: 'auto',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
  text: {
    color: 'black',
  },
});

export default BigLetter;

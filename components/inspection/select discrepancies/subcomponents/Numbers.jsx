import { useState, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SmallLetters from './SmallLetters';
import { AppContext } from '../../../context/AppContext';

const Numbers = ({ items, expandedBigLetter, parentIndex, bigLetterItem }) => {
  const [expandedNumbers, setExpandedNumbers] = useState({});
  const { setModalVisible, setDiscrepancy } = useContext(AppContext);

  const handlePress = parentIndex => {
    setExpandedNumbers(prevState => ({
      ...prevState,
      [parentIndex]: !prevState[parentIndex],
    }));
  };

  const handleLongPress = item => {
    setDiscrepancy(() => {
      const discrepancy = { ...bigLetterItem };
      discrepancy.children = bigLetterItem.children.filter(dict => {
        return dict.text === item.text;
      });
      return discrepancy;
    });
    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <>
      {expandedBigLetter[parentIndex] && (
        <>
          <TouchableOpacity
            onPress={() => {
              if (!item.selectable) handlePress(index);
            }}
            onLongPress={() => {
              if (item.selectable) handleLongPress(item);
            }}
          >
            <View style={styles.card}>
              <LinearGradient
                colors={['#18ffff', '#84ffff']}
                style={styles.textContainer}
              >
                <Text>{item.text}</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <SmallLetters
            items={item.children}
            expandedNumbers={expandedNumbers}
            parentIndex={index}
            bigLetterItem={bigLetterItem}
            numberItem={item}
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
export default Numbers;

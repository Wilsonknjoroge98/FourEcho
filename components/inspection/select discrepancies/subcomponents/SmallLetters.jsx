import { useState, useContext, useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Eyes from './Eyes';
import { AppContext } from '../../../context/AppContext';

const SmallLetters = ({
  items,
  expandedNumbers,
  parentIndex,
  bigLetterItem,
  numberItem,
}) => {
  const [expandedSmallLetters, setExpandedSmallLetters] = useState({});
  const { setModalVisible, setDiscrepancy, discrepancy } =
    useContext(AppContext);

  const handlePress = index => {
    setExpandedSmallLetters(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleLongPress = item => {
    setDiscrepancy(() => {
      const discrepancy = { ...bigLetterItem };
      discrepancy.children = bigLetterItem.children.filter(dict => {
        return dict.text === numberItem.text;
      });
      discrepancy.children.children = numberItem.children.filter(dict => {
        return dict.text === item.text;
      });

      return discrepancy;
    });

    setModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <>
      {expandedNumbers[parentIndex] && (
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
                colors={['#ffd740', '#ffe57f']}
                style={styles.textContainer}
              >
                <Text>{item.text}</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <Eyes
            items={item.children}
            expandedSmallLetters={expandedSmallLetters}
            parentIndex={index}
            bigLetterItem={bigLetterItem}
            numberItem={numberItem}
            smallLetterItem={item}
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

export default SmallLetters;

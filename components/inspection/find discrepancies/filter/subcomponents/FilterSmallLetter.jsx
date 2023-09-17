import { useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../../../context/AppContext';
import HighlightText from '@sanar/react-native-highlight-text';
import FilterEyes from './FilterEyes';

const FilterSmallLetter = ({
  items,
  searchQuery,
  expandedNumber,
  parentIndex,
  bigLetterItem,
  numberItem,
}) => {
  const [expandedSmallLetter, setExpandedSmallLetter] = useState({});
  const { setDiscrepancyModalVisible, setDiscrepancy } = useContext(AppContext);

  const handlePress = index => {
    setExpandedSmallLetter(prevState => ({
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
    setDiscrepancyModalVisible(true);
  };

  const searchObjects = (arr, search) => {
    for (let i = 0; i < arr.length; i++) {
      let obj = arr[i];
      const textMatch = obj.text.toLowerCase().includes(search);

      if (textMatch) return true;

      if (!textMatch && obj.children.length > 0) {
        if (searchObjects(obj.children, search)) {
          return true;
        }
      }
    }
    return false;
  };

  const expand = obj => {
    const textMatch = obj.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (textMatch) return true;

    if (!textMatch && obj.children.length > 0) {
      return searchObjects(obj.children, searchQuery.toLowerCase());
    } else {
      return false;
    }
  };

  const renderItem = ({ item, index }) => (
    <>
      {(expand(item) || expandedNumber[parentIndex]) && (
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
                <HighlightText
                  highlightStyle={{ backgroundColor: 'yellow' }}
                  searchWords={[
                    `${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
                    `${searchQuery
                      .toLowerCase()
                      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
                    `${searchQuery
                      .toUpperCase()
                      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
                  ]}
                  textToHighlight={item.text}
                />
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <FilterEyes
            items={item.children}
            searchQuery={searchQuery}
            expandedSmallLetter={expandedSmallLetter}
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

export default FilterSmallLetter;

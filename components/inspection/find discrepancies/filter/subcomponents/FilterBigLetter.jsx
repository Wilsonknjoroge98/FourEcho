import { useState, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../../../context/AppContext';
import FilterNumber from './FilterNumber';
import HighlightText from '@sanar/react-native-highlight-text';

const FilterBigLetter = ({
  items,
  searchQuery,
  expandedSection,
  parentIndex,
}) => {
  const [expandedBigLetter, setExpandedBigLetter] = useState({});
  const { setDiscrepancyModalVisible, setDiscrepancy } = useContext(AppContext);

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
      {(expand(item) || expandedSection[parentIndex]) && (
        <>
          <TouchableOpacity
            onPress={() => handleBigLetterPress(index)}
            onLongPress={() => {
              if (item.selectable) handleLongPress(item);
            }}
          >
            <View style={styles.card}>
              <LinearGradient
                colors={['#b2ff59', '#ccff90']}
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
          <FilterNumber
            items={item.children}
            searchQuery={searchQuery}
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
    width: 'auto',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
  text: {
    color: 'black',
  },
  background: {
    flex: 1,
    height: '100%',
  },
});

export default FilterBigLetter;

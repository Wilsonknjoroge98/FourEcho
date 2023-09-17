import { useContext } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../../../context/AppContext';
import HighlightText from '@sanar/react-native-highlight-text';

const FilterEyes = ({
  items,
  searchQuery,
  expandedSmallLetter,
  parentIndex,
  bigLetterItem,
  numberItem,
  smallLetterItem,
}) => {
  const { setDiscrepancyModalVisible, setDiscrepancy } = useContext(AppContext);
  const handleLongPress = item => {
    setDiscrepancy(() => {
      const discrepancy = { ...bigLetterItem };
      discrepancy.children = bigLetterItem.children.filter(dict => {
        return dict.text === numberItem.text;
      });

      discrepancy.children.children = numberItem.children.filter(dict => {
        return dict.text === smallLetterItem.text;
      });

      discrepancy.children.children.children = smallLetterItem.children.filter(
        dict => {
          return dict.text === item.text;
        }
      );

      return discrepancy;
    });
    setDiscrepancyModalVisible(true);
  };
  const expand = obj => {
    const textMatch = obj.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (textMatch) {
      return true;
    } else {
      return false;
    }
  };

  const renderItem = ({ item }) => (
    <>
      {(expand(item) || expandedSmallLetter[parentIndex]) && (
        <>
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <View style={styles.card}>
              <LinearGradient
                colors={['#e040fb80', '#ea80fc80']}
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

export default FilterEyes;

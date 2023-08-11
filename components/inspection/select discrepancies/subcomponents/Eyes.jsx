import { useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../../context/AppContext';
const Eyes = ({
  items,
  expandedSmallLetters,
  parentIndex,
  bigLetterItem,
  numberItem,
  smallLetterItem,
}) => {
  const { setModalVisible, setDiscrepancy } = useContext(AppContext);
  const handleLongPress = item => {
    setDiscrepancy(() => {
      const discrepancy = { ...bigLetterItem };
      discrepancy.children = bigLetterItem.children.filter(dict => {
        return dict.text === numberItem.text;
      });

      discrepancy.children.children = numberItem.children.filter(dict => {
        return dict.text === item.text;
      });

      discrepancy.children.children = smallLetterItem.childre.filter(dict => {
        return dict.text === item.text;
      });

      return discrepancy;
    });
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <>
      {expandedSmallLetters[parentIndex] && (
        <>
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <View style={styles.card}>
              <LinearGradient
                colors={['#e040fb80', '#ea80fc80']}
                style={styles.textContainer}
              >
                <Text>{item.text}</Text>
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

export default Eyes;

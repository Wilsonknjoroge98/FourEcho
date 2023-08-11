import { useState, useContext } from 'react';
import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import DiscrepancyModal from './modal/DiscrepancyModal';
import BigLetter from './subcomponents/BigLetter';
import { AppContext } from '../../context/AppContext';
import uuid from 'react-native-uuid';

const SelectDiscrepancies = () => {
  const [expandedSection, setExpandedSection] = useState({});
  const { itemGroup, setDiscrepancy } = useContext(AppContext);

  const handleSectionPress = index => {
    setExpandedSection(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleLongPress = item => {
    setModalVisible(true);
    setDiscrepancy(item);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item.length > 1) handleSectionPress(index);
          }}
          onLongPress={() => {
            if (item.length === 1) {
              () => handleLongPress(item[index]);
            }
          }}
        >
          <Text style={styles.paragraph}>{item[0].header}</Text>
        </TouchableOpacity>
        <BigLetter
          items={item}
          expandedSection={expandedSection}
          parentIndex={index}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.background}>
        <View>
          <Text style={styles.title}>
            Press and Hold Discrepancy To Continue
          </Text>
        </View>
        <DiscrepancyModal />
        {itemGroup && (
          <FlatList
            data={itemGroup}
            renderItem={renderItem}
            keyExtractor={() => uuid.v4()}
            contentContainerStyle={styles.contentContainerStyle}
            maxToRenderPerBatch={1}
            initialNumToRender={10}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 500,
  },
  background: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'Kite-One',
  },
  paragraph: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
  },
});

export default SelectDiscrepancies;

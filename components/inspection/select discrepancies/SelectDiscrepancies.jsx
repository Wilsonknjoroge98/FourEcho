import { useState, useContext } from 'react';
import React from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import DiscrepancyModal from './discrepancy modal/DiscrepancyModal';
import BigLetter from './subcomponents/BigLetter';
import InfoModal from './info modal/InfoModal';
import { AppContext } from '../../context/AppContext';
import uuid from 'react-native-uuid';

const SelectDiscrepancies = () => {
  const [expandedSection, setExpandedSection] = useState({});
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const { itemGroup, setDiscrepancy, setDiscrepancyModalVisible } =
    useContext(AppContext);

  const handleSectionPress = index => {
    setExpandedSection(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleLongPress = item => {
    setDiscrepancyModalVisible(true);
    setDiscrepancy(item);
    console.log(item);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item.length > 1) handleSectionPress(index);
          }}
          onLongPress={() => {
            if (item.length == 1) {
              handleLongPress(item[0]);
            }
          }}
        >
          <View style={styles.card}>
            <Text>{item[0].header}</Text>
          </View>
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
          <TouchableOpacity onPress={() => setInfoModalVisible(true)}>
            <Image
              style={styles.infoIcon}
              source={require('../../../assets/images/info__icon.png')}
            />
          </TouchableOpacity>
        </View>
        <InfoModal
          infoModalVisible={infoModalVisible}
          setInfoModalVisible={setInfoModalVisible}
        />
        <DiscrepancyModal />
        {itemGroup && (
          <FlatList
            data={itemGroup}
            renderItem={renderItem}
            keyExtractor={() => uuid.v4()}
            contentContainerStyle={styles.contentContainerStyle}
            maxToRenderPerBatch={20}
            initialNumToRender={20}
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
  card: {
    backgroundColor: '#ffffff',
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },

  infoIcon: {
    height: 25,
    width: 25,
    margin: 10,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
});

export default SelectDiscrepancies;

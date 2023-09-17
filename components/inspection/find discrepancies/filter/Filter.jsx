import { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import FilterBigLetter from './subcomponents/FilterBigLetter';
import HighlightText from '@sanar/react-native-highlight-text';
import DiscrepancyModal from '../../select discrepancies/discrepancy modal/DiscrepancyModal';
import { AppContext } from '../../../context/AppContext';
import { Skeleton } from '@rneui/themed';

const Filter = ({ data, searchQuery, navigation }) => {
  const [expandedSection, setExpandedSection] = useState({});
  const { filterLoading, setDiscrepancyModalVisible, setDiscrepancy } =
    useContext(AppContext);

  const handleSectionPress = parentIndex => {
    setExpandedSection(prevState => ({
      ...prevState,
      [parentIndex]: !prevState[parentIndex],
    }));
  };

  const handleLongPress = item => {
    setDiscrepancy(item);
    setDiscrepancyModalVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item.length > 1) {
              handleSectionPress(index);
            }
          }}
          onLongPress={() => {
            if (item.length === 1) {
              handleLongPress(item[0]);
            }
          }}
        >
          <View style={styles.card}>
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
              textToHighlight={item[0].header}
            />
          </View>
        </TouchableOpacity>
      </View>
      {item.length > 1 && (
        <FilterBigLetter
          items={item}
          searchQuery={searchQuery}
          navigation={navigation}
          expandedSection={expandedSection}
          parentIndex={index}
        />
      )}
    </>
  );

  if (!filterLoading) {
    return (
      <View>
        {/* <View>
          <Text style={styles.title}>
            Press and Hold Discrepancy To Continue
          </Text>
        </View> */}
        <DiscrepancyModal />
        {data && (
          <>
            <FlatList
              style={styles.flatList}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item[0].section}${index}`}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.skeletonContainer}>
        <Skeleton animation={'wave'} style={styles.skeleton} />
        <Skeleton animation={'wave'} style={styles.skeleton} />
        <Skeleton animation={'wave'} style={styles.skeleton} />
        <Skeleton animation={'wave'} style={styles.skeleton} />
        <Skeleton animation={'wave'} style={styles.skeleton} />
        <Skeleton animation={'wave'} style={styles.skeleton} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  skeletonContainer: {
    // flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  skeleton: {
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    width: 350,
    alignSelf: 'center',
    height: 53,
  },
  contentContainerStyle: {
    paddingBottom: 300,
  },

  activityIndicator: {
    marginTop: 500,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
  text: {
    backgroundColor: 'white',
    color: 'black',
  },
});

export default Filter;

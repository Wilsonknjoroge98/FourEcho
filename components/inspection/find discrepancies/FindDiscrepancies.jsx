import { useContext, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Static from './static/Static';
import Filter from './filter/Filter';
import { AppContext } from '../../context/AppContext';
import dataStore from '../../../assets/data/data';

const FindDiscrepancies = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const searchQueryRef = useRef('');
  const { setFilterLoading } = useContext(AppContext);

  const updateSearch = async searchText => {
    setFilterLoading(true);
    searchQueryRef.current = searchText;
    setSearchQuery(searchText);

    const searchDicts = (arr, regex) => {
      for (let i = 0; i < arr.length; i++) {
        let dict = arr[i];

        if (dict.header) {
          const headerMatch = regex.test(dict.header.toLowerCase());
          if (headerMatch) return true;
        }

        const textMatch = regex.test(dict.text.toLowerCase());
        if (textMatch) return true;

        if (!textMatch && dict.children.length > 0) {
          if (searchDicts(dict.children, regex)) {
            return true;
          }
        }
      }
      return false;
    };

    const keys = Object.keys(dataStore);
    const filteredData = [];
    const escapedSearch = searchQueryRef.current
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(escapedSearch);

    for (let i = 0; i < keys.length; i++) {
      let filter = dataStore[keys[i]].filter(arr => {
        return searchDicts(arr, regex);
      });
      filteredData.push(...filter);
    }

    setData(filteredData);
    setTimeout(() => {
      setFilterLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView>
      <SearchBar
        containerStyle={styles.searchBarContainer}
        // style={styles.searchBar}
        onChangeText={updateSearch}
        value={searchQuery}
        lightTheme={true}
        round={true}
      />
      {searchQuery === '' ? (
        <Static navigation={navigation} />
      ) : (
        <Filter data={data} searchQuery={searchQuery} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 0,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});

export default FindDiscrepancies;

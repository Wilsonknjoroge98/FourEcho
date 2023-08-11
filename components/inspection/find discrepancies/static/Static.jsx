import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { AppContext } from '../../../context/AppContext';
import dataStore from '../../../../assets/data/data';

const sectionText = [
  ['1. PIC lacks knowledge of procedures', '2. Training deficiencies'],
  [
    '3. Hand wash sink: available; supplied; accessible',
    '4. Handwashing',
    '5. employees sick at work',
    '6. emloyees not using gloves',
    '7. employees not using proper hygiene (clothing, hair, jewlery)',
    '8. employees drinking, eating, using tobacco',
  ],
  [
    '9. Approved sources; food specifications',
    '10. Food condition; unadulterated; receipt temperature',
    '11. Required records: shellstock tags; parasite destruction',
    '12. Food labels; original container; major food allergen',
    '13. Leftovers',
    '14. Temperature Control for Safety (TCS) food: date marking, retention, disposition',
  ],
  [
    '15. food separated & protected in storage',
    '16. Fresh fruits and vegetables properly washed',
    '17. Clean/sanitized food-contact surfaces',
    '18. Food: returned, previously served, recona1tioned; highlv suscectible pooulation prohibitions',
    '19. Contamination prevented during food prep, service & display',
    '20. Food additives: approved; proper use',
    '21. Ice used as coolant; food contact with water/ice',
    '22. Gloves used properly',
    '23. Wiping cloths: use; storage',
    '24. Insects, rodents, animals',
    '25. Toxic substances: authorized; properly identified, stored & used',
  ],
  [
    '26. Thawing frozen TCS foods',
    '27. Cooking & reheating time and temperatures',
    '28. Fruits/vegetables heated for hot holding',
    '29. Cooling time & temperature',
    '30. Cooling methods; adequate equipment',
    '31. Hot holding temperature',
    '32. Cold holding and storage',
    '33. Consumer advisory: raw/undercooked food',
    '34. Time as public health control; HACCP;',
  ],
  [
    '35. Thermometers provided and accurate',
    '36. In-use utensil storage',
    '37. Food equipment: installation, condition, use',
    '38. Utensils, equipment, linens: drying, storage, handling',
    '39. Single-use/service items: storage; use',
    '40. Warewashing: equipment; procedures; cleaners & sanitizers; test kits',
    '41. Nonfood-contact surfaces; cooking/baking surfaces',
  ],
  [
    '42. Hot and cold water: available; capacity; pressure',
    '43. Potable water; plumbing system; cross connections',
    '44. Sewage/wastewater system; disposal; grease traps',
    '45. Garbage/refuse: disposa1; racilities; covered receptacles',
    '46. Restrooms: proper install; supplied; clean',
    '47. Physical facilities: proper install; repair; clean',
    '48. Lighting: adequate; proper fixtures',
    '49. Ventilation & hoods: adequate, maintained',
    '50. Ice machines properly maintained, operated',
    '51. Other findings',
  ],
];

const sectionHeaders = [
  { text: 'Supervision and Training', id: 1 },
  { text: 'Health and Hygiene', id: 2 },
  { text: 'Food Source, Identification, Condition', id: 3 },
  { text: 'Contamination Protection and Prevention', id: 4 },
  { text: 'Temperature Control', id: 5 },
  { text: 'Utensils and Equipment', id: 6 },
  { text: 'Physical Facilities', id: 7 },
];

const Static = ({ navigation }) => {
  const { setItemGroup } = useContext(AppContext);

  const handleSectionClick = itemText => {
    const num = itemText.match('[1-9][0-9]?')[0];
    const group = dataStore[`item${num}`];
    setItemGroup(group);
    navigation.push('select discrepancies');
  };

  const renderItem = ({ item, index }) => (
    <>
      <Text style={styles.header}>{item.text}</Text>
      {sectionText[index].map((itemText, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => handleSectionClick(itemText)}
        >
          <Text>{itemText}</Text>
        </TouchableOpacity>
      ))}
    </>
  );

  return (
    <View style={styles.parentContainer}>
      <FlatList
        data={sectionHeaders}
        renderItem={renderItem}
        keyExtractor={sectionHeader => sectionHeader.id}
        contentContainerStyle={styles.contentContainerStyle}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  switchSortButton: {
    width: 100,
    borderRadius: 5,
    height: 35,
    margin: 5,
    padding: 7,
    alignSelf: 'flex-end',
    backgroundColor: '#64b5f6',
  },
  switchSortButtonText: {
    alignSelf: 'center',
  },
  parentContainer: {
    backgroundColor: '#ffffff',
  },
  contentContainerStyle: {
    paddingBottom: 400,
  },
  background: {
    backgroundColor: '#ffffff',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 2,
    fontFamily: 'Cairo',
  },
  header: {
    alignSelf: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    fontFamily: 'Kite-One',
  },
  button: {
    backgroundColor: '#ffffff',
    width: 'auto',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 2,
    marginBottom: 5,
    fontFamily: 'Open-Sans',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default Static;

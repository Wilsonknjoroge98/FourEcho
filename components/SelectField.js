import SelectDropdown from 'react-native-select-dropdown';
const inpectionTypes = [
  'Routine',
  'Follow-up',
  'Compliant',
  'Preoperational',
  'Other',
];

const SelectField = ({ setText }) => {
  return (
    <>
      <SelectDropdown
        data={inpectionTypes}
        onSelect={selectedItem => setText(selectedItem)}
        buttonStyle={{ width: 350 }}
      />
    </>
  );
};

export default SelectField;

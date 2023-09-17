import { NavigationContainer } from '@react-navigation/native';
import InspectionNavigator from '../components/nav/Navigator';
import { AppProvider } from '../components/context/AppContext';
import { useFonts } from 'expo-font';

const Index = () => {
  return (
    <AppProvider>
      <NavigationContainer independent={true}>
        <InspectionNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default Index;

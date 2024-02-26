import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text } from 'react-native';
import Background from '../inspection/background/Background';
import FindDiscrepancies from '../inspection/find discrepancies/FindDiscrepancies';
import SelectDiscrepancies from '../inspection/select discrepancies/SelectDiscrepancies';
import ViewDiscrepancies from '../inspection/view discrepancies/ViewDiscrepancies';
import Temperature from '../inspection/temperature/Temperature';
import Sanitizing from '../inspection/sanitizing/Sanitizing';
import Home from '../home/Home';
import Nav from './Navigation';
import IHH from '../inspection/ihh/IHH';
import FreeText from '../inspection/free text/FreeText';
import Done from '../done/Done';
import Nano from '../inspection/nano/Nano';
import PdfView from '../done/pdf/PdfView';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={Home} options={{ headerShown: false, title: '' }} />
      <Stack.Screen
        name="background"
        component={Background}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 8, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="find discrepancies"
        component={FindDiscrepancies}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="select discrepancies"
        component={SelectDiscrepancies}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="view discrepancies"
        component={ViewDiscrepancies}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="temperature"
        component={Temperature}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="sanitizing"
        component={Sanitizing}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ihh"
        component={IHH}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="review"
        component={PdfView}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="nav"
        component={Nav}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="done"
        component={Done}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="free text"
        component={FreeText}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="nano"
        component={Nano}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#4dd0e1', padding: 10, borderRadius: 5 }}
              onPress={() => navigation.navigate('nav')}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigator;

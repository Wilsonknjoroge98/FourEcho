import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import Background from '../inspection/background/Background';
import FindDiscrepancies from '../inspection/find discrepancies/FindDiscrepancies';
import SelectDiscrepancies from '../inspection/select discrepancies/SelectDiscrepancies';
import ViewDiscrepancies from '../inspection/view discrepancies/ViewDiscrepancies';
import Temperature from '../inspection/temperature/Temperature';
import Sanitizing from '../inspection/sanitizing/Sanitizing';
import Home from '../home/Home';
import Nav from './Navigation';
import IHH from '../inspection/ihh/IHH';
import Done from '../done/Done';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="background"
        component={Background}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="find discrepancies"
        component={FindDiscrepancies}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="select discrepancies"
        component={SelectDiscrepancies}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="view discrepancies"
        component={ViewDiscrepancies}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="temperature"
        component={Temperature}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="sanitizing"
        component={Sanitizing}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ihh"
        component={IHH}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="nav"
        component={Nav}
        options={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="done"
        component={Done}
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: 'Open-Sans',
            backgroundColor: '#ffffff',
          },
          headerRight: () => (
            <Button
              onPress={() => navigation.push('nav')}
              title="☰"
              color="black"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigator;

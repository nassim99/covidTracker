import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';

import { Lang } from 'local/en';
import Text from 'components/basic/text';

import Home from 'screens/home';
import AddCase from 'screens/add-case';
import CountryList from 'screens/country-list';

const Stack = createStackNavigator();
const stackOptions: StackNavigationOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerShown: true,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  cardStyle: {
    backgroundColor: '#ebebeb',
  },
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen
        options={({ navigation }) => ({
          title: Lang.summary,
          headerLeft: () => (
            <Text style={{ marginRight: 15 }} onPress={() => navigation.navigate('AddCase')}>
              {Lang.addCase}
            </Text>
          ),
        })}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={() => ({
          title: Lang.allCountries,
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        })}
        name="CountryList"
        component={CountryList}
      />
      <Stack.Screen
        options={() => ({
          title: Lang.addNewCase,
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        })}
        name="AddCase"
        component={AddCase}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

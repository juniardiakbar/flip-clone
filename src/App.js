import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Splash, TransactionList, DetailTransaction} from './pages';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Transaction List" component={TransactionList} />
        <Stack.Screen name="Detail Transaction" component={DetailTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { BoxSelectionScreen } from '../screens/BoxSelectionScreen';
import { CategoriesScreen } from '../screens/CategoryScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductQuantityScreen } from '../screens/ProductQuantityScreen';
import { SummaryScreen } from '../screens/SummaryScreen';
import { RecordsScreen } from '../screens/RecordsScreen';
import { CustomBoxScreen } from '../screens/CustomBoxScreen';

export type RootStackParamList = {
  Home: undefined;
  BoxSelection: undefined;
  Category: { boxSize: number };
  Product: { boxSize: number; category: string };
  ProductQuantity: { product: any; boxSize: number; category: string };
  Summary: { 
    product: any; 
    quantity: number; 
    boxSize: number; 
    boxesNeeded: number; 
    remainder: number;
    category: string;
  };
  Records: undefined;
  CustomBox: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#1a1a1a' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BoxSelection" component={BoxSelectionScreen} />
        <Stack.Screen name="Category" component={CategoriesScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="ProductQuantity" component={ProductQuantityScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
        <Stack.Screen name="Records" component={RecordsScreen} />
        <Stack.Screen name="CustomBox" component={CustomBoxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


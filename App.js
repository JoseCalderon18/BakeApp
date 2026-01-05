import React from 'react';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { AppNavigator } from './src/navagation/AppNavigator';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );
}

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Hotel from './src/Hotel';

export default class App extends React.Component {
  render() {
    return <Hotel />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

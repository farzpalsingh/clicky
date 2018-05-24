import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootNavigator } from "./Routes";

export default class App extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
      }}>
        <RootNavigator />
      </View>
    );
  }
}

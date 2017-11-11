import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

export default class NewAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Account Name</Text>
        <TextInput placeholder="郵局帳號" />
      </View>
    );
  }
}
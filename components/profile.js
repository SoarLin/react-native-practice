import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {params} = this.props.navigation.state;

    return (
      <View>
        <Text>{params.title}</Text>
      </View>
    );
  }
}
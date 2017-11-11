import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import {
  Button,
  View,
  Text,
  Image
} from 'react-native';

import ProfileScreen    from './components/profile';
import NewAccountScreen from './components/new-account';

import styles from './assets/styles';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: 'myAccount',
    headerRight: (
        <Button
          title="Add"
          onPress={() => navigation.navigate('NewAccount')}
        />
    ),
  });

  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.homeContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require('./assets/images/batman.png')} />
        </View>
        <Text>Home Screen</Text>
        <Button
          onPress={() => navigation.navigate('Profile', {title: 'ProfilePage'})}
          title="Go to details"
        />
      </View>
    );
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  NewAccount: {
    screen: NewAccountScreen,
    navigationOptions: {
      headerTitle: 'New Account',
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

export default RootNavigator;
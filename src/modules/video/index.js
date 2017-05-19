/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import VideoRootViewPage from './VideoRootViewPage'


export default class Video extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }
  static navigationOptions = ({navigation}) => {
      return {
        header: null
      }
  }

  render() {
    const { navigation } = this.props;
    return (
      <VideoRootViewPage style={styles.container} navigation={navigation}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


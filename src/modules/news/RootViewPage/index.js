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

import NormalNewsPage from './Pages/NormalNewsPage'
import VideoNewsPage from './Pages/VideoNewsPage'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import DefaultTabBar from './Pages/DefaultTabBar'


export default class RootViewPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView 
          tabBarInactiveTextColor = '#2c2c2c'
          tabBarActiveTextColor   = '#d81e06'
          tabBarBackgroundColor   = 'white'
          tabBarUnderlineStyle    = {{backgroundColor: 'red',height: 2}}
          ref                     = "scrollableTabView"
          initialPage             = {0}
          tabBarTextStyle         = {{marginTop: 20, fontSize: 15}}
          renderTabBar            = {() => <ScrollableTabBar 
                                              style={{height: 60,borderWidth:1}} 
                                            />
                                    }
        >
            <NormalNewsPage  tabLabel = "推荐" navigation={navigation} />
            <VideoNewsPage   tabLabel = "视频" navigation={navigation} />
            <NormalNewsPage  tabLabel = "热点" navigation={navigation} />
            <NormalNewsPage  tabLabel = "直播" navigation={navigation} />
            <NormalNewsPage  tabLabel = "深圳" navigation={navigation} />
            <NormalNewsPage  tabLabel = "娱乐" navigation={navigation} />
            <NormalNewsPage  tabLabel = "关注" navigation={navigation} />
            <NormalNewsPage  tabLabel = "社会" navigation={navigation} />
            <NormalNewsPage  tabLabel = "汽车" navigation={navigation} />


        </ScrollableTabView>
      </View>
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


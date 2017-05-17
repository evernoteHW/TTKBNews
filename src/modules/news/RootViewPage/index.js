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
  static navigationOptions = ({navigation}) => {
    return {
      headerVisible: true,
      header: (
        <View style={{height: 64, backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row',top: 20,height: 44,alignItems:'center'}}>
            {
              ['新闻','视频','热点'].map((name,index) => {
                return <Text key={index}> {name}</Text>
              })
            }
          </View>
        </View>
      ),
    }
  }
  render() {
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
            <NormalNewsPage tabLabel = "推荐" />
            <VideoNewsPage  tabLabel = "视频" />
            <VideoNewsPage  tabLabel = "热点" />
            <VideoNewsPage  tabLabel = "直播" />
            <VideoNewsPage  tabLabel = "深圳" />
            <VideoNewsPage  tabLabel = "娱乐" />
            <VideoNewsPage  tabLabel = "关注" />
            <VideoNewsPage  tabLabel = "社会" />
            <VideoNewsPage  tabLabel = "汽车" />
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


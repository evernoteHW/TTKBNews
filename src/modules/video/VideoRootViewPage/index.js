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

import VideoNewsPage from '../../news/RootViewPage/Pages/VideoNewsPage'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import DefaultTabBar from '../../news/RootViewPage/Pages/DefaultTabBar'
import Video from 'react-native-video'

export default class VideoRootViewPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      videoItemData: [
                      {key: 10001,title: '搞笑'},
                      {key: 10011,title: '音悦'},
                      {key: 10005,title: '奇趣'},
                      {key: 10006,title: '影视'},
                      {key: 10009,title: '相声小品'},
                      {key: 10007,title: '科技感'},
                      {key: 10012,title: '游戏'},
                      {key: 10004,title: '生活味'},
                      {key: 10013,title: '时尚'},
                      {key: 10002,title: '生活味'},
                      {key: 10008,title: '动漫'},
                      {key: 10010,title: '创意'},
                     ]
    };
  }
  componentDidMount(){
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
        {
            this.state.videoItemData.map((item,index) => {
                return <VideoNewsPage  
                        key        = {index} 
                        id         = {item.key}
                        tabLabel   = {item.title}
                        navigation = {navigation} 
                      />
            })
        }
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
    backgroundColor: 'white',
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


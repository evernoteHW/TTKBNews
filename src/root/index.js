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
  Image,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import Attention   from '../modules/attention'
import Video       from '../modules/video'
import News        from '../modules/news'
import Mine        from '../modules/mine'
import WebViewPage from '../modules/news/RootViewPage/Pages/WebViewPage'
import ChannelManagePage from '../modules/news/RootViewPage/Pages/ChannelManagePage'
import MoreChannelCityPage from '../modules/news/RootViewPage/Pages/MoreChannelCityPage'
import AttentionTagPage from '../modules/attention/AttentionTagPage'


const RouteConfigs = 
{
    News: {
      screen:            News,
      navigationOptions: {
        tabBarLabel: '快报',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_news_selected.png'): require('../images/tab/scr_root_news_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      },
    },
    Video: {
      screen:            Video,
      navigationOptions: {
        tabBarLabel: '视频',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_video_selected.png'): require('../images/tab/scr_root_video_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      }
    },
    Attention: {
      screen:            Attention,
      navigationOptions: {
        tabBarLabel: '关注',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_attention_selected.png'): require('../images/tab/scr_root_attention_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      },
    },
    Mine: {
      screen:            Mine,
      navigationOptions: {
        tabBarLabel: '未登录',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_mine_selected.png'): require('../images/tab/scr_root_mine_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      }
    },
}

const TabNavigatorConfig = {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition:   'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled:     false, // 是否可以左右滑动切换tab
    tabBarOptions:    {
      activeTintColor:   '#d81e06',// 文字和图片选中颜色
      inactiveTintColor: '#2c2c2c', // 文字和图片未选中颜色
      showIcon:          true, // android 默认不显示 icon, 需要设置为 true 才会显示
      showLabel:         true,
      // lazy:              true,
      swipeEnabled:      true,
      indicatorStyle:    {
        height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      tabStyle:{
        backgroundColor: 'orange'
      },
      style: {
         backgroundColor: '#FFFFFF', // TabBar 背景色
      },
      tabStyle:{
        tintColor: 'red'
      },
      labelStyle: {
         // fontSize: 15, // 文字大小
      },
      // pressOpacity: 1,
    },
  
};

const TabBars = TabNavigator(RouteConfigs,TabNavigatorConfig)

const App = StackNavigator({
    TabBars:             { screen: TabBars },
    WebViewPage:         { screen: WebViewPage },
    AttentionTagPage:    { screen: AttentionTagPage },
    ChannelManagePage:   { screen: ChannelManagePage},
    MoreChannelCityPage: { screen: MoreChannelCityPage},
},{
    headerMode:           'screen' ,
    mode:                 'card',

});

export default class TTKBNews extends Component {

  render() {
    return (
      <App screenProps={{ta:''}}/>
    );
  }
}

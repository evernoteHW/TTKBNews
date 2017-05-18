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
  View
} from 'react-native';

export default class Video extends Component {

  componentDidMount(){
    this.loadNetWorkData()
  }
  loadNetWorkData(){
    let url = 'http://r.cnews.qq.com/getSubNewsChlidInterest?qqnetwork=wifi&appver=10.2_qnreading_3.1.0&apptype=ios&screen_height=568&logfrom=0&store=1&apptypeExt=qnreading&appversion=3.1.0&currentTab=video&screen_scale=2&activefrom=icon&screen_width=320&__qnr=1ecdc42cfa22&isJailbreak=0&mac=020000000000&idfv=8C9F4795-0C41-4F11-9F58-420268AD370E&omgid=74a25b21dbeed545cccbd2633fccb5e7d48b0010112412&device_model=iPhone6%2C2&startarticleid=&idft=49F67AD0-AA62-4266-983C-36E706BCADA3&devid=8C9F4795-0C41-4F11-9F58-420268AD370E&omgbizid=86dc4fb6f424aa44c86a75dd98b01fc44da60090112412&idfa=1D4515D2-970C-4E74-AD3A-3E893E97E3C5'
     fetch(url,{
        method: 'POST',
        Cookies: {logintype: 2},
        body:   'cityList=深圳&provinceId=19&lon=0&uid=4A589D05-221D-45FC-AF60-5F2200A010B2&chlid=kb_video_news&cachedCount=47&loc_addr=广东省深圳市南山区科技路1号深南大道&last_id=20170430V0441Z00&lat=0&userCity=深圳&loc_name=南山区桑达科技工业大厦&page=5&forward=0&adcode=440305&kankaninfo={"gender":1,"scene":0,"needCollect":1,"lastExp":4,"latitude":0,"refresh":0,"lonitude":0}&cityId=199'
     })
      .then((response) => response.json())
      .then((responseJson) => {
         //写入数据库
        console.log(`responseJson ===> ${responseJson}`)
      })
      .catch((error) => {
        console.error(error);
    });
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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


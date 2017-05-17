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

import PageViewCell from '../Cells/PageViewCell'
import NewsModel from '../Models/NewsModel'

const newsJson = require('../../../../resource/json/news.json');

export default class NormalNewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
    };
  }
  componentDidMount() {
    // this.loadLocalData()
    this.loadNetWorkData()
  }
  loadLocalData(){
    var localData = []
    for (var i = 0; i <= newsJson.newslist.length - 1; i++) {
      let item = newsJson.newslist[i]
      localData.push(new NewsModel(item))
    }
    this.setState({listData: localData})
  }
  loadNetWorkData(){

    fetch('http://r.cnews.qq.com/getSubNewsInterest')
      .then((response) => response.json())
      .then((responseJson) => {
         //写入数据库
         var localData = []
         for (var i = 0; i <= responseJson.newslist.length - 1; i++) {
            let item = responseJson.newslist[i]
            localData.push(new NewsModel(item))
          }
          this.setState({listData: localData,refreshing: false})
      })
      .catch((error) => {
        console.error(error);
    });
    
  }
  _renderItem = ({item, index})=>{
      return <PageViewCell key={index} item={item}/>
  }
  _itemSeparatorComponent(){
    return <View style={styles.seperator} />
  }
  _onRefresh = ()=>{
    this.setState({refreshing: true})
    this.loadNetWorkData()
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
            style                  = {{backgroundColor : 'white', width: '100%'}}
            data                   = {this.state.listData}
            renderItem             = {this._renderItem}
            ItemSeparatorComponent = {this._itemSeparatorComponent}
            refreshing             = {this.state.refreshing}
            onRefresh              = {this._onRefresh}
          />
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
  seperator: {
    height: 0.5,
    backgroundColor: 'rgb(240,240,240)',
    marginLeft: 10,
    marginRight: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


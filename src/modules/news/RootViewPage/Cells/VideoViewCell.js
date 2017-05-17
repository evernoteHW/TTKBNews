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
  Image,
  Dimensions,
} from 'react-native';

import NewsModel from '../Models/NewsModel'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class VideoViewCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    const { item } = this.props
    return (
      <View style = {styles.container}>
          <Image
            source = {{url:item.thumbnails[0]}}
            style  = {styles.image}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Image 
              source = {require('../../../../images/video/scr_video_play.png')}
              style  = {styles.playImage}
            />
          </Image>
          <View style = {styles.bottom}>
              <Image
                source = {{url:item.chlsicon}}
                style  = {styles.headerIcon} 
              />
              <Text style = {styles.bottom_text1}>{item.source}</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content:{
    // marginLeft: 10, 
    // marginRight: 10,
    // marginTop: 10,
    // marginBottom: 5,
    // backgroundColor: 'yellow',
  },
  content_0:{
    flexDirection: 'row'
  },
  title:{
    fontWeight:       'bold',
    lineHeight:       20,
    textShadowColor:  'gray',
    textShadowOffset: {width:0.5,height: 0.5},
    marginTop:        10,
    marginLeft:       10, 
    marginRight:      10,
    color:            'white',
    fontSize:         18,
    backgroundColor:  'transparent',
  },
  image: {
     width: '100%', 
     height: (312.0/660.0) * screenWidth ,
     backgroundColor: 'gray',
     marginBottom: 5,
  },
  playImage:{
    // postion: 'absolute',
    alignSelf: 'center',
    width:  42,
    height: 42,
  },
  headerIcon:{
    marginLeft:   15,
    marginRight:  5,
    width:        25,
    height:       25,
    borderRadius: 12.5,
  },
  image_content:{
    flexDirection: 'row'
  },
  samllerImage:{
     width: (screenWidth - 20)/3.0, 
     height: (130/196.0) * (screenWidth - 20)/3.0 ,
     // backgroundColor: 'red',
     marginBottom: 5,
     marginRight: 2,
  },
  bottom: {
   flexDirection: 'row',
   alignItems: 'center',
   marginBottom: 10,
  },
  bottom_text1:{
    fontSize: 12,
    color: '#2c2c2c',
  },
});


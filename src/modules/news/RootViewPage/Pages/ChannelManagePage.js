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
  SectionList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import PageViewCell from '../Cells/PageViewCell'
import NewsModel from '../Models/NewsModel'
import WebViewPage from './WebViewPage'

const screenWidth = Dimensions.get('window').width;
var itemHeight = (screenWidth - 4*10)/4.0;
export default class ChannelManagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myChannelData:[
                      {key:'推荐'},
                      {key:'王者荣耀'},
                      {key:'视频'},
                      {key:'热点'},
                      {key:'直播'},
                      {key:'深圳'},
                      {key:'娱乐'},
                      {key:'关注'},
                      {key:'社会'},
                      {key:'搞笑'},
                      {key:'汽车'},
                      {key:'美食'},
                      {key:'美女'},
                      {key:'大学生'},
                      {key:'国际'},
                    ],
    };

  }
   static navigationOptions = ({navigation}) => {
      return {
        header: (
          <View style = {styles.navigateBar}>
            <View style = {styles.titleView}>
             <Text style = {styles.headerText}>频道管理</Text>
            </View>
            <TouchableOpacity style = {styles.navigateBar_left} onPress = {() => navigation.goBack()} >
              <Image  
                source = {require('../../../../images/attention/attention_back_image.png')} 
                style  = {styles.navigateBar_right_image} 
              />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.navigateBar_right} onPress = {() => navigation.goBack()} >
              <Image  
                source = {require('../../../../images/attention/attention_tag_search.png')} 
                style  = {[styles.navigateBar_right_image,{}]} />
            </TouchableOpacity>
          </View>
        ),
    }
  }
  componentDidMount() {

  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style      = {styles.flatList}
          data       = {this.state.myChannelData}
          numColumns = {4}
          renderItem = {({item}) => 
                              <TouchableOpacity style = {styles.flatList_item}>
                                 <Text style = {styles.flatList_item_text}>{item.key}
                                 </Text>
                               </TouchableOpacity>
                          }
          
          getItemLayout = {(data,index) => (
             {length: itemHeight, offset: (itemHeight + 5) * index, index}
          )}
        />
         <FlatList
          style      = {styles.flatList}
          data       = {this.state.myChannelData}
          numColumns = {4}
          renderItem = {({item}) => 
                              <TouchableOpacity style = {styles.flatList_item}>
                                 <Text style = {styles.flatList_item_text}>{item.key}
                                 </Text>
                               </TouchableOpacity>
                          }
          
          getItemLayout = {(data,index) => (
             {length: itemHeight, offset: (itemHeight + 5) * index, index}
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  container_top:{
    marginLeft:     20,
    marginRight:    20,
    marginBottom:   20,
    flexDirection:  'row',
    justifyContent: 'space-between'
  },
  navigateBar_left:{
    justifyContent: 'center',
    // alignItems:     'center',
    position:       'absolute',
    top:            27,
    left:           7,
    width:          60,
    height:         30,
  },
  navigateBar_right:{
    justifyContent: 'center',
    alignItems:     'center',
    position:       'absolute',
    top:            20,
    right:           7,
    width:          44,
    height:         40,
  },
  navigateBar_right_image:{
    width:  20,
    height: 20,
  },

  header_right_image:{
    width : 15,
    height: 15,
  },
  flatList:{
    // height: 300,
    backgroundColor: 'orange',
  },
  flatList_item:{
    flexDirection:   'row',
    marginLeft:      5,
    marginRight:     5,
    marginTop:       5,
    marginBottom:    5,
    justifyContent:  'center',
    alignItems:      'center',
    height:          40,
    width:           itemHeight,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(244,245,247)',
    borderRadius:    3,
  },
  flatList_item_text:{
    color:     '#333333',
    fontSize:  14,
    textAlign: 'center',
  },
  separator:{
    marginLeft:      10,
    marginRight:     10,
    height:          0.5,
    backgroundColor: 'rgb(244,245,247)',
  },
  navigateBar:{
    height:          64, 
    backgroundColor: 'white'
  },
  headerText:{
    fontSize: 16,
    color:    '#333333',
  },
  top_right_text:{
    marginLeft: 2,
    fontSize: 12,
    color:    '#f07507',
  },
  titleView:{
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'center',
    position:        'absolute',
    borderRadius:    3,
    left:            40,
    right:           40,
    top:             30,
    height:          25,
    // backgroundColor: 'rgb(244,245,247)'
  },
  title: {
    fontSize: 14,
    color:    '#333333',
  },
  attentionBtn:{
    marginRight:     10,
    justifyContent:  'center',
    alignItems:      'center',
    borderRadius:    3,
    borderWidth:     0.5,
    borderColor:     '#e0620d',
  },
  attentionBtn_text:{
    marginLeft:      15,
    marginRight:     15,
    marginBottom:    2.5,
    marginTop:    2.5,
    color:    '#e0620d',
    fontSize: 13,
  },
  bottom:{
    textAlign: 'center',
    marginLeft:      20,
    marginRight:     20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_left_text: {
    fontSize: 12,
    color: '#2c2c2c',
  },
  bottom_right_text: {
    fontSize:   12,
    color:      '#1296db',
  },

});


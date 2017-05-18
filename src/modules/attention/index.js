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
  TouchableOpacity,
  Image,
} from 'react-native';


var ScrollableTabView = require('react-native-scrollable-tab-view');


export default class Attention extends Component {
    
    constructor(props) {
      super(props);
      
      this.state = { listData:[] ,totalData: [], cureentIndex: 0};
    }
    static navigationOptions = ({navigation}) => {
      return {
        header: (
          <View style = {styles.navigateBar}>
            <View style = {styles.titleView}>
             <Text style = {styles.headerText}>我的关注</Text>
            </View>
          </View>
        ),
    }
  }
  componentDidMount(){
    this.loadNetWorkData()
  }
  loadNetWorkData(){
  
    fetch('http://r.cnews.qq.com/getMySubNewsDefault?appver=10.2_qnreading_3.1.0')
      .then((response) => response.json())
      .then((responseJson) => {
         //写入数据库
         var localData = []
         for (var i = 0; i <= responseJson.default.taginfo.length - 1; i++) {
            let item = responseJson.default.taginfo[i]
            localData.push({key: i,title: item.tagname,subCount:item.subCount})
          }
          var listData = []
          if (localData.length >=4 ) {
            listData = localData.splice(0,4)
          }
          this.setState({listData: listData, totalData: localData, cureentIndex: 4})
      })
      .catch((error) => {
        console.error(error);
    });
  }
 
  _exchange = () => {
    var localData = []
    var count = 0
    var cureentIndex = this.state.cureentIndex
    while(true){
      
      if (cureentIndex < this.state.totalData.length) {
        cureentIndex ++ 
      }else{
        cureentIndex = 1  
      }
      let item = this.state.totalData[cureentIndex - 1];
      localData.push({key: count, title: item.title,subCount:item.subCount})  

      count++
       if (localData.length == 4) {
        this.setState({listData: localData, cureentIndex: cureentIndex})
        break;
       }
      // }
    }
    
  }
  _renderItem = ({item,index}) =>{
    return(<View style = {styles.flatList_item} key = {index}>
              <View style = {styles.item_left}>
                   <TouchableOpacity>
                    <Image 
                      source = {require('../../images/attention/attention_tag_selected.png')}
                      style  = {styles.selectedImage}
                    />
                  </TouchableOpacity>
                  <Text style = {styles.item_left_text}>#{item.title}#</Text> 
              </View>
              <Text style = {styles.item_right_text}>{item.subCount}关注</Text> 
            </View>
    )
  }
  render() {
    return (
      <View style = {styles.container}>
          <View style = {styles.container_top}>
            <Text style = {styles.title}>推荐话题：</Text>
            <TouchableOpacity 
              style = {styles.header_right}
              onPress = {this._exchange}
            >
               <Image 
                      source = {require('../../images/attention/attention_head_right_reload.png')}
                      style  = {styles.header_right_image}
              />
              <Text style = {styles.top_right_text}>换一换</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.flatListBg}>
             <FlatList
              style                  = {styles.flatList}
              data                   = {this.state.listData}
              renderItem             = {this._renderItem}
              scrollEnabled          = {false}
              removeClippedSubviews  = {false}
              ItemSeparatorComponent = {() => 
                <View style = {styles.separator}></View>
              }
            />
          </View>
          <TouchableOpacity
            style = {styles.attentionBtn}
          >
            <Text style = {styles.attentionBtn_text}>关注</Text>
          </TouchableOpacity>
          <Text style = {styles.bottom}>
            <Text style = {styles.bottom_left_text}>已有关注</Text>
            <Text style = {styles.bottom_right_text}>  请登录</Text>
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    // flexDirection:   'row',
    // justifyContent:  'center',
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
  flatListBg:{
    marginLeft:  20,
    marginRight: 20,
    height:      220,
  },
  header_right:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_right_image:{
    width : 15,
    height: 15,
  },
  selectedImage:{
    width:  21,
    height: 21
  },
  flatList:{
    // backgroundColor: 'orange',
    marginBottom : 20,
  },
  flatList_item:{
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
    height:         50,
    justifyContent: 'space-between'
  },
  item_left:{
    flexDirection: 'row',
  },
  item_left_text:{
    marginLeft: 10,
    color:      '#2c2c2c',
    fontSize:   14,
  },
  item_right_text:{
    marginTop: 5,
    color:      '#8a8a8a',
    fontSize:   12,
  },
  separator:{
    height: 0.5,
    backgroundColor: '#dbdbdb',
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
    alignItems:      'center',
    justifyContent:  'center',
    position:        'absolute',
    left:            60,
    right:           60,
    top:             20,
    height:          44,
    // backgroundColor: 'orange'
  },
  title: {
    fontSize: 14,
    color:    '#333333',
  },
  attentionBtn:{
    justifyContent:  'center',
    alignItems:      'center',
    marginLeft:      20,
    marginRight:     20,
    marginBottom:    20,
    height:          40,
    backgroundColor: '#e0620d',
    borderRadius:    3,
  },
  attentionBtn_text:{
    color:    'white',
    fontSize: 15,
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


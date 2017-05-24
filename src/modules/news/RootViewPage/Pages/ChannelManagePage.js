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
  ScrollView,
  SegmentedControlIOS,
} from 'react-native';

import PageViewCell from '../Cells/PageViewCell'
import NewsModel from '../Models/NewsModel'
import WebViewPage from './WebViewPage'
import PanGestureView from './PanGestureView'

const screenWidth = Dimensions.get('window').width;
var itemHeight = (screenWidth - 5*10)/4.0;
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
      hotChannelData:[
                      {key:'NBA'},
                      {key:'体育'},
                      {key:'军事'},
                      {key:'财经'},
                      {key:'科技'},
                      {key:'快手'},
                      {key:'GIF'},
                      {key:'图片'},
                      {key:'情感'},
                      {key:'时尚'},
                      {key:'房产'},
                      {key:'历史'},
                      {key:'萌宠'},
                      {key:'养生'},
                      {key:'星族'},
                      {key:'电影'},
                      {key:'育儿'},
                      {key:'数码控'},
                      {key:'政务'},
                      {key:'男人装'},
                    ],
       cityChannelData: [
                      {key:'北京'},
                      {key:'上海'},
                      {key:'重庆'},
                      {key:'西安'},
                      {key:'广州'},
                      {key:'成都'},
                      {key:'郑州'},
                      {key:'武汉'},
                      {key:'石家庄'},
                      {key:'杭州'},
                      {key:'苏州'},
                      {key:'南京'},
                      {key:'昆明'},
                      {key:'济南'},
                    ],
        selectedTapIndex: 0,                 
        scroll:           true,   
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
  onPanResponderRelease = (movePanGesture,index,moveBehindPoint,callback) => {
      //Frame 是
      // console.log(`x = ${moveBehindPoint.x} y = ${moveBehindPoint.y}`)
     
      var replacePanGesture = undefined
      for (var i = 0; i < this.state.hotChannelData.length; i++) {
          let pointee = this.refs[`PanGestureView_${i}`]
          let frame = pointee.getFrame()
          if (pointee != movePanGesture) {
            if(this.pointInRect(moveBehindPoint,frame)){
              replacePanGesture = pointee
            }
          }
      }
      if (typeof replacePanGesture != 'undefined') {
        let frame_0 = movePanGesture.getFrame()
        let frame_1 = replacePanGesture.getFrame()

        // console.log(`frame_0 ${frame_0.x}`);
        // console.log(`frame_1 ${frame_1.x}`);

        let move_length_x = frame_1.x - frame_0.x
        let move_length_y = frame_1.y - frame_0.y

        console.log(`move_length_x = ${move_length_x} move_length_y = ${move_length_y}`);

        movePanGesture.startAnimation2(move_length_x,move_length_y,() => {
            movePanGesture.setFrameAndIndex(frame_1,replacePanGesture.state.index);
            this.refs.scrollViewSuper.setNativeProps({ scrollEnabled: true })
        },moveBehindPoint.x,moveBehindPoint.y)
        replacePanGesture.startAnimation(-move_length_x,-move_length_y,() => {
            replacePanGesture.setFrameAndIndex(frame_0,movePanGesture.state.index);
            this.refs.scrollViewSuper.setNativeProps({ scrollEnabled: true })
        })
      
        // let frame_0_ = this.refs[`PanGestureView_${index}`].getFrame()
        // let frame_1_ = this.refs[`PanGestureView_${replaceIndex}`].getFrame()

        // console.log(`222 ==== ${frame_0_.x} ${frame_0_.y}`);
        // console.log(`222 ==== ${frame_1_.x} ${frame_1_.y}`);
      }else{
        // console.log(`... x = ${movePanGesture.state.frame.x} y = ${movePanGesture.state.frame.y}`);
        movePanGesture.startAnimation2(0,0,() => {
          this.refs.scrollViewSuper.setNativeProps({ scrollEnabled: false })
        })
      }
  }

  pointInRect(point,frame){
    
    // console.log(`${frame.x} < x < ${frame.x + frame.width}  ${frame.y} < y < ${frame.y + frame.height}`);

    if (point.x >= frame.x && 
        point.x <= frame.x + frame.width &&
        point.y >= frame.y && 
        point.y <= frame.y + frame.height) {
      return true
    }
    return false
  }
  render() {
    console.log(33333333);
    const { navigate } = this.props.navigation
    let itemData       = this.state.selectedTapIndex == 0 ? this.state.hotChannelData : this.state.cityChannelData
    let bottomBtnText  = this.state.selectedTapIndex == 0 ? '更多频道' : '全部城市'
    return (
      <View style={styles.container}>
        <ScrollView  ref = 'scrollViewSuper' style = {styles.scrollView} scrollEnabled = {this.state.scroll}>
          <View 
            ref   = {(component) => this.scrollViewContainer = component}
            style = {styles.contentContainer} >
            <Text style = {styles.myChannelTip}>我的频道(拖动调整顺序)</Text>
            {
              //我自己的频道
              this.state.myChannelData.map((item,index) => {
                return <TouchableOpacity 
                         style = {styles.flatList_item}
                         key   = {index}
                        >
                         <Text style = {styles.flatList_item_text}>{item.key}
                          </Text>
                       </TouchableOpacity>
              })
            }
            <Text style = {styles.myChannelTip}>热门频道(点击添加更多)</Text>
            <View style = {styles.segmentedControlIOSBG}>
                <SegmentedControlIOS 
                  style         = {styles.segmentedControlIOS}
                  tintColor     = '#d81e06'
                  selectedIndex = {0}
                  values        = {['频道', '城市']}
                  // onValueChange = {(index) => console.log(`index = ${index}`)}
                  onChange      = {(e)     => this.setState({selectedTapIndex: e.nativeEvent.selectedSegmentIndex})}
                />
            </View>
            <View ref = {(component) => this.downScrollViewContainer = component} style = {styles.downContentContainer}>
            {
              //我自己的频道
              itemData.map((item,index) => {
                return  <PanGestureView
                          index                 = {index}
                          ref                   = {`PanGestureView_${index}`}
                          key                   = {index}
                          onPanResponderGrant   = {() => {
                              this.refs.scrollViewSuper.setNativeProps({
                                scrollEnabled: false  
                              })
                          }}
                          onPanResponderRelease = {this.onPanResponderRelease}
                        >
                            <TouchableOpacity 
                             style = {styles.flatList_item}
                            >
                             <Text 
                              style = {styles.flatList_item_text}>{item.key}
                             </Text>
                            </TouchableOpacity>
                        </PanGestureView>
              })
            }
            </View>
          </View>
          <TouchableOpacity style = {styles.allCity} onPress = {() => navigate('MoreChannelCityPage')}>
            <Text style = {styles.allCity_text}>{bottomBtnText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:       'flex-start',
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
  allCity:{
    marginLeft:      5,
    marginRight:     5,
    marginTop:       15,
    marginBottom:    15,
    height:          40,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(244,245,247)',
    borderRadius:    3,
  },
  allCity_text:{
    color:     '#d81e06',
    fontSize:  16,
    textAlign: 'center',
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
  myChannelTip:{
    color:        '#707070',
    marginTop:    10,
    marginBottom: 10,
    marginLeft:   10,
    width:        '100%',
  },
  segmentedControlIOSBG:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  segmentedControlIOS:{
     width: 240,
  },
  scrollView:{
    backgroundColor:  'white',
  },
  downContentContainer:{
    flexDirection:   'row',
    flexWrap:        'wrap',
  },
  contentContainer:{
    marginLeft:      5,
    marginRight:     5,
    // backgroundColor: 'yellow',
    flexDirection:   'row',
    flexWrap:        'wrap',
  },
  flatList_item:{
    marginLeft:      5,
    marginRight:     5,
    marginTop:       5,
    marginBottom:    5,
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
  //Header
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
  navigateBar_right_image:{
    width:  20,
    height: 20,
  },
});


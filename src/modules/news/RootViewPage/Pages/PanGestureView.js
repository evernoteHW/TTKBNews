// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';

var SQUARE_DIMENSIONS = 100;


function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
const commonConfig = {
  duration: 3000,
  // Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
  easing:   Easing.inOut(Easing.quad)
}
export default class PanGestureView extends Component {
  
  constructor(props) {
    super(props);
    props.test = this.test
    this.state = {
    	 pan:    new Animated.ValueXY(),
       // top:      new Animated.Value(0),
       // left:     new Animated.Value(0),
       zIndex:      0,
       frame:       {},
       index:       props.index,
       needUpdate:  true,
       old_move_dx: 0,
       old_move_dy: 0,
    };
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextState.needUpdate
  }
  //平移多少........
  startAnimation(move_dx,move_dy,doneCallBack){
      //移动距离
     
      //设定初始值
      // this.state.pan.setValue({x:  this.state.old_move_dx, y: this.state.old_move_dy}); //Initial value

      let toValue_x = move_dx + this.state.old_move_dx
      let toValue_y = move_dy + this.state.old_move_dy
      // console.log(`toValue_x = ${toValue_x} toValue_y = ${toValue_x}`);
      // console.log(`xxxxx = ${this.state.pan.x._value} yyyyy = ${this.state.pan.y._value}`);

      Animated.parallel([
        Animated.timing(this.state.pan.x, {
          toValue: toValue_x,
          ...commonConfig
        }),
        Animated.timing(this.state.pan.y, {
          toValue: toValue_y,
          ...commonConfig
        }),
      ])
      .start(() => {
        // this.state.pan.setValue({x:  toValue_x, y: toValue_y}); //Initial value
        this.setState({zIndex: 0,old_move_dx: toValue_x , old_move_dy: toValue_y, needUpdate: true})
        doneCallBack()
      });
    
      this.state.pan.flattenOffset();
  }
  startAnimation2(move_dx,move_dy,doneCallBack,a,b){
      //移动距离
     // console.log(a,b);
      //设定初始值
      // console.log(this._animatedValueX - this.state.frame.x,this._animatedValueY - this.state.frame.y);
      // this.state.pan.setValue({x: this._animatedValueX - this.state.frame.x, y: this._animatedValueY - this.state.frame.y}); //Initial value
      // this.state.pan.setOffset({x: 100, y: 100});
      // this.state.pan.setValue({x: 91.5, y: this._animatedValueY});
      // this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
      // this.state.pan.setValue({x: this._animatedValueX, y: this._animatedValueY}); //Initial value
      // this.state.pan.setValue({x:this._animatedValueX - this.state.frame.width, y: this._animatedValueY - this.state.frame.height}); //Initial value
      // this.state.pan.setValue({x:this._animatedValueX - 45.5, y: this._animatedValueY}); //Initial value
      let toValue_x = move_dx + this.state.old_move_dx
      let toValue_y = move_dy + this.state.old_move_dy

      //不应该。。。卧槽
      console.log(`this._animatedValueX = ${this._animatedValueX} this._animatedValueY = ${this._animatedValueY}`);
      console.log(`xxxxx = ${this.state.pan.x._value} yyyyy = ${this.state.pan.y._value}`);
      console.log(`toValue_x = ${toValue_x} toValue_y = ${toValue_x}`);
      

      Animated.parallel([
        Animated.timing(this.state.pan.x, {
          toValue: toValue_x,
          ...commonConfig
        }),
        Animated.timing(this.state.pan.y, {
          toValue: toValue_y,
          ...commonConfig
        }),
      ])
      .start(() => {
        // this.state.pan.setValue({x:  toValue_x, y: toValue_y}); //Initial value
        this.setState({zIndex: 0,old_move_dx: toValue_x , old_move_dy: toValue_y, needUpdate: true})
        doneCallBack()
      });
    
      this.state.pan.flattenOffset();
  }
  resetAnimation(){
    Animated.timing(this.state.pan, {
      toValue: 0
    }).start(() => {this.setState({zIndex: 0})})
  }
  componentWillMount() {
      this._animatedValueX = 0;
      this._animatedValueY = 0; 
      this.state.pan.x.addListener((callback) => {
        // console.log(`x ...= ${callback.value}`);
        this._animatedValueX = callback.value
      });
      this.state.pan.y.addListener((callback) => {
        // console.log(`y .... = ${callback.value}`);
        this._animatedValueY = callback.value
      });
	    this._panResponder = PanResponder.create({
	      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
	      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
	      onPanResponderGrant: (e, gestureState) => {
          if (this.props.onPanResponderGrant) {
              this.props.onPanResponderGrant()
          }
          this.setState({zIndex: 10, needUpdate: true})
	        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
	        this.state.pan.setValue({x:  0, y: 0}); //Initial value
          // console.log(`this._animatedValueX = ${this._animatedValueX} this._animatedValueY = ${this._animatedValueY}`);
	      },
	      onPanResponderMove: Animated.event([
	        null, {dx: this.state.pan.x, dy: this.state.pan.y}
	      ]), // Creates a function to handle the movement and set offsets
	      onPanResponderRelease: (e, gestureState) => {

          let x =  this.state.frame.x + this.state.frame.width/2.0 + gestureState.dx
          let y =  this.state.frame.y + this.state.frame.height/2.0 + gestureState.dy
          if (this.props.onPanResponderRelease) {
              this.props.onPanResponderRelease(this,this.state.index,{x,y})
          }
          // this.state.pan.setValue({x:  0, y: 0}); //Initial value
          //当前位置 移动
          // console.log(x,y);
          // //测试代码
          //  Animated.parallel([
          //     Animated.timing(this.state.pan.x, {
          //       toValue: 100,
          //       ...commonConfig
          //     }),
          //     // Animated.timing(this.state.pan.y, {
          //     //   toValue: 100,
          //     //   ...commonConfig
          //     // }),
          //   ])
          // .start(() => {});
          // this.state.pan.flattenOffset();
	      },
	  });
  }
  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  }
  getFrame(){
    return this.state.frame;
  }
  getIndex(){
    return this.state.index;
  }
  test(){

  }
  setFrameAndIndex(frame,index){

    // console.log(this.panGesture);
    // console.log(`替换之前x = ${frame.x} y = ${frame.y} index = ${index}`);
    this.panGesture.setNativeProps({

    })
    this.setState({frame: frame, needUpdate: false});
    // console.log(`替换之后x = ${this.state.frame.x} y = ${this.state.frame.y} index = ${this.state.index}`);
  }
  render() {

    return (
        <Animated.View 
          ref      = {(component) => this.panGesture = component}
          onLayout = {(e)    => {
            const {x ,y , width ,height } = e.nativeEvent.layout
              console.log('......');
              this.setState({frame: {x: x,y :y,width: width,height: height}});
            }
          }
        	style = {[
              this.props.style,
              {
                transform: [
                  {
                    translateX: this.state.pan.x
                  },
                  {
                    translateY: this.state.pan.y
                  },
                ]
              },
              {
                zIndex:  this.state.zIndex
              },
              {
                // top:  this.state.top,
                // left: this.state.left,
              }
            ]
        	}
        	{...this._panResponder.panHandlers}
        >
        {this.props.children}
        </Animated.View>
    );
  }
}
PanGestureView.defaultProps = {
  frame:    new Rect(0, 0, 0, 0),
  orign_x:  0,
  orign_y:  0,
  orign:    new Point(0,0),
  getFrame: () => {},
  test : ()    => {},
}
PanGestureView.propTypes = {
  getFrame: React.PropTypes.func,
  orign_x: React.PropTypes.number
}
const styles = StyleSheet.create({


});

AppRegistry.registerComponent('TTKBNews', () => TTKBNews);

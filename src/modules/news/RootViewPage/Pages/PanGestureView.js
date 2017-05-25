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
  duration: 300,
  // Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
  easing:   Easing.out(Easing.quad)
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

      let toValue_x = move_dx + this.state.old_move_dx
      let toValue_y = move_dy + this.state.old_move_dy

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
    
  }

  componentWillMount() {
      this._animatedValueX = 0;
      this._animatedValueY = 0; 
      this.state.pan.x.addListener((callback) => { this._animatedValueX = callback.value });
      this.state.pan.y.addListener((callback) => { this._animatedValueY = callback.value });
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
	      },
	      onPanResponderMove: Animated.event([
	        null, {dx: this.state.pan.x, dy: this.state.pan.y}
	      ]), 
	      onPanResponderRelease: (e, gestureState) => {
          this.state.pan.flattenOffset();
          let x =  this.state.frame.x + this.state.frame.width/2.0 + gestureState.dx
          let y =  this.state.frame.y + this.state.frame.height/2.0 + gestureState.dy
          if (this.props.onPanResponderRelease) {
              this.props.onPanResponderRelease(this,this.state.index,{x,y})
          }
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

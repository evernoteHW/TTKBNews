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

export default class PanGestureView extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    	 pan:    new Animated.ValueXY(),
       top:    new Animated.Value(0),
       left:    new Animated.Value(0),
       zIndex: 0,
       frame:  {},
    };
  }
  shouldComponentUpdate(nextProps,nextState){
    // console.log(`nextProps = ${nextProps}`);
    // console.log(`nextState = ${nextState}`);
    return true
  }
  startAnimation(x_toValue,y_toValue,doneCallBack){
      Animated.parallel([
        Animated.spring(this.state.pan.x, {
          toValue: x_toValue
        }),
        Animated.spring(this.state.pan.y, {
          toValue: y_toValue
        }),
      ])
      .start(() => {
        this.setState({zIndex: 0})
        doneCallBack()
      });
    
      this.state.pan.flattenOffset();
  }
  resetAnimation(){
    Animated.spring(this.state.pan, {
      toValue: 0
    }).start(() => {this.setState({zIndex: 0})})
  }
  componentWillMount() {
      this._animatedValueX = 0;
      this._animatedValueY = 0; 
      this.state.pan.x.addListener((callback) => {
        // console.log(`x = ${callback.value}`);
        this._animatedValueX = callback.value
      });
      this.state.pan.y.addListener((callback) => {
        // console.log(`x = ${callback.value}`);
        this._animatedValueY = callback.value
      });
	    this._panResponder = PanResponder.create({
	      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
	      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
	      onPanResponderGrant: (e, gestureState) => {
          if (this.props.onPanResponderGrant) {
              this.props.onPanResponderGrant()
          }
          this.setState({zIndex: 10})
	        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
	        this.state.pan.setValue({x:  0, y: 0}); //Initial value
	      },
	      onPanResponderMove: Animated.event([
	        null, {dx: this.state.pan.x, dy: this.state.pan.y}
	      ]), // Creates a function to handle the movement and set offsets
	      onPanResponderRelease: (e, gestureState) => {
          let x =  this.state.frame.x + this.state.frame.width/2.0 + this._animatedValueX
          let y =  this.state.frame.y + this.state.frame.height/2.0 + this._animatedValueY
          if (this.props.onPanResponderRelease) {
              this.props.onPanResponderRelease(this.props.index,{x,y})
          }
          this.state.pan.flattenOffset();
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
  render() {
    return (
        <Animated.View 
          ref      = {(component) => this.panGesture = component}
          onLayout = {(e)    => {
            const {x ,y , width ,height } = e.nativeEvent.layout
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
                top:  this.state.top,
                left: this.state.left,
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
}
PanGestureView.propTypes = {
  getFrame: React.PropTypes.func,
  orign_x: React.PropTypes.number
}
const styles = StyleSheet.create({


});

AppRegistry.registerComponent('TTKBNews', () => TTKBNews);

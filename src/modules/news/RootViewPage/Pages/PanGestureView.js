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

export default class PanGestureView extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
    	 pan: new Animated.ValueXY(),
       zIndex: 0,
    };
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
          this.setState({zIndex: 1})
	        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
	        this.state.pan.setValue({x:  0, y: 0}); //Initial value
	      },
	      onPanResponderMove: Animated.event([
	        null, {dx: this.state.pan.x, dy: this.state.pan.y}
	      ]), // Creates a function to handle the movement and set offsets
	      onPanResponderRelease: (e, gestureState) => {
          if (this.props.onPanResponderRelease) {
              this.props.onPanResponderRelease()
          }
          this.setState({zIndex: 0})
          //回到自己位置
          Animated.spring(this.state.pan, {
            toValue: 0
          }).start();
          this.state.pan.flattenOffset();
	      },
	  });
  }
   flattenOffset = () =>{
   	console.log(88888);
   	 Animated.spring(this.state.pan, {
      toValue: 0
    }).start();
   	// console.log(this._value);
   	// console.log(this._offset);
    // this._value += this._offset;
    // this._offset = 0;
  }
  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  }
  render() {
    return (
        <Animated.View 
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

const styles = StyleSheet.create({


});

AppRegistry.registerComponent('TTKBNews', () => TTKBNews);

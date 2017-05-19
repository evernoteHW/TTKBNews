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
  WebView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
    };
  }
  _cancel = () => {
    if(this.props.cancel){
      this.props.cancel()
    }
  }
  _login = () => {
    if (this.props.login) {
      this.props.login()
    }
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.header}>
          <TouchableOpacity  style = {styles.leftCancelBg} onPress = {this._cancel}>
            <Text style = {styles.cancel}>  取消</Text>
          </TouchableOpacity>
          <View style = {styles.headTitle}>
            <Text style = {styles.title}>登录</Text>
          </View>
        </View>
        <View style = {styles.inputBg}>
          <TextInput 
            style = {styles.input} 
            placeholder = {'请输入手机号'}
          />
          <View style = {styles.separator}/>
          <TextInput 
            style = {styles.input} 
            placeholder = {'请输入验证码'}
          />
        </View>
        <TouchableOpacity 
          style = {styles.loginBtn} 
          onPress = {this._login}
        >
            <Text style = {styles.loginText}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242,242,242)'
  },
  leftCancelBg:{
    justifyContent:  'center',
    // alignItems:      'center',
    position:        'absolute',
    width:           60,
    height:          30,
    left:            7,
    top:             27,
    // backgroundColor: 'orange',
  },
  cancel:{
    // textAlign:       'center',
    color:           '#1296db',
    backgroundColor: 'transparent',
  },
  title:{
    color:           '#333333',
    fontSize:        16,
    backgroundColor: 'transparent',
  },
  headTitle:{
    alignItems:      'center',
    justifyContent:  'center',
    position:        'absolute',
    left:            60,
    right:           60,
    top:             20,
    height:          44,
    // backgroundColor: 'orange'
  },
  header:{
    backgroundColor: 'white'
  },
  separator:{
    height: 0.5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'rgb(242,242,242)',
  },
  input:{
    marginLeft: 10,
    height:     40,
    color:      '#333333',
    fontSize:   14,
  },
  inputBg:{
    backgroundColor: 'white',
    top:          84,
    borderRadius: 3,
    // borderWidth: 1,
    marginLeft:   10,
    marginRight:  10,
  },
  loginText:{
    color : 'white',
  },
  loginBtn:{
    top:             100,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'gray',
    borderRadius:    3,
    height:          40,
    marginLeft:      10,
    marginRight:     10,
  },
});


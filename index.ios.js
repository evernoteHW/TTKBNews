import { AppRegistry } from 'react-native'
import TTKBNews from './src/root'
// import TTKBNews from './src/root/testGesture'
console.ignoredYellowBox = ['Warning: BackAndroid']
let SPY_MODE = true
AppRegistry.registerComponent('TTKBNews', () => TTKBNews);
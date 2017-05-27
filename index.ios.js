import { AppRegistry } from 'react-native'
import TTKBNews from './src/root'
// import TTKBNews from './src/root/testGesture'
// import TTKBNews from './src/root/realmDemo'
console.ignoredYellowBox = ['Warning: BackAndroid']
let SPY_MODE = true
AppRegistry.registerComponent('TTKBNews', () => TTKBNews);
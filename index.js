/**
 * @format
 */
 import React from 'react'
 import { AppRegistry, Platform } from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';
 import * as RootNavigation from './src/navigation/RootNavigation'
 
 // redux
 import { createStore, applyMiddleware } from 'redux'
 import { Provider } from 'react-redux'
 
 import rootReducer from './src/redux/store'
 
 // redux saga
 import createSagaMiddleware from 'redux-saga'
 import rootSaga from './src/redux/sagas/rootSaga'
 import messaging from '@react-native-firebase/messaging';
 import PushNotification from "react-native-push-notification"
 import { createChannel, showNotification } from './src/helpers/notification'

 

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('unsubscribe')
  const chanelId = Math.random().toString(36).substring(7)

  createChannel(chanelId)
  showNotification(chanelId, {
      bigImage: remoteMessage.data.imageUrl,
      color: remoteMessage.data.color,
      title: remoteMessage.data.title,
      message: remoteMessage.data.body
  })
  // console.log('Message handled in the background!', remoteMessage);
});
 
 // Must be outside of any component LifeCycle (such as `componentDidMount`).
 PushNotification.configure({
   // (optional) Called when Token is generated (iOS and Android)
   onRegister: function (token) {
     console.log("TOKEN:", token);
   },
 
   // (required) Called when a remote is received or opened, or local notification is opened
   onNotification: function (notification) {
    if (notification.userInteraction) {
      // console.log(notification)
      RootNavigation.navigate('tabNotification')
      // onAction replacement here
      // props.navigation.replace('HomeStack');
    }
    //  console.log("NOTIFICATION:", notification);
 
     // process the notification
 
     // (required) Called when a remote is received or opened, or local notification is opened
    //  notification.finish(PushNotificationIOS.FetchResult.NoData);
   },
 
   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
   onAction: function (notification) {
     console.log("ACTION:", notification.action);
     console.log("NOTIFICATION:", notification);
     
 
     // process the action
   },
 
   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
   onRegistrationError: function(err) {
     console.error(err.message, err);
   },
 
   // Should the initial notification be popped automatically
   // default: true
   popInitialNotification: true,
 
   /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    * - if you are not using remote notification or do not have Firebase installed, use this:
    *     requestPermissions: Platform.OS === 'ios'
    */
   requestPermissions: Platform.OS === 'ios',
 });












const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

const Ecommerce = () => (
    <Provider store={ store }>
        <App />
    </Provider>
)

sagaMiddleware.run(rootSaga)

AppRegistry.registerComponent(appName, () => Ecommerce);

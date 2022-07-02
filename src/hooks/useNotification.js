import React, { useEffect } from 'react'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { createChannel, showNotification } from '../utils/notification'
import { store } from '../..'
import { increaseNotify } from '../redux/actions/notifyAction'


const useNotification = () => {

    useEffect(() => {
        // messaging().getToken(firebase.app().options.messagingSenderId).then(token => {
        //     console.log('token:::', token)
        // })
        // console.log(firebase.app().options.messagingSenderId)
        // messaging().getToken().then(token => {
        //     console.log('token:::', token)
        // })

        // messaging().onMessage(async remoteMessage => {
        //     console.log('A new FCM message arrived!');
        //     // setNotification({
        //     //     title: remoteMessage.notification.title,
        //     //     body: remoteMessage.notification.body,
        //     //     image: remoteMessage.notification.android.imageUrl,
        //     // });
        // });

        // messaging().onNotificationOpenedApp(remoteMessage => {
        //     console.log('onNotificationOpenedApp',);
        //     // setNotification({
        //     //     title: remoteMessage.notification.title,
        //     //     body: remoteMessage.notification.body,
        //     //     image: remoteMessage.notification.android.imageUrl,
        //     // });
        // });

        const unsubscribe = messaging().onMessage(async remoteMsg => {
            const chanelId = Math.random().toString(36).substring(7)
            createChannel(chanelId)
            showNotification(chanelId, {
                bigImage: remoteMsg.data.image,
                color: remoteMsg.data.color,
                title: remoteMsg.data.title,
                message: remoteMsg.data.body
            })
            store.dispatch(increaseNotify())
        })



        // messaging().setBackgroundMessageHandler(async remoteMsg => {
        //     console.log('remoteMsg Background', remoteMsg)
        // })
        // messaging()
        // .getInitialNotification()
        // .then(remoteMessage => {
        //     if (remoteMessage) {
        //     console.log(
        //         'Notification caused app to open from quit state'
        //     );
        //     // setNotification({
        //     //     title: remoteMessage.notification.title,
        //     //     body: remoteMessage.notification.body,
        //     //     image: remoteMessage.notification.android.imageUrl,
        //     // });
        //     }
        // });

        return unsubscribe
    }, [])

}

export default useNotification
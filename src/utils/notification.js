import PushNotification, { Importance } from "react-native-push-notification"
import messaging from '@react-native-firebase/messaging'
import { doMain } from "./configs"
import { URL_API } from "."



const getTokenDevice = async () => {
    const token = await messaging().getToken()
    return token
}

const createChannel = (channelId) => {
    PushNotification.createChannel(
        {
          channelId: channelId, // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    )
}

const showNotification = (channelId, options) => {
    // console.log('options:::', options)
    PushNotification.localNotification({
        /* Android Only Properties */
        channelId: channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
        largeIconUrl: URL_API + '/image/' + 'logo.png', // (optional) default: undefined
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        subText: 'Mở app nào', // (optional) default: none
        bigPictureUrl: options.bigImage, // (optional) default: undefined
        bigLargeIconUrl: URL_API + '/image/' + 'logo.png', // (optional) default: undefined
        color: options.color, // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: "high", // (optional) set notification priority, default: high
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        subtitle: "Notification from Qsama", // (optional) smaller title below notification title
        title: options.title, // (optional)
        message: options.message, // (required)
        
        // actions: ["Mở", "Đéo"], // (Android only) See the doc for notification actions to know more
    })
      
}

export {
    getTokenDevice,
    createChannel,
    showNotification
}
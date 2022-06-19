// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

let interval

export function navigate(name, params) {
    interval = setInterval(() => {
        if(navigationRef.isReady()) {
            clearInterval(interval)
            navigationRef.navigate(name, params);
        }
    }, 100)
}

export function reset(name, params) {
    navigationRef.reset({
        index: 0,
        routes: [{name: name}]
    })
}
// https://stackoverflow.com/questions/69099279/react-native-how-to-navigate-on-push-notification-click
// https://reactnavigation.org/docs/navigating-without-navigation-prop/
// https://github.com/zo0r/react-native-push-notification/issues/1548
// add other navigation functions that you need and export them
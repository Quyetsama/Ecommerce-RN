import { Dimensions } from 'react-native'
const NAME = 'Astronaut'
// const NAME = 'ＳpaceX'
const doMain = 'http://192.168.63.103:3000/'
const violet = '#8141ff'

const COLOR = {
    violet: '#8141ff'
}

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const SCREEN = {
    WIDTH,
    HEIGHT
}

export {
    NAME,
    doMain,
    violet,
    COLOR,
    SCREEN
}
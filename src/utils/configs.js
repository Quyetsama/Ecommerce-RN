import { Dimensions } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
const NAME = 'Astronaut'
// const NAME = 'ＳpaceX'

const violet = '#8141ff'

const COLOR = {
    violet: '#8141ff',
    primary1: '#fdd34d',
    primary2: '#1a1b1d',
    tomato: 'tomato'
}

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const SCREEN = {
    WIDTH,
    HEIGHT
}

const SIZE = (value) => RFValue(value, HEIGHT)

export {
    NAME,
    violet,
    COLOR,
    SCREEN,
    SIZE
}
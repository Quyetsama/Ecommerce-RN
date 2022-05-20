import React, { useRef, useEffect } from 'react'
import {
    Animated,
    Image
} from 'react-native'
import heart from '../../assets/img/heart.png'
import { SCREEN, SIZE } from '../../helpers/configs'


const getRandomSignedNumber = () => (Math.random() < 0.5 ? -1 : 1)

const getRandomXOutput = () => {
    return getRandomSignedNumber() < 0 ? -Math.random() * SCREEN.WIDTH * 0.7 : Math.random() * 10
}

const getRandomRotateOutput = () => {
    return [getRandomSignedNumber() < 0 ? '-60deg' : '60deg', '0deg']
}

const AnimatedHeart = () => {

    console.log('render')

    const animatedValueY = useRef(new Animated.Value(0)).current
    const randomXOutput = useRef(getRandomXOutput()).current
    const randomRotateOutput = useRef(getRandomRotateOutput()).current

    useEffect(() => {
        Animated.timing(animatedValueY, {
            toValue: -SCREEN.HEIGHT,
            duration: 3000,
            useNativeDriver: true
        }).start()
    }, [animatedValueY])

    return (
        <Animated.Image 
            source={ heart }
            style={{
                width: SIZE(24),
                height: SIZE(24),
                position: 'absolute',
                // top: -60,
                right: 2,
                transform: [
                    {
                        translateX: animatedValueY.interpolate({
                            inputRange: [-SCREEN.HEIGHT, 0],
                            outputRange: [randomXOutput, 0],
                        })
                    },
                    {
                        translateY: animatedValueY.interpolate({
                            inputRange: [-SCREEN.HEIGHT, -10, 0],
                            outputRange: [-SCREEN.HEIGHT, -50, 0],
                        })
                    },
                    {
                        rotate: animatedValueY.interpolate({
                            inputRange: [-SCREEN.HEIGHT, 0],
                            outputRange: randomRotateOutput,
                        })
                    },
                    {
                        scale: animatedValueY.interpolate({
                            inputRange: [-50, 0],
                            outputRange: [1, 0.5],
                            extrapolate: 'clamp'
                        })
                    }
                ],
                opacity: animatedValueY.interpolate({
                    inputRange: [-SCREEN.HEIGHT * 0.7, 0],
                    outputRange: [0, 1]
                })
            }}
        />
    )
}

export default React.memo(AnimatedHeart)
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import React, { useMemo } from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP
    ),
  }))

  const containerStyle = useMemo(
    () => [style, { backgroundColor: '#a8b5eb' }, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  )

  return <Animated.View style={containerStyle} />
}

export default CustomBackdrop
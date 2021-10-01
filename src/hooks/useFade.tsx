import { useRef } from 'react'
import { Animated } from 'react-native'

export const useFade = () => {
  
  //Initial opacity reference
  const opacity = useRef(new Animated.Value(0)).current;

  //To fadeIn element
  const fadeIn = (callback?: Function) => {
    Animated.timing(
      opacity,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }
    ).start(() => callback ? callback() : null);
  }
  
  //To fadeOut element
  const fadeOut = () => {
    Animated.timing(
      opacity,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }
    ).start();
  }
  
  
  return {
    fadeIn,
    fadeOut,
    opacity
  }
}



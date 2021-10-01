import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {

  const {fadeIn, fadeOut, opacity} = useFade();


  return (
    <View style={styles.container}>
      <Animated.View style={{...styles.subBox, opacity: opacity}}>
      </Animated.View>
      <Button
        title='FadeIn'
        onPress={fadeIn}
      />
      <Button buttonStyle={{marginVertical: 10}}
        title='FadeOut'
        onPress={fadeOut}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'indigo',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subBox: {
    backgroundColor: '#084F6A', 
    width: 150, 
    height: 150,
    borderColor: 'white',
    borderWidth: 5,
    marginBottom: 10
  }
})

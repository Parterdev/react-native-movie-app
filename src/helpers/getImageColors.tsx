import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ImageColors from 'react-native-image-colors';

export const getImageColors = async (key: number, uri: string) => {

  let primary:(string|undefined) = '';
  let secondary:(string|undefined) = '';

  const result = await ImageColors.getColors(uri, {
    fallback: '#084F6A',
    cache: true,
    key: key.toString(),
  });

  if (result) {
    if (result.platform === "android") {
      // Android result properties
      primary = result.dominant;
      secondary = result.average;
      /* vibrant = result.vibrant;
      darkMuted = result.darkMuted
      darkVibrant = result.darkVibrant
      lightMuted = result.lightMuted
      lightVibrant = result.lightVibrant
      muted = result.muted; */
    } else if (result.platform === "ios") {
      primary = result.primary;
      secondary = result.secondary;
    } else {
      throw new Error('Unexpected platform key');
    }
  }


  return [primary, secondary]

}


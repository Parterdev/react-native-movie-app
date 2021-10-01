import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import { Movie } from '../interfaces/movieDB';

interface Props {
  movie: Movie,
  width?: (number|string),
  height?: (number|string),
  marginHorizontal?: number,
  marginVertical?: number,
}

export const MovieCard = ({
  movie, width='100%', 
  height='100%', 
  marginHorizontal, 
  marginVertical,
}:Props) => {

  const uriPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const navigation = useNavigation<StackNavigationProp<any, any>>();
  //const {navigation, route} = useNavigation<StackScreenProps<any, any>>();

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', movie)}
        style={styles.cardShadowContainer}>
        <Image style={{
            ...styles.cardMovieImage,
            width,
            height,
            marginHorizontal,
            marginVertical,
          }}
          resizeMode='stretch'
          source={{
            uri: uriPath
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardShadowContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    opacity: 1
  },
  cardMovieImage: {
    borderRadius: 25,
  }
});

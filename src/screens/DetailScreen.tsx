import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import { MovieDetails } from '../components/MovieDetails';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { RootStackParams } from '../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

export const DetailScreen = ({route, navigation}: Props) => {

  const movie = route.params;
  const uriPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {width:windowWidth, height:windowHeight} = Dimensions.get('window');

  const {isLoading, movieFull, cast} = useMovieDetails(movie.id);
  //console.log("useMovieDetailState", {movieFull});

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={{ ...styles.movieImage, height: windowHeight * 0.70 }}
          resizeMode='stretch'
          source={{
            uri: uriPath,
          }}
        />
      </View>
      <View style={{...styles.infoContainer }}>
        <Text style={styles.infoTitle}>Original Title: {movie.original_title}</Text>
        <Text style={styles.infoTitle}>{movie.title}</Text>
        <View style={{flex: 1,marginTop: 10}}>
          {
            (isLoading) ? <ActivityIndicator size={50} color='red'/>
            : <MovieDetails movieFull={movieFull!} cast={cast} />
          }
        </View>
      </View>
      {/* Back button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Icon
            color='red'
            size={45}
            name='chevron-back'
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: 'white',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
  },
  movieImage: {
    flex: 1,
  },
  infoContainer: {
    paddingTop: 10,
    paddingHorizontal: 5,
    //backgroundColor: 'skyblue'
  },
  infoTitle: {
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 10,
  }
});


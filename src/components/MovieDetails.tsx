import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Icon  from 'react-native-vector-icons/Ionicons'
import currencyFormatter  from 'currency-formatter';
import { Cast, ReqResDetailMovieDB } from '../interfaces/movieDetailDB'
import { CastItem } from './CastItem';

interface Props {
  movieFull: ReqResDetailMovieDB,
  cast: Cast[],
}


export const MovieDetails = ({movieFull, cast}:Props) => {


  const _renderItem = (item:Cast) => {
    return (
      <CastItem actor={item} />
    )
  }

  

  return (
    <View style={styles.container}>
      {/* Full movie detail */}
      <View style={{flexDirection: 'row'}}>
        <Icon
          name='star-outline'
          size={20}
          color='#fab91d'
        />
        <Text style={styles.movieDetailText}>{movieFull.vote_average}</Text>
        <Text style={styles.movieDetailText}>
          | {movieFull.genres.map( g => g.name ).join(', ')}
        </Text>
      </View>

      {/* Synopsis */}
      <View style={{paddingVertical: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Synopsis:</Text>
        <Text style={styles.movieDetailText}>{movieFull.overview}</Text>
      </View>

      {/* Budget */}
      <View style={{paddingVertical: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Budget:</Text>
        <Text style={styles.movieDetailText}>
          {currencyFormatter.format(movieFull.budget, {code: 'USD'})}
        </Text>
      </View>

      {/* Casting */}
      <Text style={{ fontWeight: 'bold', fontSize: 20, paddingVertical: 10 }}>Casting:</Text>
      <FlatList style={{ height: 60 }}
        data={cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => _renderItem(item)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      {/* <CastItem actor={cast[3]} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'red'
  },
  movieDetailText: {
    fontSize: 15,
    marginLeft: 5
  }
});


import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Movie } from '../interfaces/movieDB'
import { MovieCard } from './MovieCard';

interface Props {
  title?: string;
  movies: Movie[],
}


export const HorizontalSlider = ({title, movies}:Props) => {

  const _renderItem = (item: any) => {
    return (
      <MovieCard movie={item}
        width={120}
        height={170}
        marginHorizontal={5}
        marginVertical={5}
      />
    );
  }

  return (
    <View style={{ marginVertical: 10 }}>
      { title && <Text style={styles.flatlistText}>{title}</Text> }
      
      <FlatList
        data={movies}
        renderItem={({ item }) => _renderItem(item)}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatlistText: {
    marginHorizontal: 5,
    marginVertical: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});

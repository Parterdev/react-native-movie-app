import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies'
import { getImageColors } from '../helpers/getImageColors';
import { GradientContext } from '../context/GradientContext';

export const HomeScreen = () => {

  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  //const { width:windowWidth, height:windowHeight } = useWindowDimensions();
  //const { top } = useSafeAreaInsets();

  const {setRootColors} = useContext(GradientContext)

  const { isLoading, nowPlaying, topRated, upComing } = useMovies();


  const getCarouselColors = async (index:number) => {
    const movie = nowPlaying[index];
    const uriPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const [primary='red', secondary='blue'] = await getImageColors(movie.id, uriPath);

    //Now, send primary and secondary to context 
    setRootColors({ primary, secondary });

    //console.log(primary, secondary);
  }

  //To apply context gradient color to first render movie[0]
  useEffect(() => {
    if(nowPlaying.length > 0) {
      getCarouselColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator
          color='red'
          size={100}
        />
      </View>
    )
  } else {
    return (
      <GradientBackground>
        {/* Principal carousel */}
        <View style={{ ...styles.carouselContainer, height: windowHeight / 2 }}>
          <Carousel
            data={nowPlaying}
            renderItem={({ item }: any) => <MovieCard movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            onSnapToItem={index => getCarouselColors(index)}
          />
        </View>
        {/* Flatlist carousel */}
        <ScrollView style={{ ...styles.flatlistContainer, height: windowHeight / 2 }}>
          <HorizontalSlider title='Top rated' movies={topRated} />
          <HorizontalSlider title='Upcoming' movies={upComing} />
        </ScrollView>
      </GradientBackground>
    )
  }
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  carouselContainer: {
    //backgroundColor: 'red',
    paddingVertical: 20,
  },
  flatlistContainer: {
    //backgroundColor: 'indigo'
  },
});


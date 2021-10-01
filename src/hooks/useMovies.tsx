import { useEffect, useState } from "react";
import { movieDB } from "../api/movieDB";
import { Movie, ReqResMovieDB } from "../interfaces/movieDB";

interface MoviesState {
  nowPlaying: Movie[],
  topRated: Movie[],
  upComing: Movie[],
}


export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    topRated:   [],
    upComing:   [],
  });

  const getMovies = async () => {
    //Multiple variables request (Promise)
    const nowPlayingPromise = movieDB.get<ReqResMovieDB>('/now_playing');
    const topRatedPromise   = movieDB.get<ReqResMovieDB>('/top_rated');
    const upComingPromise   = movieDB.get<ReqResMovieDB>('/upcoming');

    //Response with array of requests
    const response = await Promise.all([
      nowPlayingPromise,
      topRatedPromise,
      upComingPromise
    ]);

    //Update state with all type of movies
    setMoviesState({
      nowPlaying: response[0].data.results,
      topRated:   response[1].data.results,
      upComing:   response[2].data.results,
    })

    //Now loading is false
    setIsLoading(false);

  }
  useEffect(() => {
    //Get now playing movies
    getMovies();
  }, [])


  return {
    //Get latest movies
    //noPlaying: moviesState?.nowPlaying, => Nope...
    ...moviesState,
    isLoading
  }
}

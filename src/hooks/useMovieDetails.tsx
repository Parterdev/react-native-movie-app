import { useEffect, useState } from 'react';
import { movieDB } from '../api/movieDB';
import { Cast, ReqResCastMovieDB, ReqResDetailMovieDB } from '../interfaces/movieDetailDB';

interface MovieDetails {
  isLoading: boolean,
  movieFull?: ReqResDetailMovieDB,
  cast: Cast[],
}

export const useMovieDetails = (movieId:number) => {

  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
  })

  const getMovieDetails = async () => {
    //Promises
    const movieDetailsPromise     = movieDB.get<ReqResDetailMovieDB>(`${movieId}`);
    const movieCastDetailsPromise = movieDB.get<ReqResCastMovieDB>(`${movieId}/credits`);

    //Trigger promises
    const [movieDetailResponse, movieCastDetailResponse] = await Promise.all([
      movieDetailsPromise,
      movieCastDetailsPromise
    ]);

    //Update state after get responses
    setState({
      isLoading: false,
      movieFull: movieDetailResponse.data,
      cast: movieCastDetailResponse.data.cast
    });
  }

  useEffect(() => {
    getMovieDetails();
  }, [])

  return {
    ...state,
  }
}

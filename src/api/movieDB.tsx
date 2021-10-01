import axios from "axios";

export const movieDB = axios.create({
  /** Paste your API KEY HERE */
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'xxxxxxxxxxxxxxx',
    language: 'en-EN',
  }
});


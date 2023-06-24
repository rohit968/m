import api_base_url from './api_base_url'
import requests from './requests'


// Movies Requests
export const trendingMovies = async () => {
  const request = await api_base_url.get(requests.trendingMovies);
  return request.data.results;
}

export const upcomingMovies = async () => {
  const request = await api_base_url.get(requests.upcomingMovies);
  return request.data.results;
}

export const nowPlayingMovies = async (page) => {
  const request = await api_base_url.get(requests.nowPlayingMovies);
  return request.data.results;
}

export const topRatedMovies = async () => {
  const request = await api_base_url.get(requests.topRatedMovies);
  return request.data.results;
}

export const popularMovies = async () => {
  const request = await api_base_url.get(requests.popularMovies);
  return request.data.results;
}

export const fetchMovieDetailById = async (movieId) => {
  const fetchMovieDetail = `movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`;
  const request = await api_base_url.get(fetchMovieDetail);
  return request.data;
};

export const fetchMovieCast = async (movieId) => {
  const fetchMovieDetail = `movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
  const request = await api_base_url.get(fetchMovieDetail);
  return request.data.cast;
};


//TV Requests
export const trendingTVShows = async () => {
  const request = await api_base_url.get(requests.trendingTVShows);
  return request.data.results;
}

export const popularTVShows = async () => {
  const request = await api_base_url.get(requests.popularTVShows);
  return request.data.results;
}

export const topRatedTVShows = async () => {
  const request = await api_base_url.get(requests.topRatedTVShows);
  return request.data.results;
}

export const latestTVShows = async () => {
  const request = await api_base_url.get(requests.latestTVShows);
  return request.data.results;
}

export const tvairingToday = async () => {
  const request = await api_base_url.get(requests.tvairingToday);
  return request.data.results;
}

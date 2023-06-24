
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  trendingMovies: `trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`,
  nowPlayingMovies: `movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  popularMovies: `movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  topRatedMovies: `movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  upcomingMovies: `movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  fetchMovies: `search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`,
  fetchGenres: `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  popularTVShows: `tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  topRatedTVShows: `tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`,
  latestTVShows: `tv/latest?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  trendingTVShows: `trending/tv/week?api_key=${process.env.REACT_APP_API_KEY} `,
  tvairingToday: `tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
};


import React from "react";
import Carousel from "../components/carousel/Carousel";
import Trending from "../components/trendingMoviesTV/Trending";
import UpcomingMovies from "../components/movieslists/upcomingmovies/UpcomingMovies";
import TopRatedTVShows from "../components/tvshowslists/topratedtvshows/TopRatedTVShows";

const Home = () => {
  return (
    <div>
      <Carousel />
      <TopRatedTVShows />
      <Trending />
      <UpcomingMovies />
    </div>
  );
};

export default Home;

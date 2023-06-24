import React from "react";
import paperimage from "../../assets/trendingsection.jpg";
import TrendingTVShows from "./TrendingTVShows";
import TrendingMovies from "./TrendingMovies";

const Trending = () => {
  return (
    <div
      className="bg-cover bg-center h-fit py-8"
      style={{ backgroundImage: `url(${paperimage})` }}
    >
      <h1 className="text-center text-3xl">Best of the Week</h1>
      <TrendingMovies />
      <TrendingTVShows />
    </div>
  );
};

export default Trending;

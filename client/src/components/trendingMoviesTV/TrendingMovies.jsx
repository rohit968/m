import React, { useEffect, useState } from "react";
import TrendingContent from "./TrendingContent";
import { trendingMovies } from "../../pages/endPoint";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieresults = async () => {
      const result = await trendingMovies();
      setMovies(result);
    };
    movieresults();
  }, []);

  return (
    <>
      <TrendingContent content={movies} media={"movie"} />
    </>
  );
};

export default TrendingMovies;

import React, { useEffect, useState } from "react";

import { topRatedMovies } from "../../../pages/endPoint";
import MovieTVSection from "../../moviestvsection/MovieTVSection";
import DisplayContent from "../../displaycontent/DisplayContent";

const TopRatedMovies = () => {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    const movies = async () => {
      const result = await topRatedMovies();
      setmovies(result);
    };
    movies();
  }, []);

  return (
    <>
      <MovieTVSection
        sectionName={"Top Rated"}
        contentType={" Movies"}
        url={"movie"}
        content={movies}
      />
      <DisplayContent content={movies} contentType={" Movies"} />
    </>
  );
};

export default TopRatedMovies;

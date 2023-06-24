import React, { useEffect, useState } from "react";
import { popularMovies } from "../../../pages/endPoint";
import MovieTVSection from "../../moviestvsection/MovieTVSection";
import DisplayContent from "../../displaycontent/DisplayContent";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movies = async () => {
      const result = await popularMovies();
      setMovies(result);
    };
    movies();
  }, []);

  return (
    <>
      <MovieTVSection
        sectionName={"Popular"}
        contentType={" Movies"}
        url={"movie"}
        content={movies}
      />
      <DisplayContent content={movies} contentType={" Movies"} />
    </>
  );
};

export default PopularMovies;

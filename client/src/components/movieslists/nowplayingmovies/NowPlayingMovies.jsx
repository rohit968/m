import React, { useEffect, useState } from "react";
import { nowPlayingMovies } from "../../../pages/endPoint";
import { AiOutlineRight } from "react-icons/ai";
import DisplayContent from "../../displaycontent/DisplayContent";
import MovieTVSection from "../../moviestvsection/MovieTVSection";

const NowPlayingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movies = async () => {
      const result = await nowPlayingMovies();
      setMovies(result);
    };
    movies();
  }, []);

  return (
    <>
      <MovieTVSection
        sectionName={"Now Playing"}
        contentType={" Movies"}
        url={"movie"}
        content={movies}
      />
      <DisplayContent content={movies} contentType={" Movies"} />
    </>
  );
};

export default NowPlayingMovies;

import React, { useEffect, useState } from "react";
import api_base_url from "../../../pages/api_base_url";
import MovieTVSection from "../../moviestvsection/MovieTVSection";
import DisplayContent from "../../displaycontent/DisplayContent";

const HorrorMovies = ({ id }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const horrorMovies = async () => {
      try {
        const response = await api_base_url.get("/discover/movie?page=1", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            with_genres: id,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    horrorMovies();
  }, [id]);

  return (
    <>
      <MovieTVSection
        sectionName={"Horror"}
        contentType={" Movies"}
        url={"discover"}
        content={movies}
        id={id}
      />
      <DisplayContent content={movies} contentType={" Movies"} />
    </>
  );
};

export default HorrorMovies;

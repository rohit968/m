import React, { useEffect, useState } from "react";
import api_base_url from "../../../pages/api_base_url";
import MovieTVSection from "../../moviestvsection/MovieTVSection";
import DisplayContent from "../../displaycontent/DisplayContent";

const KidsTvShows = ({ id }) => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const kidsTvShows = async () => {
      try {
        const response = await api_base_url.get("/discover/tv?page=1", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            with_genres: id,
          },
        });
        setTvShows(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    kidsTvShows();
  }, [id]);

  return (
    <>
      <MovieTVSection
        sectionName={"Kids"}
        contentType={" TV Shows"}
        url={"discover"}
        content={tvShows}
        id={id}
      />
      <DisplayContent content={tvShows} contentType={" TV Shows"} />
    </>
  );
};

export default KidsTvShows;

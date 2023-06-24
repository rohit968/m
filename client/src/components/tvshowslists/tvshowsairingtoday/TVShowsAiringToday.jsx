import React, { useState, useEffect } from "react";
import DisplayContent from "../../displaycontent/DisplayContent";
import { tvairingToday } from "../../../pages/endPoint";
import MovieTVSection from "../../moviestvsection/MovieTVSection";

const TVShowsAiringToday = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const tvresults = async () => {
      const result = await tvairingToday();
      setTVShows(result);
    };
    tvresults();
  }, []);

  return (
    <>
      <MovieTVSection
        sectionName={"Airing Today"}
        content={tvShows}
        contentType={" TV Shows"}
        url={"tv"}
      />
      <DisplayContent content={tvShows} contentType={" TV Shows"} />
    </>
  );
};

export default TVShowsAiringToday;

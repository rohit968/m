import React, { useState, useEffect } from "react";
import DisplayContent from "../../displaycontent/DisplayContent";
import { latestTVShows } from "../../../pages/endPoint";
import MovieTVSection from "../../moviestvsection/MovieTVSection";

const LatestTVShows = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const tvresults = async () => {
      const result = await latestTVShows();
      setTVShows(result);
    };
    tvresults();
  }, []);

  return (
    <>
      <MovieTVSection
        sectionName={"Latest"}
        contentType={" TV Shows"}
        content={tvShows}
        url={"tv"}
      />
      <DisplayContent content={tvShows} contentType={" TV Shows"} />
    </>
  );
};

export default LatestTVShows;

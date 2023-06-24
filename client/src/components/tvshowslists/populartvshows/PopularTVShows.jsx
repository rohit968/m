import React, { useEffect, useState } from "react";
import { popularTVShows } from "../../../pages/endPoint";
import MovieTVSection from "../../moviestvsection/MovieTVSection";
import DisplayContent from "../../displaycontent/DisplayContent";

const PopularTVShows = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const tvresults = async () => {
      const result = await popularTVShows();
      setTVShows(result);
    };
    tvresults();
  }, []);

  return (
    <>
      <MovieTVSection
        sectionName={"Popular"}
        contentType={" TV Shows"}
        content={tvShows}
        url={"tv"}
      />
      <DisplayContent content={tvShows} contentType={" TV Shows"} />
    </>
  );
};

export default PopularTVShows;

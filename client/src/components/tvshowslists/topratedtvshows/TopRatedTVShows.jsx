import React, { useState, useEffect } from "react";
import DisplayContent from "../../displaycontent/DisplayContent";
import { topRatedTVShows } from "../../../pages/endPoint";

const TopRatedTVShows = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const tvresults = async () => {
      const result = await topRatedTVShows();
      setTVShows(result);
    };
    tvresults();
  }, []);

  return (
    <div className="bg-black h-fit text-center text-white">
      <h2 className="text-3xl p-10 underline">
        Watch the Top Rated TV Series of all Time
      </h2>
      <DisplayContent content={tvShows} contentType={" TV Shows"} />
    </div>
  );
};

export default TopRatedTVShows;

import React, { useEffect, useState } from "react";
import { trendingTVShows } from "../../pages/endPoint";
import TrendingContent from "./TrendingContent";

const TrendingTVShows = () => {
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    const tvresult = async () => {
      const result = await trendingTVShows();
      setTVShows(result);
    };
    tvresult();
  }, []);

  return (
    <>
      <TrendingContent content={tvShows} media={"tv"} />
    </>
  );
};

export default TrendingTVShows;

import React, { useState, useEffect } from "react";
import { upcomingMovies } from "../../../pages/endPoint";
import Card from "../../card/Card";
import DisplayContent from "../../displaycontent/DisplayContent";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieresults = async () => {
      const result = await upcomingMovies();
      setMovies(result);
    };
    movieresults();
  }, []);

  return (
    <div className="bg-black h-fit text-center text-white">
      <h2 className="text-3xl p-10">Movies Coming Soon...</h2>

      <DisplayContent content={movies} contentType={" Movies"} />
    </div>
  );
};

export default UpcomingMovies;

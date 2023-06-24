import React, { useEffect, useState } from "react";
import api_base_url from "../../pages/api_base_url";

const Season = ({ index, id }) => {
  const [season, setSeason] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const getSeason = async () => {
      const result = await api_base_url(
        `tv/${id}/season/${index}?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setSeason(result.data);
    };
    getSeason();
  }, [index, id]);

  console.log(season);

  return (
    <div>
      {season &&
        season.episodes &&
        season.episodes.map((episode, episodeIndex) => (
          <div className="flex gap-4 m-2 md:m-4" key={episode.id}>
            <div className="h-32 w-auto md:w-48">
              <img
                src={`https://image.tmdb.org/t/p/original${episode?.still_path}`}
                alt="Episode 1"
                className="h-full w-full object-center rounded-md"
              />
            </div>
            <div className="text-white flex flex-col justify-evenly text-xs md:text-base">
              <h1 className="text-sm text-red-500 md:text-lg">
                {count + episodeIndex}. {episode?.name}
              </h1>
              <p>{episode?.overview}</p>
              <p>{episode?.runtime} min</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Season;

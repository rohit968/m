import React, { useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import { useLocation, useParams } from "react-router-dom";
import Card from "../components/card/Card";

const MoreMovies = () => {
  const { state } = useLocation();
  const { url, content, id, contentType } = state;
  const { pagename } = useParams();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(content);

  const pathLocation = pagename.toLowerCase().split(" ").join("_");

  const discoverPage = contentType === " Movies" ? "movie" : "tv";

  let completeUrl = "";
  if (
    pathLocation === "now_playing" ||
    pathLocation === "top_rated" ||
    pathLocation === "popular" ||
    pathLocation === "airing_today"
  ) {
    completeUrl = `${url}/${pathLocation}`;
  } else {
    completeUrl = `${url}/${discoverPage}?with_genres=${id}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api_base_url.get(completeUrl, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            page: page,
          },
        });
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [completeUrl, id, page]);

  const handleScroll = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="bg-black text-white grid md:grid-cols-3 md:gap-4 lg:grid-cols-5 gap-10">
        {movies.map((movie) => (
          <Card content={movie} key={movie.id} />
        ))}
      </div>
      <div className="bg-black py-6 flex justify-center items-center">
        <button
          onClick={handleScroll}
          className="bg-red-500 rounded-md text-white px-2.5 py-1"
        >
          See More
        </button>
      </div>
    </>
  );
};

export default MoreMovies;

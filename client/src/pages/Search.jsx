import api_base_url from "./api_base_url";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "../components/searchcard/SearchCard";

const Search = () => {
  const [searchMovies, setSearchMovies] = useState([]);

  const location = useLocation();
  console.log(location);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    const results = async () => {
      try {
        const response = await api_base_url.get(
          `search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=en-US&page=1`
        );
        setSearchMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching the search results:", error);
      }
    };
    results();
  }, [query]);

  const movies = searchMovies.filter((movie) => movie.media_type !== "person");

  return (
    <div className="bg-black h-fit py-10">
      {movies ? (
        <>
          <h1 className="text-white capitalize text-3xl px-20 pb-10">
            Results for <span className="text-red-500">{query}</span>{" "}
            <span className="text-base">(Movies & TV)</span>
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 bg-slate-900 w-11/12 mx-auto py-10 rounded-md">
            {movies.map((movie) => (
              <SearchCard key={movie.id} content={movie} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-3xl text-white">
          No movies or shows for the searched term
        </p>
      )}
    </div>
  );
};

export default Search;

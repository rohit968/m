import React, { useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import NowPlayingMovies from "../components/movieslists/nowplayingmovies/NowPlayingMovies";
import PopularMovies from "../components/movieslists/popularmovies/PopularMovies";
import ActionMovies from "../components/movieslists/actionmovies/ActionMovies";
import TopRatedMovies from "../components/movieslists/topratedmovies/TopratedMovies";
import ComedyMovies from "../components/movieslists/comedymovies/ComedyMovies";
import AnimationMovies from "../components/movieslists/animationmovies/AnimationMovies";
import DocumentaryMovies from "../components/movieslists/documentarymovies/DocumnetaryMovies";
import HorrorMovies from "../components/movieslists/horrormovies/HorrorMovies";
import AdventureMovies from "../components/movieslists/adventuremovies/AdventureMovies";
import CrimeMovies from "../components/movieslists/crimemovies/CrimeMovies";
import ScienceFictionMovies from "../components/movieslists/sciencefictionmovies/ScienceFictionMovies";
import ThrillerMovies from "../components/movieslists/thrillermovies/ThrillerMovies";

const Movies = () => {
  const [movieGenre, setMovieGenre] = useState([]);

  useEffect(() => {
    const movieList = async () => {
      try {
        const response = await api_base_url.get(
          `genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setMovieGenre(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    movieList();
  }, []);

  const actionGenre = movieGenre?.find((g) => g.name === "Action");
  const comedyGenre = movieGenre?.find((g) => g.name === "Comedy");
  const animationGenre = movieGenre?.find((g) => g.name === "Animation");
  const documentaryGenre = movieGenre?.find((g) => g.name === "Documentry");
  const horrorGenre = movieGenre?.find((g) => g.name === "Horror");
  const adventureGenre = movieGenre?.find((g) => g.name === "Adventure");
  const crimeGenre = movieGenre?.find((g) => g.name === "Crime");
  const scienceFictionGenre = movieGenre?.find(
    (g) => g.name === "Science Fiction"
  );
  const thrillerGenre = movieGenre?.find((g) => g.name === "Thriller");

  return (
    <div className="bg-black h-fit text-white pt-10">
      <NowPlayingMovies />
      <TopRatedMovies />
      <PopularMovies />
      {actionGenre && <ActionMovies id={actionGenre.id} />}
      {animationGenre && <AnimationMovies id={animationGenre.id} />}
      {comedyGenre && <ComedyMovies id={comedyGenre.id} />}
      {documentaryGenre && <DocumentaryMovies id={documentaryGenre.id} />}
      {horrorGenre && <HorrorMovies id={horrorGenre.id} />}
      {adventureGenre && <AdventureMovies id={adventureGenre.id} />}
      {crimeGenre && <CrimeMovies id={crimeGenre.id} />}
      {scienceFictionGenre && (
        <ScienceFictionMovies id={scienceFictionGenre.id} />
      )}
      {thrillerGenre && <ThrillerMovies id={thrillerGenre.id} />}
    </div>
  );
};

export default Movies;

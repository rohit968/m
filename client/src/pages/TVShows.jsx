import React, { useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import PopularTVShows from "../components/tvshowslists/populartvshows/PopularTVShows";
import LatestTVShows from "../components/tvshowslists/latesttvshows/LatestTVShows";
import TVShowsAiringToday from "../components/tvshowslists/tvshowsairingtoday/TVShowsAiringToday";
import ActionAdventureTvShows from "../components/tvshowslists/actionadventuretvshows/ActionAdventureTvShows";
import ComedyTvShows from "../components/tvshowslists/comedytvshows/ComedyTvShows";
import AnimationTvShows from "../components/tvshowslists/animationtvshows/AnimationTvShows";
import DocumentaryTvShows from "../components/tvshowslists/documentarytvshows/DocumentaryTvShows";
import DramaTvShows from "../components/tvshowslists/dramatvshows/DramaTvShows";
import CrimeTvShows from "../components/tvshowslists/crimetvshows/CrimeTvShows";
import KidsTvShows from "../components/tvshowslists/kidstvshows/KidsTvShows";
import MysteryTvShows from "../components/tvshowslists/mysterytvshows/MysteryTvShows";
import SoapTvShows from "../components/tvshowslists/soaptvshows/SoapTvShows";
import FamilyTvShows from "../components/tvshowslists/familytvshows/FamilyTvShows";

const TVShows = () => {
  const [tvShowsGenre, setTvShowsGenre] = useState([]);

  useEffect(() => {
    const showList = async () => {
      try {
        const response = await api_base_url.get(
          `genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setTvShowsGenre(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    showList();
  }, []);

  const actionAdventureGenre = tvShowsGenre?.find(
    (g) => g.name === "Action & Adventure"
  );
  const comedyGenre = tvShowsGenre?.find((g) => g.name === "Comedy");
  const animationGenre = tvShowsGenre?.find((g) => g.name === "Animation");
  const crimeGenre = tvShowsGenre?.find((g) => g.name === "Crime");
  const documentaryGenre = tvShowsGenre?.find((g) => g.name === "Documentary");
  const dramaGenre = tvShowsGenre?.find((g) => g.name === "Drama");
  const familyGenre = tvShowsGenre?.find((g) => g.name === "Family");
  const kidsGenre = tvShowsGenre?.find((g) => g.name === "Kids");
  const mysteryGenre = tvShowsGenre?.find((g) => g.name === "Mystery");
  const soapGenre = tvShowsGenre?.find((g) => g.name === "Soap");

  return (
    <div className="bg-black h-fit text-white pt-10">
      <TVShowsAiringToday />
      <PopularTVShows />
      {actionAdventureGenre && (
        <ActionAdventureTvShows id={actionAdventureGenre.id} />
      )}
      {comedyGenre && <ComedyTvShows id={comedyGenre.id} />}
      {animationGenre && <AnimationTvShows id={animationGenre.id} />}
      {documentaryGenre && <DocumentaryTvShows id={documentaryGenre.id} />}
      {familyGenre && <FamilyTvShows id={familyGenre.id} />}
      {dramaGenre && <DramaTvShows id={dramaGenre.id} />}
      {crimeGenre && <CrimeTvShows id={crimeGenre.id} />}
      {kidsGenre && <KidsTvShows id={kidsGenre.id} />}
      {mysteryGenre && <MysteryTvShows id={mysteryGenre.id} />}
      {soapGenre && <SoapTvShows id={soapGenre.id} />}
    </div>
  );
};

export default TVShows;

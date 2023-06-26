import React from "react";
import { useNavigate } from "react-router-dom";
import Watchlist from "../watchlist/Watchlist";
import Favourite from "../favourite/Favourite";

function CarouselCard({ trendingContent }) {
  const navigate = useNavigate();

  const redirectToDetailPage = (contentId, contentType) => {
    navigate(`/detail/${contentId}`, {
      state: { contentType },
    });
  };

  return (
    <div
      className="h-screen relative cursor-pointer"
      onClick={() =>
        redirectToDetailPage(trendingContent?.id, trendingContent?.media_type)
      }
    >
      <img
        src={`https://image.tmdb.org/t/p/original${
          trendingContent?.backdrop_path || trendingContent?.poster_path
        }`}
        alt=""
        className="h-full w-full object-cover"
      />

      <div
        className="absolute w-full flex flex-col gap-3 bottom-0 h-fit px-4 text-white pb-4"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent, rgba(40,90,40,0.5), rgba(37,37,37,1))",
        }}
      >
        <h1 className="text-2xl md:text-4xl">
          {trendingContent.title ||
            trendingContent.original_title ||
            trendingContent.name}
        </h1>
        <p className="text-sm md:text-xl">{trendingContent.overview}</p>
        <div className="flex gap-2">
          <Watchlist content={trendingContent} />
          <Favourite content={trendingContent} />
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;

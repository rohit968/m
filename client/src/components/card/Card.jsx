import React from "react";
import noImage from "../../assets/no-movie-image.webp";
import { useLocation, useNavigate } from "react-router-dom";
import WatchlistLikedContent from "../watchlist&likebutton/Watchlist&LikedContent";

const Card = ({
  content,
  contentType,
  watchlistedContent,
  favouriteContent,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHome = pathname === "/";
  const isMoreMovie = pathname === "/moremovies";

  const image = `https://image.tmdb.org/t/p/original${
    content?.backdrop_path || content?.poster_path
  }`;

  const name =
    content?.title ||
    content?.original_title ||
    content?.name ||
    content?.original_name;

  const handleContentDetails = () => {
    navigate(`/detail/${content?.id}`, {
      state: { content, contentType },
    });
  };

  return (
    <div className="relative px-5 text-center py-3">
      <div
        className={`text-white ${
          isHome ? "h-64 w-48" : "w-60 h-32"
        } rounded-lg cursor-pointer relative transition-all duration-500 transform hover:scale-110 hover:brightness-70`}
      >
        <img
          src={
            image !== "https://image.tmdb.org/t/p/originalundefined" &&
            "https://image.tmdb.org/t/p/originalnull"
              ? image
              : noImage
          }
          alt={content?.title}
          className="h-full object-cover rounded-lg w-full"
          onClick={handleContentDetails}
        />
        <div className="z-99">
          <WatchlistLikedContent
            content={content}
            type={contentType}
            watchlistedContent={watchlistedContent}
            favouriteContent={favouriteContent}
          />
        </div>
      </div>
      <div className={`py-2 ${isMoreMovie ? "mr-28" : ""}`}>{name}</div>
    </div>
  );
};

export default Card;

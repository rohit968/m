import React from "react";
import { ImTv } from "react-icons/im";
import { MdMovie } from "react-icons/md";
import noImage from "../../assets/no-movie-image.webp";
import { AiOutlineHeart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import WatchlistLikedContent from "../watchlist&likebutton/Watchlist&LikedContent";

const SearchCard = ({ content }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const image = `https://image.tmdb.org/t/p/original${
    content?.backdrop_path || content?.poster_path
  }`;

  const isPathSearch = pathname === "/search";

  const isMovie = content?.media_type === "movie";

  const contentType = content?.media_type === "movie" ? "movie" : "tv";

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
    <div className="flex justify-center mb-4 group">
      <div
        className={`text-white h-full rounded-lg ${
          isPathSearch ? "w-3/4" : "w-32"
        } cursor-pointer  transition-all duration-500 transform hover:scale-110 hover:brightness-70`}
        onClick={handleContentDetails}
      >
        <img
          src={
            image !== "https://image.tmdb.org/t/p/originalundefined" &&
            image !== "https://image.tmdb.org/t/p/originalnull"
              ? image
              : noImage
          }
          alt={content?.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <WatchlistLikedContent content={content} />

        {isPathSearch && (
          <>
            <div className="flex mt-2 gap-2">
              <div className="items-center">
                <p className="text-slate-300 mb-1">
                  {isMovie
                    ? (content?.release_date || "").split("-")[0]
                    : (content?.first_air_date || "").split("-")[0]}
                </p>
              </div>

              <div className="h-1 w-1 rounded-full bg-white my-auto"></div>

              <div className="flex items-center ml-1 mb-1">
                {isMovie ? (
                  <>
                    <MdMovie className="text-red-500" />
                    <h3 className="ml-2">Movie</h3>
                  </>
                ) : (
                  <>
                    <ImTv className="text-red-500" />
                    <h3 className="ml-2">TV</h3>
                  </>
                )}
              </div>
              <div className="h-1 w-1 rounded-full bg-white my-auto"></div>
              <div className="uppercase">{content?.original_language}</div>
            </div>
          </>
        )}

        <div
          className={`${
            isPathSearch ? "text-white" : "text-slate-700 pt-2 text-sm"
          }`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default SearchCard;

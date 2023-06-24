import React, { useContext, useState } from "react";
import { IoBookmark, IoHeart } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const WatchlistLikedContent = ({ content, watchlistedContent, type }) => {
  const [mainError, setMainError] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const contentId = content?.id;
  const { userData } = useContext(UserContext);

  const isHome = pathname === "/";
  const isDetail = pathname === `/detail/${content?.id}`;

  const handleWatchlist = async () => {
    try {
      await axios.post("/watchlist", {
        userId: userData?.userId,
        contentId,
        type,
      });
      setIsWatchlisted(!isWatchlisted);
    } catch (err) {
      setMainError(err.response.data);
      setTimeout(() => {
        navigate("/registerlogin");
      }, 3000);
    }
  };

  const handleLikedContent = async () => {
    try {
      await axios.post("/likedcontent", {
        userId: userData?.userId,
        contentId,
      });
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err.response.data);
      setTimeout(() => {
        navigate("/registerlogin");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {mainError && (
        <p className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm">
          {mainError}. Redirecting...
        </p>
      )}
      {!isDetail && (
        <div
          className={`absolute top-1 ${
            isHome ? "right-1" : "right-5"
          } flex bg-slate-400 rounded-full`}
        >
          <div className="bg-slate-400 rounded-full p-1">
            <IoBookmark
              className={`cursor-pointer ${
                isWatchlisted || watchlistedContent?.id === contentId
                  ? "text-red-500"
                  : "text-white"
              }`}
              onClick={handleWatchlist}
            />
          </div>
          <div className="bg-slate-400 rounded-full p-1">
            <IoHeart
              className={`cursor-pointer ${
                isLiked ? "text-red-500" : "text-white"
              }`}
              onClick={handleLikedContent}
            />
          </div>
        </div>
      )}

      {isDetail && (
        <div className="flex items-center gap-3 px-2 py-1">
          <button
            onClick={handleWatchlist}
            className="flex items-center gap-1 bg-red-500 text-white py-1 px-2 rounded-lg"
          >
            {isWatchlisted ? (
              <TiTick className="text-white text-2xl" />
            ) : (
              <>
                {" "}
                <AiOutlinePlus />
                Watchlist
              </>
            )}
          </button>
          <div className="bg-slate-500 text-2xl p-1 rounded-lg">
            <IoHeart
              className={`cursor-pointer ${
                isLiked ? "text-red-500" : "text-white"
              }`}
              onClick={handleLikedContent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistLikedContent;

import React, { useContext, useEffect, useState } from "react";
import { IoBookmark, IoHeart } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const WatchlistLikedContent = ({
  content,
  watchlistedContent,
  favouriteContent,
  type,
}) => {
  const [mainError, setMainError] = useState();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const contentId = content?.id;
  const { userData } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const isHome = pathname === "/";
  const isDetail = pathname === `/detail/${content?.id}`;

  if (userData === null) {
    navigate("/");
  }

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000);
      navigate(pathname);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showModal]);

  const handleWatchlist = async () => {
    try {
      await axios
        .post("/watchlist", {
          userId: userData?.userId,
          contentId,
          type,
        })
        .then((res) => {
          setMainError(res.data.message);
        });
      setIsWatchlisted(!isWatchlisted);
      setShowModal(true);
    } catch (err) {
      setMainError(err.response.data);
      setShowModal(true);
      setTimeout(() => {
        navigate("/registerlogin");
      }, 3000);
    }
  };

  const handleFavouriteContent = async () => {
    try {
      await axios
        .post("/favourite", {
          userId: userData?.userId,
          contentId,
          type,
        })
        .then((res) => {
          setMainError(res.data.message);
        });
      setIsFavourite(!isFavourite);
      setShowModal(true);
    } catch (err) {
      console.log(err.response.data);
      setShowModal(true);
      setTimeout(() => {
        navigate("/registerlogin");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {showModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-6 py-3 rounded-md">
          {mainError ? (
            <p>{mainError}</p>
          ) : (
            <p>Watchlist added successfully.</p>
          )}
        </div>
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
                isFavourite || favouriteContent?.id === contentId
                  ? "text-red-500"
                  : "text-white"
              }`}
              onClick={handleFavouriteContent}
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
                isFavourite ? "text-red-500" : "text-white"
              }`}
              onClick={handleFavouriteContent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistLikedContent;

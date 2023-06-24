import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { AiOutlinePlus } from "react-icons/ai";

const Watchlist = ({ content }) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const contentId = content?.id;
  const { userData } = useContext(UserContext);

  const handleWatchlist = async () => {
    try {
      await axios.post("/watchlist", { userId: userData?.userId, contentId });
      setIsWatchlisted(!isWatchlisted);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Watchlist;

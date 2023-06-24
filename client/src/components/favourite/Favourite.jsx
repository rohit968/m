import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { IoHeart } from "react-icons/io5";
import axios from "axios";

const Favourite = ({ content }) => {
  const [isLiked, setIsLiked] = useState(false);
  const contentId = content?.id;
  const { userData } = useContext(UserContext);

  const handleLikedContent = async () => {
    try {
      await axios.post("/likedcontent", {
        userId: userData?.userId,
        contentId,
      });
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="bg-slate-500 text-2xl p-1 rounded-lg">
      <IoHeart
        className={`cursor-pointer ${isLiked ? "text-red-500" : "text-white"}`}
        onClick={handleLikedContent}
      />
    </div>
  );
};

export default Favourite;

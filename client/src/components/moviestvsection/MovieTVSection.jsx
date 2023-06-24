import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MovieTVSection = ({ sectionName, contentType, url, id, content }) => {
  const navigate = useNavigate();

  const handleSeeMoreSection = () => {
    navigate(`/moremovies/${sectionName}`, {
      state: { contentType, content, url, id },
    });
  };

  return (
    <>
      <h2 className="text-xl py-3 px-5 flex items-center gap-2">
        <p className="cursor-pointer">
          {sectionName}
          {contentType}
        </p>
        <div onClick={handleSeeMoreSection} className="flex items-center">
          <span
            className="text-xs hidden mt-1 pl-3 text-red-500  transition-hover duration-3000 cursor-pointer"
            onMouseLeave={() =>
              document.querySelector("span").classList.add("hidden")
            }
          >
            See More...
          </span>

          <AiOutlineRight
            className="mt-2 text-red-500 cursor-pointer text-sm transition-colors duration-3000"
            onMouseEnter={() =>
              document.querySelector("span").classList.remove("hidden")
            }
          />
        </div>
      </h2>
    </>
  );
};

export default MovieTVSection;

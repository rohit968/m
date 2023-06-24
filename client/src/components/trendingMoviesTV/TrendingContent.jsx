import React from "react";

import SearchCard from "../searchcard/SearchCard";

const TrendingContent = ({ content, media }) => {
  const mediaContent = media === "movie" ? "Movies" : "TV";

  return (
    <>
      <div className="flex items-center gap-16 justify-center">
        <span className="section-line-height items-center bg-gray-400 w-64 hidden md:block"></span>
        <p className="text-center my-3 text-slate-600">
          Introducing The Best {mediaContent} of the Week
        </p>
        <span className="section-line-height items-center bg-gray-400 w-64 hidden md:block"></span>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth p-6 pb-0">
        {content?.map((c) => (
          <SearchCard content={c} key={c.id} />
        ))}
      </div>
    </>
  );
};

export default TrendingContent;

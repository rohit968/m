import React from "react";

const Banner = ({ content }) => {
  const image = `https://image.tmdb.org/t/p/original${
    content?.backdrop_path || content?.poster_path
  }`;

  return (
    <div className="h-96 w-full">
      <img src={image} alt="" />
    </div>
  );
};

export default Banner;

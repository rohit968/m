import React, { useState } from "react";
import Watchlist from "../watchlist/Watchlist";
import { useNavigate } from "react-router-dom";
import Favourite from "../favourite/Favourite";

function CarouselCard({ t, movieId }) {
  const navigate = useNavigate();
  // const [movieId, setmovieId] = useState(t?.id);

  const handleClick = (t) => {
    console.log(movieId);
    //   state: { contentType: t.media_type },
    // })
    //  handleDetail(t.id, t.media_type)
  };
  return (
    <div className="h-screen relative cursor-pointer" key={t.id}>
      <img
        src={`https://image.tmdb.org/t/p/original${
          t?.backdrop_path || t?.poster_path
        }`}
        alt=""
        className="h-full w-full object-cover"
        onClick={() => handleClick(t)}
      />

      <div
        className="absolute w-full flex flex-col gap-3 bottom-0 h-fit px-4 text-white pb-4"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent, rgba(40,90,40,0.5),  rgba(37,37,37,1)",
        }}
      >
        <h1 className="text-2xl md:text-4xl">
          {t.title || t.original_title || t.name}
        </h1>
        <p className="text-sm md:text-xl">{t.overview}</p>
        <div className="flex gap-2">
          <Watchlist content={t} />
          <Favourite content={t} />
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;

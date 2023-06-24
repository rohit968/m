import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api_base_url from "./api_base_url";
import paperimage from "../assets/trendingsection.jpg";
import WatchlistLikedContent from "../components/watchlist&likebutton/Watchlist&LikedContent";
import Trailers from "../components/trailers/Trailers";
import SimilarContent from "../components/similarcontent/SimilarContent";
import RecommendedContent from "../components/recommended/Recommendations";
import Season from "../components/seasons/Season";

const DetailPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { contentType } = state;
  const [content, setContent] = useState({});
  const [cast, setCast] = useState([]);
  const [activeSeason, setActiveSeason] = useState(1);

  const type =
    contentType === " Movies" || contentType === "movie" ? "movie" : "tv";

  useEffect(() => {
    const getContent = async () => {
      const result = await api_base_url(
        `/${type}/${id}?api_key=eb8ba0a881d77dfb687cbaf46459ee4e`
      );
      setContent(result.data);
      window.scrollTo(0, 0);
    };
    const getContentCast = async () => {
      const result = await api_base_url(
        `${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setCast(result.data.cast);
    };
    getContent();
    getContentCast();
  }, [id, type]);

  const handleSeasonClick = (seasonNumber) => {
    setActiveSeason(seasonNumber);
  };

  const convertMinutesToHours = (minutes) => {
    let hours = Math.floor(minutes / 60); // get the number of hours
    let remainingMinutes = minutes % 60; // get the remaining minutes
    return `${hours}h ${remainingMinutes}m`;
  };

  const headerImage = `https://image.tmdb.org/t/p/original${content?.backdrop_path}`;
  const posterimage = `https://image.tmdb.org/t/p/original${content?.poster_path}`;
  const name =
    content.original_title ||
    content.title ||
    content.original_name ||
    content.name;
  const genre = content.genres?.map((g) => g.name);
  const homepage = content?.homepage;
  const language = content?.original_language;
  const overview = content?.overview;
  const date = content?.release_date || content?.first_air_date;
  const runtime = convertMinutesToHours(content.runtime);
  const tagline = content.tagline;
  const seasons = content.number_of_seasons;

  return (
    <div className="bg-black h-fit">
      <section
        className="h-96 w-full hidden lg:block"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></section>
      <section
        className="h-fit w-full p-4 lg:flex lg:gap-20 lg:pl-28"
        style={{ backgroundImage: `url(${paperimage})` }}
      >
        <div>
          <img
            src={posterimage}
            alt="Front Poster"
            className="h-full w-full object-cover rounded-lg lg:-mt-20 lg:h-96 lg:w-64 lg:border-4 lg:border-white md:border-4 md:border-white "
          />
        </div>
        <div className="mt-6 lg:w-5/6">
          <div classname="">
            <h1 className="text-5xl">{name}</h1>
            {tagline && <p className="text-lg mt-2">{tagline}</p>}
            {genre && (
              <div className="flex gap-3 mt-5 overflow-x-auto scrollbar-hide">
                {genre?.map((g) => (
                  <p className="border-2 border-gray-400 text-slate-600 px-3 py-1 rounded-lg md:rounded-full lg:rounded-full text-sm">
                    {g}
                  </p>
                ))}
              </div>
            )}
            <div className="mt-4 flex items-center gap-2">
              {language && <p className="uppercase">{language}</p>}
              {runtime && type === "movie" && (
                <>
                  <div className="h-1 w-1 rounded-full bg-red-500 my-auto"></div>
                  <p>{runtime}</p>
                </>
              )}
              <div className="h-1 w-1 rounded-full bg-red-500 my-auto"></div>
              {date && <p>{date}</p>}
            </div>
          </div>

          {overview && (
            <div className="w-full mt-5">
              <h3 className="text-red-500 text-lg">Overview</h3>
              <p className="text-base px-3">{overview}</p>
            </div>
          )}

          <div className="mt-6 text-center flex flex-col lg:flex-row lg:w-full lg:items-center md:flex-row md:w-full md:items-center gap-2">
            {homepage && (
              <p>
                Visit the{" "}
                <a
                  href={homepage}
                  target="_blank"
                  className="text-lg text-red-500"
                  rel="noreferrer"
                >
                  {name}{" "}
                </a>
                website
              </p>
            )}
            <div className="flex justify-center">
              <WatchlistLikedContent content={content} />
            </div>
          </div>
        </div>
      </section>
      {cast && (
        <section className="pb-10 p-4 ">
          <h2 className="text-red-500 text-4xl mb-5">Cast</h2>
          <div className="flex gap-4 text-center overflow-x-auto scrollbar-hide">
            {cast?.map((c) => (
              <>
                <div className="flex flex-col">
                  <div className="h-54 w-36">
                    <img
                      src={`https://image.tmdb.org/t/p/original${c.profile_path}`}
                      alt="Cast"
                      className="h-full w-full object-fill rounded-md"
                    />
                  </div>
                  <p className="text-white text-sm">{c.name}</p>
                </div>
              </>
            ))}
          </div>
        </section>
      )}
      <section className="p-5">
        <h3 className="text-red-500 text-4xl">
          Watch the Official Trailler here
        </h3>
        <div className="py-10 md:px-20">
          <Trailers id={id} type={type} />
        </div>
      </section>

      <section className="bg-cyan-900 gap-3 mx-3 h-fit pb-1 mb-2 rounded-md">
        {Array.from({ length: seasons }, (_, index) => (
          <>
            <div
              key={index}
              className={`px-2 py-1 cursor-pointer`}
              onClick={() => handleSeasonClick(index + 1)}
            >
              <p
                className={`text-white px-2 py-1 bg-cyan-700 ${
                  activeSeason === index + 1
                    ? "bg-red-500 rounded-md cursor-pointer"
                    : "hover:bg-red-500 hover:rounded-md cursor-pointer"
                }`}
              >
                Season {index + 1}
              </p>
            </div>
            <div>
              {activeSeason === index + 1 && (
                <div>
                  <Season index={index + 1} id={id} />
                </div>
              )}
            </div>
          </>
        ))}
      </section>

      <section
        className="h-fit w-full p-4"
        style={{ backgroundImage: `url(${paperimage})` }}
      >
        <h2 className="text-red-500 text-4xl mb-5">Similar {contentType}</h2>
        <SimilarContent id={id} type={type} />
      </section>
      <section className="h-fit w-full p-4 text-white">
        <h2 className="text-red-500 text-4xl mb-5">
          Recommended {contentType}
        </h2>
        <RecommendedContent id={id} type={type} />
      </section>
    </div>
  );
};

export default DetailPage;

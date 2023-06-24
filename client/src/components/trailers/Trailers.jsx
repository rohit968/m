import React, { useEffect, useState } from "react";
import api_base_url from "../../pages/api_base_url";

const Trailers = ({ id, type }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await api_base_url.get(
          `/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setTrailers(response.data.results);
      } catch (error) {
        console.log("Error fetching trailers:", error);
      }
    };
    fetchTrailers();
  }, [id, type]);

  console.log(trailers);

  const officialTrailer = trailers
    .filter((trailer) => trailer.type === "Trailer")
    .sort((a, b) => new Date(a.published_at) - new Date(b.published_at));

  // Get the YouTube video key from the first official trailer
  const youtubeVideoKey = officialTrailer[0]?.key;

  // Construct the YouTube video URL for embedding
  const youtubeEmbedUrl = youtubeVideoKey
    ? `https://www.youtube.com/embed/${youtubeVideoKey}`
    : null;

  return youtubeEmbedUrl ? (
    <div className="h-96 w-full">
      {/* Render the YouTube video */}
      {youtubeEmbedUrl && (
        <div className="h-full w-full">
          <iframe
            title="Official Trailer"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          ></iframe>
        </div>
      )}
    </div>
  ) : (
    <p className="text-white">No trailer to be shown </p>
  );
};

export default Trailers;

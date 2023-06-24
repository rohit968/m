import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api_base_url from "../../pages/api_base_url";
import WatchlistLikedContent from "../watchlist&likebutton/Watchlist&LikedContent";
import CarouselCard from "./CarouselCard";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      const result = await api_base_url(
        `trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setTrending(result.data.results);
    };
    fetchTrending();
  }, []);

  console.log(trending);

  // const handleDetail = (content, contentType) => {
  //   console.log(content);
  //   navigate(`/detail/${content}`, {
  //     state: { contentType },
  //   });
  // };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black h-screen">
      <Slider {...settings} className="h-full w-full">
        {trending?.map((t, index) => (
          <CarouselCard t={t} movieId={t?.id} key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

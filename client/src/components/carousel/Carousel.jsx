import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api_base_url from "../../pages/api_base_url";
import CarouselCard from "./CarouselCard";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const result = await api_base_url(
        `trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setTrending(result.data.results);
    };
    fetchTrending();
  }, []);

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
          <CarouselCard
            trendingContent={t}
            trendingContentId={t?.id}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

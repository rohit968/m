import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import { UserContext } from "../UserContext";
import Card from "../components/card/Card";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const [content, setContent] = useState([]);
  const { userData, isLoggedIn } = useContext(UserContext);
  const { userId } = userData;
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/registerlogin");
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return; // Return early if not logged in
    }

    axios
      .get("/watchlistSection", { params: { userId: userId } })
      .then((res) => {
        fetchData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [isLoggedIn, userId]);

  const fetchData = async (watchlistedContentID) => {
    const data = [];
    for (const id of watchlistedContentID) {
      const type = id.type === " TV Shows" ? "tv" : "movie";
      console.log(id.type);
      try {
        const response = await api_base_url.get(
          `${type}/${id.contentId}?api_key=${process.env.REACT_APP_API_KEY}`
        );
        data.push(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    setContent(data);
  };

  return (
    <div className="bg-black">
      <h1 className="text-white text-3xl px-3 pt-10 pb-16">
        {userData?.name}'s Watchlist
      </h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 justify-center ">
        {content.map((c) => (
          <Card content={c} key={c?.id} watchlistedContent={c} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

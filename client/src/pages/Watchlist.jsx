import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import { UserContext } from "../UserContext";
import Card from "../components/card/Card";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const [watchlistedContentID, setWatchlistedContentID] = useState([]);
  const [content, setContent] = useState([]);
  const { userData, isLoggedIn } = useContext(UserContext);
  const { userId } = userData;
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/registerlogin");
  }

  useEffect(() => {
    axios
      .get("/watchlists", { params: { userId: userData?.userId } })
      .then((res) => {
        setWatchlistedContentID(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  console.log(watchlistedContentID);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (const id of watchlistedContentID) {
        const type = id.type === " TV Shows" ? "tv" : "movie";
        console.log(type);
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
    fetchData();
  }, [watchlistedContentID]);

  return (
    <div className="bg-black">
      <h1 className="text-white text-3xl px-3 pt-10 pb-16">
        {userData?.name}'s Watchlist
      </h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 ">
        {content.map((c) => (
          <Card content={c} key={c?.id} watchlistedContent={c} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

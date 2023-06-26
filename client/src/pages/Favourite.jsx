import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import { UserContext } from "../UserContext";
import Card from "../components/card/Card";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const [content, setContent] = useState([]);
  const { userData, isLoggedIn } = useContext(UserContext);
  const { userId } = userData;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/registerlogin"); // Return early if not logged in
    }

    axios
      .get("/favouriteSection", { params: { userId: userId } })
      .then((res) => {
        fetchData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    const fetchData = async (favouriteContentId) => {
      const data = [];
      for (const id of favouriteContentId) {
        const type = id.type === " TV Shows" ? "tv" : "movie";
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
  }, [isLoggedIn, userId, navigate]);

  return (
    <div className="bg-black">
      <h1 className="text-white text-3xl px-3 pt-10 pb-16">
        {userData?.name}'s Favorites
      </h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 justify-center">
        {content.length > 0 ? (
          content.map((c) => (
            <Card content={c} key={c?.id} favouriteContent={c} />
          ))
        ) : (
          <p className="text-white pb-10 mx-10 text-center">
            Nothing to show here. Mark more content to add to Favouites
          </p>
        )}
      </div>
    </div>
  );
};

export default Favourite;

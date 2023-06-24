import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import api_base_url from "./api_base_url";
import { UserContext } from "../UserContext";
import Card from "../components/card/Card";
import { useNavigate } from "react-router-dom";

const LikedPage = () => {
  const [likedContentID, setLikedContentID] = useState([]);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useContext(UserContext);
  const { userId } = userData;

  if (!isLoggedIn) {
    navigate("/registerlogin");
  }

  useEffect(() => {
    axios
      .get("/likedsection", { params: { userId } })
      .then((res) => {
        setLikedContentID(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (const id of likedContentID) {
        try {
          const response = await api_base_url.get(
            `movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
          );
          data.push(response.data);
        } catch (err) {
          console.error(err);
        }
      }
      setContent(data);
    };
    fetchData();
  }, [likedContentID]);

  console.log(content);

  return (
    <div className="bg-black">
      <h1 className="text-white text-3xl px-3 pt-10 pb-16">
        {userData?.name}'s Liked Content
      </h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 ">
        {content.map((c) => (
          <Card content={c} key={c?.id} />
        ))}
      </div>
    </div>
  );
};

export default LikedPage;

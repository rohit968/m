import React, { useEffect, useState } from "react";
import api_base_url from "../../pages/api_base_url";
import DisplayContent from "../displaycontent/DisplayContent";

const RecommendedContent = ({ id, type }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await api_base_url.get(
          `/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setContent(response.data.results);
      } catch (error) {
        console.log("Error fetching recommendations:", error);
      }
    };
    result();
  }, [id, type]);

  return <DisplayContent content={content} contentType={type} />;
};

export default RecommendedContent;

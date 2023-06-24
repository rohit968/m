import React, { useEffect, useState } from "react";
import api_base_url from "../../pages/api_base_url";
import DisplayContent from "../displaycontent/DisplayContent";

const SimilarContent = ({ id, type }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await api_base_url.get(
          `/${type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}`
        );
        setContent(response.data.results);
      } catch (error) {
        console.log("Error fetching similar content:", error);
      }
    };
    result();
  }, [id, type]);

  console.log(content);
  return (
    <div>
      <DisplayContent
        content={content}
        className="bg-red-500"
        contentType={type}
      />
      ;
    </div>
  );
};

export default SimilarContent;

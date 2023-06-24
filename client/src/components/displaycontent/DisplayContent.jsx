import React from "react";
import Card from "../card/Card";

const DisplayContent = ({ content, contentType }) => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide">
      {content?.map((c) => (
        <Card content={c} key={c.id} contentType={contentType} />
      ))}
    </div>
  );
};

export default DisplayContent;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [redirectCount, setRedirectCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectCount((prevCount) => prevCount - 1);
    }, 1000);

    if (redirectCount === 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [navigate, redirectCount]);

  return (
    <div className="h-fit bg-black text-white">
      <div className="bg-slate-900 flex flex-col gap-6 justify-center items-center p-64">
        <h1 className="text-5xl">You are on the wrong page</h1>
        <p className="text-red-500">
          You are being redirected to the Home Page in {redirectCount}{" "}
          seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFound;

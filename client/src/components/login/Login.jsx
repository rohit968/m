import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mainError, setMainError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [logging, setLogging] = useState(false);

  const { setUserData, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // If all validations pass, submit the form

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    console.log(formdata);
    await axios
      .post("/login", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
        setLogging(true);
        setTimeout(() => {
          navigate("/");
          setIsLoggedIn(true);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        setMainError(error.response.data);
      });

    //Setting all the fields to blank
    setEmail("");
    setPassword("");
  };

  const handleError = () => {
    setMainError("");
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <h1 className="text-center text-2xl">Welcome Back!!!</h1>
      <p className="w-3/4 text-center mx-auto mt-2 text-sm">
        Enter your details to get sign in to your account
      </p>
      {mainError && (
        <p
          className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm"
          onClick={handleError}
        >
          {mainError}
        </p>
      )}
      {logging && (
        <p className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm">
          {logging} Logging in...
        </p>
      )}

      <div className="my-3">
        <label htmlFor="email" className="block text-sm">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
            setMainError("");
          }}
        />
        {emailError && <p className="text-red-500 mb-3 -mt-3">{emailError}</p>}
      </div>

      <div className="my-5">
        <label htmlFor="password" className="block text-sm">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
            setMainError("");
          }}
        />
        {passwordError && (
          <p className="text-red-500 mb-3 -mt-3">{passwordError}</p>
        )}
      </div>

      <button
        type="submit"
        className="my-5 py-2 bg-red-500 rounded-sm w-full text-white"
      >
        Login
      </button>
      <h2 className="text-center text-sm">
        Don't have an account?
        <Link
          to="/registerlogin"
          className="underline ml-1"
          onClick={() => props.setShowRegistrationForm(true)}
        >
          Register
        </Link>
      </h2>
    </form>
  );
};

export default Login;

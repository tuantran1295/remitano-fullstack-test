import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css";
import { RootStoreContext } from '../../store/rootStore';

const LoginPage = () => {
  const { setUserInfo, logOut } = useContext(RootStoreContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [LoginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Function to run on mount
    logOut()
  }, []); // Empty dependency array

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/funny-api/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.user);
        setUserInfo(response.data.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setErrorMessage(null)
        setLoginMessage('Login Successfully! Hoping in Homepage...')
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
      });
  };

  return (
    <div className="bg-gray-50 flex w-screen h-screen items-center justify-center">
      <div className="w-[60%] px-[30px] h-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 w-[80%]  min-[1024px]:max-w-[700px]"
        >
          <div className="login-form flex flex-col gap-[36px] justify-center items-center">
            <div className="font-bold text-5xl text-[#002D74] mb-4">
              <h2>Login</h2>
            </div>
            <div className="input-effect-div input-effect">
              <input
                type="email"
                name="email"
                className="effect-20 placeholder:text-transparent"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="email"
              />
              <label>Your email</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
            <div className="input-effect-div input-effect">
              <input
                type="password"
                name="password"
                className="effect-20 placeholder:text-transparent"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="csac"
              />
              <label>Password</label>
              <span className="focus-border">
                <i></i>
              </span>
            </div>
            <div className="flex justify-center items-center flex-col gap-3">
              {errorMessage && <p className='text-[red]'>{errorMessage}</p>}
              {LoginMessage && <p className='text-[blue]'>{LoginMessage}</p>}
              <button
                className="bg-[blue] hover:bg-[darkblue] rounded-[8px] outline-none border-none p-[12px] text-white w-full max-w-[200px]"
                type="submit"
              >
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <a href="/register" className="underline text-[blue]">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

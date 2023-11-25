import React, { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("dev_user87238@video.com");
  const [userpassword, setUserPassword] = useState("aiWa7lec5jai9ve3");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const signin = useSignIn();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setisLoading(true);
    try {
      if (!userEmail || !userpassword) {
        setError("Enter The Required Felids");
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        {
          email: userEmail,
          password: userpassword,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        console.log(res.data, "res.data");

        const issignin = signin({
          token: res.data.access_token,
          expiresIn: 3600,
          tokenType: " ",
          authState: {
            email: res.data.email,
            token: res.data.access_token,
            name: res.data.name,
            id: res.data.user_id,
          },
        });
        navigate("/admin");
      }
    } catch (error) {
      if (error?.response?.status === 412) {
        setError("Username or Password Incorrect");
      } else {
        setError("Something went wrong! Please Try Again Later.");
      }

      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  const Icon = isVisible ? FaEyeSlash : FaEye;

  return (
    <div className=" w-full h-screen bg-background text-white flex flex-col justify-center items-center">
      <form onSubmit={(e) => HandleSubmit(e)} className=" flex flex-col gap-3">
        <h1 className=" text-center text-2xl">Login</h1>
        <input
          value={userEmail}
          type="email"
          onChange={(e) => setUserEmail(e.target.value)}
          className=" w-[300px] px-3 py-3 text-[16px] bg-[#2e374a] rounded-md "
        ></input>
        <div
          role="input"
          className=" w-[300px]  py-3 px-3 text-[16px] bg-[#2e374a] rounded-md flex  focus-within:border focus-within:outline-black"
          tabIndex={0}
        >
          <input
            value={userpassword}
            type={isVisible ? "text" : "password"}
            onChange={(e) => setUserPassword(e.target.value)}
            className="flex-1 bg-transparent h-full border-none appearance-none outline-none"
          />
          {userpassword.length > 0 && (
            <Icon
              className="h-full mr-3 cursor-pointer hover:text-white"
              onClick={() => setIsVisible((prev) => !prev)}
            />
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className=" text-white disabled:bg-blue-900 bg-indigo-700 rounded-md py-2"
        >
          {isLoading ? "Submitting" : "Submit"}
        </button>
      </form>
      {error ? <p className="mt-5 text-red-400">{error}</p> : ""}
    </div>
  );
};

export default Login;

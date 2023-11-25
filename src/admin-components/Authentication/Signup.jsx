import React, { useState } from "react";
import axios from "axios";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { redirect, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Passwordconfig } from "../../constants/Informations";

const SignUp = () => {
  const navigate = useNavigate();
  const userfn = useAuthUser();
  const user = userfn();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    country_code: "",
  });

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const signin = useSignIn();

  const validatePassword = (password) => {
    const config = Passwordconfig;
    if (password?.length === 0) {
      setPasswordError("");
      return false;
    }

    if (password?.length < config.minLength) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }

    if (password?.length > config.maxLength) {
      setPasswordError("Password must be at most 20 characters long.");
      return false;
    }

    const hasUpperCase = password?.match(/[A-Z]/);
    const hasLowerCase = password?.match(/[a-z]/);
    const hasNumber = password?.match(/[0-9]/);
    const hasSpecialChar = password?.match(/[!@#$%^&*(),.?":{}|<>]/);

    if (config.upperCase && !hasUpperCase) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }

    if (config.lowerCase && !hasLowerCase) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return false;
    }

    if (config.numbers && !hasNumber) {
      setPasswordError("Password must contain at least one number.");
      return false;
    }

    if (config.specialChar && !hasSpecialChar) {
      setPasswordError("Password must contain at least one special character.");
      return false;
    }

    // All checks passed
    setPasswordError("");
    return true;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setisLoading(true);

    try {
      if (!user) {
        setError("You Don't have Permission to Perform This Task");
        return;
      }
      const {
        email,
        first_name,
        last_name,
        password,
        phone_number,
        country_code,
      } = formData;
      if (
        !email ||
        !first_name ||
        !last_name ||
        !password ||
        !phone_number ||
        !country_code
      ) {
        setError("Enter The Required Felids");
        return;
      }

      if (!validatePassword(password)) {
        return;
      }
      console.log(formData);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        {
          email,
          first_name,
          last_name,
          password,
          phone_number: `${country_code}${phone_number}`,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setError("Something went wrong! Please Try Again Later.");
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  const Icon = isVisible ? FaEyeSlash : FaEye;

  return (
    <div className=" w-full h-screen text-white flex flex-col justify-center items-center">
      <form
        onSubmit={(e) => HandleSubmit(e)}
        className=" flex flex-col gap-3 max-md:px-5"
      >
        <h1 className=" text-center text-2xl">Add a User</h1>
        <div className=" flex flex-col sm:flex-row justify-between gap-2">
          <input
            value={formData.first_name}
            placeholder="First Name"
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, first_name: e.target.value }))
            }
            className=" w-full px-3 py-3 text-[16px] bg-[#2e374a] rounded-md "
          ></input>
          <input
            value={formData.last_name}
            placeholder="Last Name"
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, last_name: e.target.value }))
            }
            className=" w-full px-3 py-3 text-[16px] bg-[#2e374a] rounded-md "
          ></input>
        </div>
        <div className="flex gap-2">
          <input
            value={formData.country_code}
            placeholder="+91"
            maxLength={4}
            type="text"
            required
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                country_code: e.target.value,
              }));
            }}
            className=" w-[6ch] px-3 py-3 text-[16px] bg-[#2e374a] rounded-md "
          ></input>
          <input
            value={formData.phone_number}
            placeholder="Phone Number"
            type="text"
            required
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone_number: e.target.value }))
            }
            className=" w-full px-3 py-3 text-[16px] bg-[#2e374a] rounded-md "
          ></input>
        </div>

        <input
          value={formData.email}
          placeholder="Email"
          type="email"
          required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className=" w-full px-3 py-3 text-[16px] bg-[#2e374a] rounded-md "
        ></input>
        <div
          role="input"
          className=" w-full   pr-3 text-[16px] bg-[#2e374a] rounded-md flex  focus-within:border focus-within:outline-black"
          tabIndex={0}
        >
          <input
            value={formData.password}
            placeholder="Password"
            required
            onBlur={() => validatePassword(formData.password)}
            type={isVisible ? "text" : "password"}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
              validatePassword(e.target.value);
            }}
            className="flex-1 bg-transparent py-3 rounded-md pl-3 h-full border-none appearance-none outline-none"
          />
          {formData.password?.length > 0 && (
            <Icon
              className="h-full mr-3 cursor-pointer hover:text-white"
              onClick={() => setIsVisible((prev) => !prev)}
            />
          )}
        </div>
        <p aria-label="Password Error" className="text-red-500 ">
          {passwordError}
        </p>
        <p aria-label="Password Error" className="text-red-500 ">
          {error}
        </p>

        <button
          disabled={isLoading}
          type="submit"
          className=" text-white disabled:bg-blue-900 bg-indigo-700 rounded-md py-2"
        >
          {isLoading ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;

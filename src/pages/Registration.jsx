/* eslint-disable no-useless-escape */
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { Typography, Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../firbase/firebase.config";

export function Registration() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // handle name functin
  const handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  // handle Email functin
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  // handle password functin
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  //handleSignUp function
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Name is requred");
    }
    if (!email) {
      setEmailError("Email is requred");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Invalid Email");
    }
    if (!password) {
      setPasswordError("Password is requred");
    }
    if (name && email && password) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: "https://i.postimg.cc/5tY4DpHM/Screenshot-19.png",
            })
              .then(() => {
                toast.success("Account Created Successfully", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
                const user = userCredential.user;
                console.log(user);
                setName("");
                setEmail("");
                setPassword("");

                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;
          setEmailError(errorCode);
        });
    }
  };

  return (
    <section className="grid text-center max-h-screen items-center p-8">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2 font-obuntu">
          Sign Up
        </Typography>
        <Typography className="mb-5 text-gray-600 font-normal text-[18px] font-obuntu">
          Enter your email and password to sign Up
        </Typography>
        <form
          action="#"
          className="mx-auto max-w-[24rem] text-left border-2 border-gray-500 p-5"
        >
          <div className="mb-6">
            <label htmlFor="Name">
              <Typography
                variant="small"
                className={`mb-2 flex gap-2 items-center font-medium ${
                  nameError ? "text-red-900" : "text-gray-900"
                } font-obuntu`}
              >
                Your Name{nameError && <MdErrorOutline></MdErrorOutline>}
              </Typography>
            </label>
            <Input
              onChange={handleName}
              id="name"
              color="gray"
              size="lg"
              type="name"
              name="name"
              value={name}
              placeholder="name"
              className="font-obuntu w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
            {nameError && (
              <div
                role="alert"
                className="mb-4  relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                {nameError}
                <button
                  className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-2 right-1.5"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 font-obuntu"
              >
                Your Email
              </Typography>
            </label>
            <Input
              onChange={handleEmail}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              value={email}
              placeholder="name@mail.com"
              className="font-obuntu w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
            {emailError && (
              <div
                role="alert"
                className="mb-4  relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                {emailError}
                <button
                  className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-2 right-1.5"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 font-obuntu"
              >
                Password
              </Typography>
            </label>
            <Input
              onChange={handlePassword}
              size="lg"
              placeholder="********"
              value={password}
              labelProps={{
                className: "hidden ",
              }}
              className="font-obuntu w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? <FaEye /> : <FaEyeSlash />}
                </i>
              }
            />
            {passwordError && (
              <div
                role="alert"
                className="mb-4  relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                {passwordError}
                <button
                  className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-2 right-1.5"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <Button
            onClick={handleSignUp}
            color="gray"
            size="lg"
            className="mt-6 font-obuntu bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
            fullWidth
          >
            Sign Up
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal font-obuntu"
          >
            Have an Allready Account?{" "}
            <Link to="/login" className="font-medium text-gray-900 font-obuntu">
              <span className="text-purple-400 ">Login</span>
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Registration;

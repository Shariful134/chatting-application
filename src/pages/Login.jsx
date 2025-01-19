/* eslint-disable no-useless-escape */

import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

import { Typography, Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router";
import { MdErrorOutline } from "react-icons/md";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "../firbase/firebase.config";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

export function Login() {
  const provider = new GoogleAuthProvider();
  const db = getDatabase();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const navigate = useNavigate();

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

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is requred");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Invalid Email");
    }
    if (!password) {
      setPasswordError("Password is requred");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in

          toast.success("Loggin Successfully", {
            position: "top-center",
            autoClose: 1000,
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

          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
        });
    }
  };

  const handleSignInWithGoolge = () => {
    // console.log("clicked");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        console.log(token);
        const user = result.user;
        console.log(user);
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          email: email,
          profile_picture: user.photoURL,
        })
          .then(() => {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          })
          .catch((error) => {
            console.log(error);
          });

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential: ", credential);
        console.log("email: ", email);
        // ...
      });
  };

  // useEffect(() => {
  //   const starCountRef = ref(db, "users/");
  //   onValue(starCountRef, (snapshot) => {
  //     snapshot.forEach((item) => {
  //       console.log(item.val());
  //     });
  //   });
  // }, []);
  return (
    <section className="grid text-center max-h-screen items-center p-8">
      <div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
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
        <Typography variant="h3" color="blue-gray" className="mb-2 font-obuntu">
          Login
        </Typography>
        <Typography className="mb-5 text-gray-600 font-normal text-[18px] font-obuntu">
          Enter your email and password to Login
        </Typography>
        <form
          action="#"
          className="mx-auto max-w-[24rem] text-left border-2 border-gray-500 p-5"
        >
          <div>
            <Button
              onClick={handleSignInWithGoolge}
              color="gray"
              size="lg"
              className="mt-6 mb-5 font-obuntu bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              fullWidth
            >
              <FaGoogle className="inline-block text-2xl"></FaGoogle>
              <span className="ms-2">Login With Google</span>
            </Button>
          </div>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className={`mb-2 flex gap-2 items-center font-medium ${
                  emailError ? "text-red-900" : "text-gray-900"
                } font-obuntu`}
              >
                Email{emailError && <MdErrorOutline></MdErrorOutline>}
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
                className="mb-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
              >
                {emailError}
                <button
                  className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
                  type="button"
                  onClick={() => setEmailError("")}
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
                className="mb-4 relative flex w-full p-3 text-sm text-white bg-red-600 rounded-md"
                id="alert"
              >
                {passwordError}
                <button
                  className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
                  type="button"
                  onClick={() => setPasswordError("")}
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
            onClick={handleSignIn}
            color="gray"
            size="lg"
            className="mt-6 font-obuntu bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
            fullWidth
          >
            Login
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal font-obuntu"
          >
            Dont Haven an Account?{" "}
            <Link
              to="/registration"
              className="font-medium text-gray-900 font-obuntu"
            >
              <span className="text-purple-400 ">Registratin</span>
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;

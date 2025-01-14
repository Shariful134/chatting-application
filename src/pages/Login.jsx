import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

import { Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="grid text-center max-h-screen items-center p-8">
      <div>
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
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="font-obuntu w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
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
              size="lg"
              placeholder="********"
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
          </div>
          <Button
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

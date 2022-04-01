import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { publicInstance } from "../utils/axios";
import { useAuth, useToast } from "../context";

function SignUpForm() {
    const navigate = useNavigate();
    const initialSignUpState = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const [signUp, setSignUp] = useState(initialSignUpState);
    const { signInStatusDispatch } = useAuth();
    const { addToast } = useToast();
    const onChangeHandler = (e) => {
      setSignUp((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const checkPasswordMatches = () => {
      return signUp.password === signUp.confirmPassword;
    };
    const onSubmit = async () => {
      if (checkPasswordMatches()) {
        try {
          const { status, data } = await publicInstance({
            method: "post",
            url: "/auth/signup",
            data: {
              ...signUp,
            },
          });
          if (status === 201) {
            localStorage.setItem("token", data.encodedToken);
            signInStatusDispatch({ type: "SET_USER", payload: data });
            navigate("/home");
          }
        } catch (error) {
          console.log(error);
          addToast({
            type: "Error",
            msg: "Unable to SignUp",
          });
        }
      } else {
        addToast({
          type: "Error",
          msg: "Password and Confirm Password are not same",
        });
      }
    };
  return (
    <>
      <div className="form_container">
        <div className="form sign_up">
          <div className="form_img">
            <img src="/assets/mobile_login_bro-min.png" alt="" />
          </div>
          <div className="flex flex-col">
            <div className="form_header">
              <span className="h2 text_center">Sign Up</span>
              <div className='text_center'>
                Already have a account ?<Link to="/login">Log In</Link>
              </div>
            </div>
            <div className="input_group">
              <label className="input_label">Full Name</label>
              <input
                onChange={onChangeHandler}
                className="input_regular input_corner"
                type="text"
                name="fullName"
                placeholder="Full Name"
              />
            </div>
            <div className="input_group">
              <label className="input_label">Email Address</label>
              <input
                onChange={onChangeHandler}
                className="input_regular input_corner"
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="input_group">
              <label className="input_label">Password</label>
              <input
                onChange={onChangeHandler}
                name="password"
                className="input_regular input_corner"
                type="password"
                placeholder="Enter 6 charater or more"
              />
            </div>
            <div className="input_group">
              <label className="input_label">Confirm Password</label>
              <input
                onChange={onChangeHandler}
                name="confirmPassword"
                className="input_regular input_corner"
                type="password"
                placeholder="Enter same as password"
              />
            </div>
            <div className="text_center">
              <button
                onClick={onSubmit}
                className="btn btn_primary"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpForm
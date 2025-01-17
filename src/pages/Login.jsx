import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../app/features/auth/authSlice.js";
import { toast } from "react-toastify";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputs))
      .unwrap()
      .then((data) => {
        // Handle success
        toast.success("signup successful!");
        // if (data && data.token) {
        //   localStorage.setItem("token", data.token); // Store the token in localStorage
        //   localStorage.setItem("userId", data.data?._id); // Store the token in localStorage
        //   localStorage.setItem("user", JSON.stringify(data?.data));
        // }
        if (data?.data) {
          navigate("/shop"); // Navigate to profile page if profile is complete
        }
        //  else {
        //   navigate("/profile-form"); // Navigate to profile form if profile is not complete
        // } // Navigate to profile form after successful login
        // const userId = localStorage.getItem("userId");

        // dispatch(fetchUserProfile(userId));
      })

      .catch((err) => {
        // Handle error
        toast.error(err.message || "An error occurred during signup");
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="my-3">
                <label for="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="email"
                  placeholder="name@example.com"
                  onChange={handleInputChange}
                />
              </div>
              <div class="my-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button
                  class="my-2 mx-auto btn btn-dark"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

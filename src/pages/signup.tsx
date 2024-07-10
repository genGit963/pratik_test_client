import React, { useState } from "react";
import { useUserStore } from "../store/user_store";
import { useNavigate } from "react-router-dom";

import "./auth.scss";
import { SignUpInterface } from "../models/user";
import USER_APIs from "../api/user_api";
import LoadingEffect from "../utils/loading/loading";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpInterface>({
    Name: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log("SignUpPage: ", formData);
    e.preventDefault();
    try {
      setLoading(true);
      await USER_APIs.signup(formData).then((response) => {
        alert("Registration Successful !! ");
        setUser(response.data);
        navigate("/");
      });
    } catch (error) {
      setError(String(error));
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_page">
      {loading ? (
        <LoadingEffect />
      ) : (
        <div className="login_container">
          <h1>Todo</h1>
          <h2>SIGN UP</h2>
          <form onSubmit={handleSubmit} className="login_from">
            <input
              type="text"
              placeholder="Name"
              name="Name"
              value={formData.Name}
              onChange={(e) =>
                setFormData({ ...formData, Name: e.target.value })
              }
              required
            />

            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={formData.Email}
              onChange={(e) =>
                setFormData({ ...formData, Email: e.target.value })
              }
              required
            />

            <input
              name="password"
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
              required
              type="password"
              placeholder="Password"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="login-btn">
              Sign up
            </button>
          </form>

          <p className="to_signup">
            Already signed up ?{" "}
            <span onClick={() => navigate("/login")}>Log In</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./auth.scss";
import { ForgetPasswordInterface } from "../models/user";
import USER_APIs from "../api/user_api";
import LoadingEffect from "../utils/loading/loading";

const ForgetPasswordPage: React.FC = () => {
  const [data, setData] = useState<ForgetPasswordInterface>({ Email: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await USER_APIs.forget_password(data).then((response) => {
        alert(
          `OTP is sent Successfully to ${data.Email} !!` +
            "\n\n For instance: you can see OTP if your email isn't valid, \n\n" +
            String(response.data.message)
        );
        navigate("/new_password");
      });
    } catch (error) {
      setError(String(error));
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
          <h2>Forget Password</h2>
          <form onSubmit={handleSubmit} className="login_from">
            <input
              type="email"
              placeholder="Your registered email"
              name="Email"
              value={data.Email}
              onChange={(e) => setData({ Email: e.target.value })}
              required
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="login-btn">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgetPasswordPage;

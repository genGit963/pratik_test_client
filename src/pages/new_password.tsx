import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./auth.scss";
import { NewPasswordInterface } from "../models/user";
import USER_APIs from "../api/user_api";
import LoadingEffect from "../utils/loading/loading";

const NewPasswordPage: React.FC = () => {
  const [data, setData] = useState<NewPasswordInterface>({
    OTP: "",
    newPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await USER_APIs.new_password(data).then((response) => {
        if (response.data.success) {
          alert(`${response.data.message}`);
          navigate("/login");
        } else {
          throw "Password change unsuccessful !!";
        }
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
          <h1>TODO </h1>
          <h2>New Password</h2>
          <form onSubmit={handleSubmit} className="login_from">
            <input
              type="text"
              placeholder="OTP"
              name="OTP"
              value={data.OTP}
              onChange={(e) => setData({ ...data, OTP: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="newPassword"
              name="newPassword"
              value={data.newPassword}
              onChange={(e) =>
                setData({ ...data, newPassword: e.target.value })
              }
              required
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className="login-btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewPasswordPage;

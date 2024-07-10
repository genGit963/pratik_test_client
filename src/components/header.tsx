import React, { useState } from "react";
import "./header.scss";
import TimeLocale from "../utils/date_time/time";
import DateLocale from "../utils/date_time/date";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user_store";
import DateConverter from "../utils/date_time/date_convert";

const Header: React.FC = () => {
  const { user, delUser } = useUserStore();
  const navigate = useNavigate();
  const [dropdown, setDropDown] = useState<boolean>(false);
  const handleDropDown = () => {
    setDropDown(!dropdown);
  };

  return (
    <header className="navbar">
      <div className="header_container">
        <div className="logo" onClick={() => navigate("/")}>
          <h1 className="company">Mero-Kaam</h1>
        </div>

        <div className="name_date">
          <p className="name" onClick={handleDropDown}>
            {user?.user.Name}
          </p>
          <div className="today">
            <DateLocale /> <br />
            <TimeLocale />
          </div>
        </div>

        <div className={dropdown ? "drop_down_show" : "drop_down_hide"}>
          <p className="name">{user?.user.Name}</p>
          <p>{user?.user.Email}</p>
          <p className="since">
            Since: <DateConverter date_string={String(user?.user.Since)} />
          </p>
          <hr className="line" />
          <p className="log_out" onClick={() => delUser()}>
            Log Out
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

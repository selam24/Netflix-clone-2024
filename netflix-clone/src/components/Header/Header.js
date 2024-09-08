import React from "react";
import "./header.css";
import netflixlogo from "../../assets/images/netflix-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import account from "../../assets/images/account.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header-container">
        <div className="header-left">
          <ul>
            <li>
              <a href="https://www.netflix.com/browse">
                <img src={netflixlogo} alt="Netflix logo" width="100" />
              </a>
            </li>
            <li>Home</li>
            <li>
              <a href="https://www.netflix.com/browse/genre/83">TVShow</a>
            </li>
            <li>
              <a href="https://www.netflix.com/browse/genre/34399">Movies</a>
            </li>
            <li>
              <a href="https://www.netflix.com/latest">New & Popular</a>
            </li>
            <li>
              <a href="https://www.netflix.com/browse/my-list">MyList</a>
            </li>
            <li>
              <a href="https://www.netflix.com/browse/original-audio">
                Browse by Languages
              </a>
            </li>
          </ul>
        </div>
        <div className="header-right">
          <ul>
            <li>
              <SearchIcon />
            </li>
            <li>
              <a href="https://www.netflix.com/Kids">
                <h1 className="kids">Kids</h1>
              </a>
            </li>
            <li>
              <NotificationsNoneIcon />
            </li>
            <li>
              <a href="/YourAccount">
                <img src={account} alt="ACCOUNT" width="50" />
              </a>
            </li>
            <li>
              <ArrowDropDownIcon />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;

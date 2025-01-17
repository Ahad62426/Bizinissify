import React from "react";
import PaymentData from "./Payment.json";
import UserData from "./User.json";
import { Link } from "react-router-dom";
import CategoriesData from "./Categories.json";

function Header(props) {
  return (
    <div>
      <header id="header" className="light-grey">
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-10">
              <h2 className="mt-2">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-gear-fill pb-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
                  />
                </svg>
                {props.heading}
              </h2>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </header>
      <section id="breadcrumb">
        <div className="container">
          <ol className="breadcrumb light-grey">
            <li className="active">Dashboard</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
export default Header;

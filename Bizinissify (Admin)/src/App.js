import React, { useState } from "react";
import "./App.css";
import UserData from "./User.json";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";

function App() {
  const [search, setSearch] = useState("");

  const filterListo = UserData.filter((postDetail) => {
    return postDetail.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
    console.log(
      postDetail.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <div className="App">
      <Header heading="Users"></Header>

      <section id="main">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Menu></Menu>
            </div>

            <div className="col-md-9">
              <div className="card mt-2">
                <h6 className="card-header orange">Users</h6>

                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <input
                        className="form-control"
                        type="text "
                        placeholder="Latest Post"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <table className="table ">
                    <thead key="thead">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th>Posts</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {filterListo.map((postDetail, index) => {
                      return (
                        <tbody className="" key={postDetail.id}>
                          <tr key={index}>
                            <Link
                              to={{
                                pathname: "/main",
                                state: { id: postDetail.id },
                              }}
                              className="navsty"
                            >
                              <td>{postDetail.title}</td>
                            </Link>
                            <td>{postDetail.email}</td>
                            <td>{postDetail.joining}</td>
                            <td>
                              <span className="badge bg-warning rounded-circle p-1 text-white">
                                {postDetail.post}
                              </span>
                            </td>

                            <td>
                              <div id="menu">
                                <ul>
                                  <li>
                                    {" "}
                                    <button
                                      type="button"
                                      className="btn btn-sm orange"
                                    >
                                      Options
                                    </button>
                                    <ul className="yes">
                                      <li>
                                        <a href="#">Details</a>
                                      </li>
                                      <li>
                                        {" "}
                                        <a href="#">Remove</a>
                                      </li>
                                      <li>
                                        {" "}
                                        <a href="#">Disable</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

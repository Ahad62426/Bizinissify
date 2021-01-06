import React, { Component } from "react";
import UserDetailData from "./UserDetails.json";
import Header from "./Header";

export default class main extends Component {
  state = {};

  componentDidMount() {
    const { id } = this.props.location.state;
    const currentUser = UserDetailData.filter(
      (UserData) => UserData.id === id
    )[0];
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Header heading="UserDetails"></Header>

        <div className="container m-5">
          <div className=" row mt-5 pt-4">
            <div className="col-md-2"></div>
            <div className="col-md-3 text-secondary ">
              <h3 className="UserDetail_Title">Name </h3>
              <h3 className="UserDetail_Title">Email</h3>
              <h3 className="UserDetail_Title">Phone No</h3>
              <h3 className="UserDetail_Title">Joined</h3>
            </div>
            <div className="col-md-3 text-secondary">
              {currentUser ? (
                <div>
                  <h3 className="UserDetail_Title">{currentUser.title}</h3>
                  <h3 className="UserDetail_Title">{currentUser.email}</h3>
                  <h3 className="UserDetail_Title">{currentUser.phone}</h3>

                  <h3 className="UserDetail_Title">{currentUser.joining}</h3>
                </div>
              ) : null}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>

        <div className="conatiner pl-5 pr-5">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 text-center m-auto">
              <div className="card">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Posts</th>
                      <th>PostTitle</th>
                      <th>PostDetails</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser ? (
                      <>
                        {/* {currentUser.post.length} */}
                        {currentUser.post.map((num) => {
                          return (
                            <tr>
                              <td>
                                <span className="badge bg-warning rounded-cirscle p-1 text-white">
                                  {num.id}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-warning rounded-cirscle p-1 text-white">
                                  {num.title}
                                </span>
                              </td>
                              <td>
                                <span>{num.details}</span>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger text-white"
                                >
                                  Remove
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm orange ml-2 text-white"
                                >
                                  Disable
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

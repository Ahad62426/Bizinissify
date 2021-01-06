import React, { useState, useEffect } from "react";
import "./App.css";
import CategoriesData from "./Categories.json";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Categories() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searches, setSearches] = useState("");
  const [Items, setItems] = useState([]);

  const addItems = (event) => {
    setSearches(event.target.value);
  };
  const ListOfItems = () => {
    setItems((oldItems) => {
      return [...oldItems, searches];
    });
    setModalIsOpen(false)
    setSearches("");
  };
  
  return (
    <div>
      <Header heading="Categories"></Header>

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
                    <div className="col-md-12 mb-2">
                      <button
                        className="btn btn-sm orange"
                        type="button"
                        onClick={() => setModalIsOpen(true)}
                      >
                        Add New
                      </button>

                      <center>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestCLose={() => setModalIsOpen(false)}
                          style={{
                            overlay: {
                              backgroundColor: "rgba(0,0,0,0.6)	",
                              justifyContent: "center",
                            },
                            content: {
                              color: "orange",
                              width: "30%",
                              height: "30%",
                              fontWeight: "700",
                              position: "relative",
                              left: "450px",
                              top: "200px",
                              borderRadius: "20px",
                            },
                          }}
                        >
                          <div className="Wrapper text-center">
                            <div className="row">
                              <div className="col-md-12">
                                <form onSubmit={(event)=>event.preventDefault()}>
                                <label>Name</label>{" "}
                                <input
                                  onChange={addItems}
                                  value={searches}
                                  className="input_style"
                                />
                                <br />
                                <br />
                               
                                <button
                                  className="btn btn-sm orange ml-2"
                                  onClick={ListOfItems} 
                                >
                                  Add New
                                </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Modal>{" "}
                      </center>
                    </div>
                  </div>

                  <table className="table ">
                    <thead key="thead">
                      <tr>
                        <th>Name</th>
                        <th className="checker">Action</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {CategoriesData.map((itemval, index) => {
                        return (
                          <tr key={itemval.id}>
                            <td>{itemval.Name} </td>

                            <td className="checker">
                              <button className="btn orange btn-sm">
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      {Items.map((itemval, index) => {
                        return (
                          <tr key={index}>
                            <td>{itemval} </td>

                            <td className="checker">
                              <button className="btn orange btn-sm">
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
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
export default Categories;

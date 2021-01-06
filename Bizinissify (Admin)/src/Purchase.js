import React, { useState } from "react";
import PaymentData from "./Payment.json";
import Menu from "./Menu";
import Header from "./Header";

import "./App.css";

import { Link } from "react-router-dom";

function Purchase() {
  const [search, setSearch] = useState("");

  const filterListo = PaymentData.filter((Payment) => {
    return Payment.Seller.toLocaleLowerCase().includes(
      search.toLocaleLowerCase()
    );
    console.log(
      Payment.Seller.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  });

  return (
    <div>
      <Header heading="Purchase"></Header>

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
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>PostTitle</th>
                        <th>Payment</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {filterListo.map((Payment, index) => {
                      return (
                        <tbody className="" key={Payment.id}>
                          <tr key={index}>
                          <Link
                              to={{
                                pathname: "/purchasedetail",
                                state: { id: Payment.id },
                              }}
                              className="navsty"
                            >
                            <td>{Payment.Seller}</td>
                             </Link>
                            <td>{Payment.Buyer}</td>
                            <td>{Payment.posttitle}</td>
                            <td>{Payment.payment}</td>
                            <td>{Payment.date}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm orange"
                              >
                                Details
                              </button>
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

export default Purchase;

import React, { Component } from "react";
import UserDetailData from "./PurchaseDetail.json";

import Header from "./Header";

export default class PurchaseDetail extends Component {
  state = {};

  componentDidMount() {
    const { id } = this.props.location.state;
    const currentPaymentUser = UserDetailData.filter(
      (UserData) => UserData.id === id
    )[0];
    this.setState({ currentPaymentUser });
  }

  render() {
    const { currentPaymentUser } = this.state;
    return (
      <div>
        <Header heading="PurchaseDetails"></Header>

        <div className="container m-5">
          <div className=" row mt-5 pt-4">
            <div className="col-md-2"></div>
            <div className="col-md-3 text-secondary ">
              <h3 className="UserDetail_Title">Seller </h3>
              <h3 className="UserDetail_Title">Buyer</h3>
              <h3 className="UserDetail_Title">PostTitle</h3>
              <h3 className="UserDetail_Title">Payment</h3>
              <h3 className="UserDetail_Title">Date</h3>

            </div>
            <div className="col-md-3 text-secondary">
              {currentPaymentUser ? (
                <div>
                  <h3 className="UserDetail_Title">{currentPaymentUser.Seller}</h3>
                  <h3 className="UserDetail_Title">{currentPaymentUser.Buyer}</h3>
                  <h3 className="UserDetail_Title">{currentPaymentUser.posttitle}</h3>

                  <h3 className="UserDetail_Title">{currentPaymentUser.payment}</h3>
                  <h3 className="UserDetail_Title">{currentPaymentUser.date}</h3>
                </div>
              ) : null}
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>

       
      </div>
    );
  }
}

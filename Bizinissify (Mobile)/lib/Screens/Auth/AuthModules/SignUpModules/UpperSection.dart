import 'package:bizinissify/components/Heading.dart';
import 'package:bizinissify/screens/Auth/AuthModules/SignUpModules/TextRows.dart';
import 'package:flutter/material.dart';

class UpperSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(left: 20, right: 20, top: 20),
      child: Column(
        children: <Widget>[
          Container(
            alignment: Alignment.topLeft,
            margin: EdgeInsets.only(top: 20),
            child: Image.asset(
              './assets/logo/logo.png',
              width: 100,
            ),
          ),
          Container(
            alignment: Alignment.topLeft,
            margin: EdgeInsets.only(top: 15, bottom: 10),
            child: Heading("Free services for members:"),
          ),
          Container(
            child: Column(
              children: <Widget>[
                TextRows('Get the Guide to Selling Your Small Business'),
                TextRows('Set-up New email alerts'),
                TextRows('Save Your Searches'),
                TextRows('Save Listings'),
                TextRows('Contact Business for Sale Sellers'),
                TextRows('Optionally Receive the BizBuySell BuyerNewsletter'),
              ],
            ),
          )
        ],
      ),
    );
  }
}

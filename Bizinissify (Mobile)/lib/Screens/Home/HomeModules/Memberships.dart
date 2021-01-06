import 'dart:convert';

import 'package:bizinissify/Components/GreyButton.dart';
import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Components/Loader.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:bizinissify/components/OrangeButton.dart';
import 'package:bizinissify/components/ScrollableContainer.dart';
import 'package:credit_card_field/credit_card_field.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:stripe_payment/stripe_payment.dart';

class Memberships extends StatefulWidget {
  @override
  _MembershipsState createState() => _MembershipsState();
}

class _MembershipsState extends State<Memberships> {
  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  TextEditingController creditCardController = TextEditingController(),
      cvvController = TextEditingController(),
      expirationController = TextEditingController();
  bool enabled = true;

  @override
  void initState() {
    super.initState();
    StripePayment.setOptions(StripeOptions(
        publishableKey:
            "pk_test_51H9xglDKOwc28a4HcSoyZqqJZb2ymy78gfoVuIXzKca6gqkmFZIvWz4xmNuZwpoXZ2NBZmSuM1VWgqavp44NKUPj00MwfbALOu"));
  }

  void checkout(int id, int amount) {
    final CreditCard card = CreditCard(
      number: creditCardController.text,
      expMonth: int.tryParse(expirationController.text.substring(0, 2)),
      expYear: int.tryParse(expirationController.text.substring(3, 5)),
      cvc: cvvController.text,
    );
    StripePayment.createTokenWithCard((card))
        .then((token) {
      confirmPayment(id, amount * 100, token.tokenId);
    });
  }

  confirmPayment(int id, int amount, String tokenId) async {
    try {
      Loader().show(context);
      FirebaseUser user = await Firebase().getFireUser();
      Map<String, String> headers = HEADERS;
      headers["Authorization"] = user.uid.toString();

      Map data = {
        'amount': amount,
        'subscription': id,
        'source': tokenId,
        'receipt_email': 'ahads62426@gmail.com',
      };
      var body = json.encode(data);
      Response response = await post(BASE_URL + MEMBERSHIP_PAYMENT,
          headers: headers, body: body);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_LONG,
        );
      }
      print(json.decode(response.body));
      if (response.statusCode == 200) {
        Navigator.of(context).pop();
        updateProfile(id);
      };
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to complete memberShip!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  updateProfile(int id) async {
    try {
      Loader().show(context);
      FirebaseUser user = await Firebase().getFireUser();
      Map<String, String> headers = HEADERS;
      headers["Authorization"] = user.uid.toString();

      Map data = {
        'subscription': id,
      };
      var body = json.encode(data);
      Response response = await post(BASE_URL + UPDATE_PROFILE,
          headers: headers, body: body);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null && response.statusCode != 200) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          'error',
          Toast.LENGTH_SHORT,
        );
      }
      print(json.decode(response.body));
      if (response.statusCode == 200) getProfile();
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to update profile!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  getProfile() async {
    FirebaseUser user = await Firebase().getFireUser();
    Map<String, String> headers = HEADERS;
    headers["Authorization"] = user.uid.toString();

    SharedPreferences sp = await SharedPreferences.getInstance();
    try {
      Response response = await get(BASE_URL + GET_PROFILE, headers: headers);
      if (json.decode(response.body)['msg'] != null &&
          response.statusCode != 200)
        CustomToast().show(
          json.decode(response.body)['msg'],
          'error',
          Toast.LENGTH_LONG,
        );
      if (response.statusCode == 200) {
        sp.setString(
          'profile',
          json.encode(json.decode(response.body)['profile']),
        );
      }
    } catch (e) {
      CustomToast().show(
        'Unable to fetch profile!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  Widget paymentDialog(int id, int amount) {
    return new Dialog(
      child: ScrollableContainer(
        padding: EdgeInsets.all(20),
        child: Center(
          child: Column(children: [
            Text(
              'Payments By Stripe',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            Container(
              height: 1.0,
              color: BLACK,
              margin: EdgeInsets.symmetric(vertical: 10),
            ),
            Container(
              margin: EdgeInsets.only(top: 15),
              child: CreditCardFormField(
                controller: creditCardController,
                decoration: InputDecoration(
                  contentPadding: EdgeInsets.only(left: 10, right: 10),
                  labelText: "Credit Card Number",
                  hintText: "1111111111111111",
                  labelStyle: TextStyle(
                    color: GREY,
                  ),
                  fillColor: WHITE,
                  border: new OutlineInputBorder(
                    borderRadius: new BorderRadius.circular(10),
                    borderSide: new BorderSide(),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: new BorderSide(color: APP_COLOR, width: 2),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 15),
              child: CVVFormField(
                controller: cvvController,
                decoration: InputDecoration(
                  contentPadding: EdgeInsets.only(left: 10, right: 10),
                  labelText: "CVV",
                  hintText: "123",
                  labelStyle: TextStyle(
                    color: GREY,
                  ),
                  fillColor: WHITE,
                  border: new OutlineInputBorder(
                    borderRadius: new BorderRadius.circular(10),
                    borderSide: new BorderSide(),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: new BorderSide(color: APP_COLOR, width: 2),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 15, bottom: 10),
              child: ExpirationFormField(
                controller: expirationController,
                decoration: InputDecoration(
                  contentPadding: EdgeInsets.only(left: 10, right: 10),
                  labelText: "Card Expiration",
                  hintText: "MM/YY",
                  labelStyle: TextStyle(
                    color: GREY,
                  ),
                  fillColor: WHITE,
                  border: new OutlineInputBorder(
                    borderRadius: new BorderRadius.circular(10),
                    borderSide: new BorderSide(),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: new BorderSide(color: APP_COLOR, width: 2),
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ),
            OrangeButton(
              disable: false,
              text: "Pay",
              onPressed: () => checkout(id, amount),
            ),
            GreyButton(
              expanded: true,
              text: "Cancel",
              onPressed: () => Navigator.of(context).pop(),
            )
          ]),
        ),
      ),
    );
  }

  Widget ColumnSection(String heading, String text) {
    return Container(
      margin: EdgeInsets.only(top: 10),
      child: Column(
        children: <Widget>[
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              heading + ':',
              style: TextStyle(
                color: GREY,
                fontSize: 12,
              ),
            ),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              text,
              style: TextStyle(
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> renderMemberShips() {
    return memberships
        .map((doc) => RaisedButton(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              onPressed: () => showDialog(
                  child: paymentDialog(doc['id'], doc['amount']),
                  context: context),
              elevation: 3,
              color: WHITE,
              padding: EdgeInsets.symmetric(vertical: 15, horizontal: 15),
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    Heading(doc['title'], BUTTON_COLOR),
                    ColumnSection("Duration", doc['duration']),
                    ColumnSection(
                        "Posting Limit",
                        doc['postsLimit'] != null
                            ? doc['postsLimit'].toString()
                            : "Unlimited"),
                    ColumnSection(
                        "Contact Limit",
                        doc['contactsLimit'] != null
                            ? doc['contactsLimit'].toString()
                            : "Unlimited"),
                    ColumnSection("Price", '\$ ' + doc['amount'].toString())
                  ],
                ),
              ),
            ))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60),
        child: AppBar(
          brightness: Brightness.light,
          backgroundColor: LIGHT_COLOR,
          iconTheme: IconThemeData(
            color: BLACK,
          ),
          title: Heading("MemberShips", APP_COLOR),
          centerTitle: true,
        ),
      ),
      body: Container(
          child: GridView.count(
              padding: EdgeInsets.all(10),
              crossAxisCount: 2,
              childAspectRatio: 0.9,
              mainAxisSpacing: 10,
              crossAxisSpacing: 10,
              children: renderMemberShips())),
    );
  }
}

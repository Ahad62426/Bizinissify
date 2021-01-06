import 'dart:convert';

import 'package:bizinissify/Components/BottomSeparator.dart';
import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Components/Loader.dart';
import 'package:bizinissify/Components/OrangeButton.dart';
import 'package:bizinissify/Components/ScrollableContainer.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Screens/Franchises/EditFranchise.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';

class FranchiseDetails extends StatefulWidget {
  final int id;

  FranchiseDetails({this.id});

  @override
  _FranchiseDetailsState createState() => _FranchiseDetailsState();
}

class _FranchiseDetailsState extends State<FranchiseDetails> {
  @override
  void initState() {
    super.initState();
    setEmail();
    Future.delayed(Duration.zero, () {
      getFranchiseDetails(widget.id);
    });
  }

  Map franchiseDetails = new Map();
  Map sellerDetails = new Map();
  String email, returnState;

  Future<void> setEmail() async {
    FirebaseUser user = await Firebase().getFireUser();
    setState(() => email = user.email);
  }

  Future<void> getFranchiseDetails(id) async {
    try {
      Loader().show(context);
      Map<String, String> headers = HEADERS;
      Map data = {'id': id};
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + GET_FRANCHISE_DETAILS, headers: headers, body: body);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        setState(() {
          franchiseDetails = (json.decode(response.body)['franchiseDetails']);
          sellerDetails = (json.decode(response.body)['sellerDetails']);
        });
      Loader().hide(context);
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to fetch posts!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  Future<void> getFranchiseToEdit(id) async {
    try {
      Loader().show(context);
      FirebaseUser user = await Firebase().getFireUser();
      Map<String, String> headers = HEADERS;
      headers["Authorization"] = user.uid.toString();
      Map data = {'id': id};
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + GET_FRANCHISE_TO_EDIT, headers: headers, body: body);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        Loader().hide(context);
        Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => EditFranchise(
                  franchiseToEdit: (json.decode(response.body)['franchiseToEdit']))),
        ).then((val){
          if (val != null && val == 'updated') {
            setState(() {
              this.returnState = 'updated';
            });
            getFranchiseDetails(widget.id);
          }
        });
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to fetch posts!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  Widget RowSection(String heading, String text) {
    return Expanded(
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

  Widget ColumnSection(String heading, String text, [bool link]) {
    return Container(
      child: Column(
        children: <Widget>[
          Container(
            margin: EdgeInsets.only(top: 10, bottom: 3),
            alignment: Alignment.topLeft,
            child: Text(
              heading + ':',
              style: TextStyle(
                color: GREY,
                fontSize: 14,
              ),
            ),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: link != null && link
                ? InkWell(
                    child: Text(
                    text,
                    style: TextStyle(
                      color: APP_COLOR,
                      fontSize: 10,
                    ),
                  ))
                : Text(
                    text,
                    style: TextStyle(
                      fontSize: 10,
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  Widget DetailsSection() {
    if (franchiseDetails['title'] != null)
      return ScrollableContainer(
        color: LIGHTER_BLACK,
        child: Card(
          margin: EdgeInsets.all(10),
          color: WHITE,
          elevation: 5.0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          borderOnForeground: true,
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: 15, horizontal: 15),
            child: Column(
              children: [
                Container(
                  height: 150,
                  width: 200,
                  margin: EdgeInsets.only(bottom: 10),
                  decoration: BoxDecoration(
                    borderRadius: new BorderRadius.all(Radius.circular(10)),
                    image: DecorationImage(
                      fit: BoxFit.fill,
                      image: NetworkImage(franchiseDetails['image_url']),
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    franchiseDetails['title'],
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                ),
                BottomSeparator(),
                Row(
                  children: [
                    RowSection('Location', franchiseDetails['state_city']),
                    RowSection(
                        'Liquid Capital', franchiseDetails['liquid_capital'] != null ?'\$ '+franchiseDetails['liquid_capital'].toString() : 'N/A'),
                    RowSection(
                        'Net Worth', '\$ '+franchiseDetails['net_worth'].toString()),
                  ],
                ),
                BottomSeparator(),
                Row(
                  children: [
                    RowSection(
                        'Minimum. Capital Required', '\$ '+franchiseDetails['capital_required_min'].toString()),
                    RowSection(
                        'Maximum. Capital Required', '\$ '+franchiseDetails['capital_required_max'].toString()),
                  ],
                ),
                BottomSeparator(),
                Row(
                  children: [
                    RowSection(
                        'Financing', franchiseDetails['financing'] == 1 ? 'Available' : 'N/A'),
                    RowSection(
                        'Training', franchiseDetails['support_n_training'] != null ? 'Available' : 'N/A'),
                    RowSection(
                        'Conpany Units', franchiseDetails['company_units'].toString()),
                    RowSection(
                        'Existing Units', franchiseDetails['existing_units'].toString()),
                  ],
                ),
                BottomSeparator(),
                Row(
                  children: [
                    RowSection(
                        'Initial Franchise Fee', franchiseDetails['initial_franchise_fee'] != null ?'\$ '+franchiseDetails['initial_franchise_fee'].toString() : 'N/A'),
                    RowSection(
                        'Average Yearly Sales', franchiseDetails['avg_sales'] != null ?'\$ '+franchiseDetails['avg_sales'].toString() : 'N/A'),
                  ],
                ),
                BottomSeparator(),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Seller Details:",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
                Row(
                  children: [
                    Container(
                      width: 50,
                      height: 50,
                      margin: EdgeInsets.only(right: 10),
                      decoration: BoxDecoration(
                        borderRadius: new BorderRadius.all(Radius.circular(10)),
                        image: DecorationImage(
                          fit: BoxFit.contain,
                          image: NetworkImage(sellerDetails['profileImage']),
                        ),
                      ),
                    ),
                    Expanded(
                        child: Column(
                      children: [
                        Container(
                            alignment: Alignment.topLeft,
                            child: Text(
                              "Asset Sale Listed By:",
                              style: TextStyle(
                                color: GREY,
                                fontSize: 12,
                              ),
                            )),
                        Container(
                            alignment: Alignment.topLeft,
                            child: Text(
                              sellerDetails['name'] +
                                  ' ' +
                                  sellerDetails['lastName'],
                              style: TextStyle(
                                fontSize: 14,
                              ),
                            ))
                      ],
                    )),
                    OrangeButton(
                      text: email != null && email == sellerDetails['email']
                          ? 'Edit'
                          : 'Chat',
                      expanded: false,
                      disable: false,
                      onPressed: () =>
                          email != null && email == sellerDetails['email']
                              ? getFranchiseToEdit(widget.id)
                              : null,
                    )
                  ],
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Asset Details:",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
                ColumnSection("Description", franchiseDetails['long_description']),

                if (franchiseDetails['business_owners'] != null &&
                    franchiseDetails['business_owners'] != '')
                  ColumnSection(
                      "Business Owners", franchiseDetails['business_owners']),

                if (franchiseDetails['why_us_description'] != null &&
                    franchiseDetails['why_us_description'] != '')
                  ColumnSection("Why Choose Us", franchiseDetails['why_us_description']),

                if (franchiseDetails['offers'] != null &&
                    franchiseDetails['offers'] != '')
                  ColumnSection(
                      "Offers", franchiseDetails['offers']),

                if (franchiseDetails['ideal_candidate'] != null &&
                    franchiseDetails['ideal_candidate'] != '')
                  ColumnSection("Ideal Candidate",
                      franchiseDetails['ideal_candidate']),

                if (franchiseDetails['history'] != null &&
                    franchiseDetails['history'] != '')
                  ColumnSection("History",
                      franchiseDetails['history']),

                if (franchiseDetails['support_n_training'] != null &&
                    franchiseDetails['support_n_training'] != '')
                  ColumnSection(
                      "Support & Training", franchiseDetails['support_n_training']),
              ],
            ),
          ),
        ),
      );
    else
      return Container();
  }

  Future<bool> _onBackPress() {
    Navigator.pop(context, returnState);
    return Future.value(false);
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onBackPress,
      child: Scaffold(
          appBar: PreferredSize(
            preferredSize: Size.fromHeight(60),
            child: AppBar(
              brightness: Brightness.light,
              backgroundColor: LIGHT_COLOR,
              iconTheme: IconThemeData(
                color: BLACK,
              ),
              title: Heading("Franchise Details", APP_COLOR),
              centerTitle: true,
            ),
          ),
          body: DetailsSection()),
    );
  }
}

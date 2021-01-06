import 'dart:convert';

import 'package:bizinissify/Components/BottomSeparator.dart';
import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Components/Loader.dart';
import 'package:bizinissify/Components/OrangeButton.dart';
import 'package:bizinissify/Components/ScrollableContainer.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Screens/Posts/EditPost.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';

class PostDetails extends StatefulWidget {
  final int id;

  PostDetails({this.id});

  @override
  _PostDetailsState createState() => _PostDetailsState();
}

class _PostDetailsState extends State<PostDetails> {
  @override
  void initState() {
    super.initState();
    setEmail();
    Future.delayed(Duration.zero, () {
      getPostDetails(widget.id);
    });
  }

  Map postDetails = new Map();
  Map sellerDetails = new Map();
  String email, returnState;

  Future<void> setEmail() async {
    FirebaseUser user = await Firebase().getFireUser();
    setState(() => email = user.email);
  }

  Future<void> getPostDetails(id) async {
    try {
      Loader().show(context);
      Map<String, String> headers = HEADERS;
      Map data = {'id': id};
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + GET_POST_DETAILS, headers: headers, body: body);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        setState(() {
          postDetails = (json.decode(response.body)['postDetails']);
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

  Future<void> getPostToEdit(id) async {
    try {
      Loader().show(context);
      FirebaseUser user = await Firebase().getFireUser();
      Map<String, String> headers = HEADERS;
      headers["Authorization"] = user.uid.toString();
      Map data = {'id': id};
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + GET_POST_TO_EDIT, headers: headers, body: body);
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
              builder: (context) => EditPost(
                  postToEdit: (json.decode(response.body)['postToEdit']))),
        ).then((val){
          if (val != null && val == 'updated') {
            setState(() {
              this.returnState = 'updated';
            });
            getPostDetails(widget.id);
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
    if (postDetails['title'] != null)
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
                  margin: EdgeInsets.only(bottom: 10),
                  decoration: BoxDecoration(
                    borderRadius: new BorderRadius.all(Radius.circular(10)),
                    image: DecorationImage(
                      fit: BoxFit.fill,
                      image: NetworkImage(postDetails['image_url']),
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    postDetails['title'],
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                ),
                BottomSeparator(),
                Row(
                  children: [
                    RowSection('Location', postDetails['state_city']),
                    RowSection(
                        'Cost Required', '\$ '+postDetails['price'].toString()),
                    RowSection(
                        'Established On',
                        postDetails['established_on'] == null ||
                                postDetails['established_on'] == 0
                            ? 'N/A'
                            : postDetails['established_on'].toString()),
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
                              ? getPostToEdit(widget.id)
                              : Navigator.pop(context, widget.id.toString()),
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
                ColumnSection("Description", postDetails['long_description']),
                ColumnSection("Location", postDetails['country']),
                if (postDetails['business_owners'] != null &&
                    postDetails['business_owners'] != '')
                  ColumnSection(
                      "Business Owners", postDetails['business_owners']),
                if (postDetails['facilities'] != null &&
                    postDetails['facilities'] != '')
                  ColumnSection("Facilities", postDetails['facilities']),
                if (postDetails['support_n_training'] != null &&
                    postDetails['support_n_training'] != '')
                  ColumnSection(
                      "Support & Training", postDetails['support_n_training']),
                if (postDetails['reason_for_selling'] != null &&
                    postDetails['reason_for_selling'] != '')
                  ColumnSection(
                      "Reason For Selling", postDetails['reason_for_selling']),
                if (postDetails['business_website'] != null &&
                    postDetails['business_website'] != '')
                  ColumnSection("Business Website",
                      postDetails['business_website'], true),
                if (postDetails['demographic_information'] != null &&
                    postDetails['demographic_information'] != '')
                  ColumnSection("Demographic Information",
                      postDetails['demographic_information']),
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
              title: Heading("Business Details", APP_COLOR),
              centerTitle: true,
            ),
          ),
          body: DetailsSection()),
    );
  }
}

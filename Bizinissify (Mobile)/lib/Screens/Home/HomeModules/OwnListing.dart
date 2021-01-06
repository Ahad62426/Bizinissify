import 'dart:convert';

import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Components/Loader.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Screens/Home/HomeModules/Dashboard.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart';

class OwnListing extends StatefulWidget {
  @override
  _OwnListingState createState() => _OwnListingState();
}

class _OwnListingState extends State<OwnListing> {
  List<dynamic> postsList = new List<dynamic>();

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      getOwnPosts();
    });
  }

  Future<void> getOwnPosts() async {
    FirebaseUser user = await Firebase().getFireUser();
    Map<String, String> headers = HEADERS;
    headers["Authorization"] = user.uid.toString();

    try {
      Loader().show(context);
      Response response = await get(BASE_URL + GET_OWN_POSTS, headers: headers);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        setState(() {
          postsList = (json.decode(response.body)['ownPosts']);
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
          title: Heading("Own Listing", APP_COLOR),
          centerTitle: true,
        ),
      ),
      body: Dashboard(context, postsList,
              (val) => {if (val != null && val == 'updated') getOwnPosts()}, 0),
    );
  }
}

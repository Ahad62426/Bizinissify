import 'dart:convert';

import 'package:bizinissify/Components/CustomCheckbox.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/components/Heading.dart';
import 'package:bizinissify/components/OrangeButton.dart';
import 'package:bizinissify/components/ScrollableContainer.dart';
import 'package:bizinissify/components/SimpleInput.dart';
import 'package:bizinissify/screens/Auth/AuthModules/SignUpModules/UpperSection.dart';
import 'package:bizinissify/services/Firebase.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  Firebase auth = new Firebase();
  String name, lastName, email, password;
  bool buyerNews = false, enabled = true;
  Map tempProfile = new Map();

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return ScrollableContainer(
      child: Column(children: <Widget>[
        UpperSection(),
        Stack(
          alignment: Alignment.topCenter,
          children: <Widget>[
            Container(
              padding: EdgeInsets.all(20),
              margin: EdgeInsets.all(20),
              decoration: BoxDecoration(
                  border: Border.all(width: 1.0, color: BLACK),
                  borderRadius: BorderRadius.circular(10)),
              child: Form(
                key: formKey,
                child: Column(children: <Widget>[
                  SimpleInput(
                    enabled: enabled,
                    initialValue: name,
                    placeholder: "Enter First Name",
                    onChanged: (val) => setState(() {
                      name = val;
                    }),
                    validator: (val) => val.isEmpty ? 'Enter first Name' : null,
                  ),
                  SimpleInput(
                    enabled: enabled,
                    initialValue: lastName,
                    placeholder: "Enter Last Name",
                    onChanged: (val) => setState(() {
                      lastName = val;
                    }),
                    validator: (val) => val.isEmpty ? 'Enter last name' : null,
                  ),
                  SimpleInput(
                    enabled: enabled,
                    initialValue: email,
                    placeholder: "Enter Email",
                    onChanged: (val) => setState(() {
                      email = val;
                    }),
                    validator: (val) => val.isEmpty ? 'Enter email' : null,
                  ),
                  SimpleInput(
                    enabled: enabled,
                    initialValue: password,
                    placeholder: "Enter Password",
                    obscureText: true,
                    onChanged: (val) => setState(() {
                      password = val;
                    }),
                    validator: (val) => val.isEmpty || val.length < 6
                        ? 'Enter password with 6+ characters'
                        : null,
                  ),
                  CustomCheckbox(
                    value: buyerNews,
                    text:
                        'Yes, send me the Buyer Newsletter for popular businesses, tips & email promotions.',
                    onChanged: (val) {
                      setState(() {
                        buyerNews = !buyerNews;
                      });
                    },
                  ),
                  OrangeButton(
                    text: "Create Account",
                    disable: false,
                    onPressed: () async {
                      if (formKey.currentState.validate()) {
                        SharedPreferences sp = await SharedPreferences.getInstance();
                        try {
                          tempProfile['name'] = name;
                          tempProfile['lastName'] = lastName;
                          tempProfile['email'] = email;
                          tempProfile['buyerNews'] = buyerNews;
                          sp.setString("tempProfile", json.encode(tempProfile));
                          await auth.register(name, email, password);
                        } catch (e) {
                          sp.remove("tempProfile");
                          CustomToast().show(
                            e.message,
                            'error',
                            Toast.LENGTH_LONG,
                          );
                        }
                      }
                    },
                  ),
                ]),
              ),
            ),
            Container(
                margin: EdgeInsets.only(top: 5),
                padding: EdgeInsets.only(left: 10, right: 10),
                color: WHITE,
                child: Heading("Create Account")),
          ],
        ),
      ]),
    );
  }
}

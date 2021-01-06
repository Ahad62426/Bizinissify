import 'package:bizinissify/Components/Toast.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/components/Heading.dart';
import 'package:bizinissify/components/OrangeButton.dart';
import 'package:bizinissify/components/ScrollableContainer.dart';
import 'package:bizinissify/components/SimpleInput.dart';
import 'package:bizinissify/services/Firebase.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String email, password;
  bool enabled = true;

  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return ScrollableContainer(
      alignment: Alignment.center,
      child: Column(
        children: <Widget>[
          Container(
            child: Image.asset(
              './assets/logo/logo.png',
              width: 120,
            ),
          ),
          Stack(
            alignment: Alignment.topCenter,
            children: <Widget>[
              Container(
                padding: EdgeInsets.all(20),
                margin: EdgeInsets.only(top: 50, left: 20, right: 20),
                decoration: BoxDecoration(
                    border: Border.all(width: 1.0, color: BLACK),
                    borderRadius: BorderRadius.circular(10)),
                child: Form(
                  key: formKey,
                  child: Column(children: <Widget>[
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
                    Container(
                      alignment: Alignment.topRight,
                      margin: EdgeInsets.only(bottom: 10),
                      child: InkWell(
                        child: Text(
                          'Forgotten Password?',
                          style: TextStyle(
                            decoration: TextDecoration.underline,
                          ),
                        ),
                        onTap: () => null,
                      ),
                    ),
                    OrangeButton(
                      text: "Login",
                      disable: !enabled,
                      onPressed: () async {
                        if (formKey.currentState.validate()) {
                          try {
                            await Firebase().login(email, password);
                          } catch (e) {
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
                margin: EdgeInsets.only(top: 35),
                padding: EdgeInsets.only(left: 10, right: 10),
                color: WHITE,
                child: Heading("Login"),
              ),
            ],
          )
        ],
      ),
    );
  }
}

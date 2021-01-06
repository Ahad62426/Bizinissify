import 'package:bizinissify/screens/Auth/AuthModules/SignUp.dart';
import 'package:bizinissify/screens/Auth/AuthModules/Login.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:bizinissify/Constants/Constant.dart';

class Auth extends StatefulWidget {
  @override
  _AuthState createState() => _AuthState();
}

class _AuthState extends State<Auth> {
  int index = 0;

  Widget view() {
    switch (index) {
      case 0:
        return (Login());
        break;
      case 2:
        return (SignUp());
        break;
    }
  }

  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: WHITE,
      body: view(),
      bottomNavigationBar: SizedBox(
        child: BottomNavigationBar(
            currentIndex: index,
            backgroundColor: LIGHT_COLOR,
            type: BottomNavigationBarType.fixed,
            elevation: 2,
            onTap: (int index) =>
                index != 1 ? setState(() => this.index = index) : null,
            items: [
              BottomNavigationBarItem(
                title: Text(
                  'Login',
                  style: TextStyle(
                      color: index == 0 ? BLACK : APP_COLOR,
                      fontSize: 18,
                      fontWeight: FontWeight.bold),
                ),
                icon: VerticalDivider(),
              ),
              BottomNavigationBarItem(
                  title: Text(
                    '|',
                    style: TextStyle(fontSize: 30),
                  ),
                  icon: VerticalDivider()),
              BottomNavigationBarItem(
                title: Text(
                  'SignUp',
                  style: TextStyle(
                      color: index == 2 ? BLACK : APP_COLOR,
                      fontSize: 18,
                      fontWeight: FontWeight.bold),
                ),
                icon: VerticalDivider(),
              ),
            ]),
      ),
    );
  }
}

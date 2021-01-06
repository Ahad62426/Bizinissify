import 'package:bizinissify/Components/BottomSeparator.dart';
import 'package:bizinissify/Components/ScrollableContainer.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:flutter/material.dart';

typedef StringToVoidFunc = void Function(String);

class Settings extends StatefulWidget {
  Settings();

  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  _SettingsState();

  @override
  void initState() {
    super.initState();
  }

  Firebase _auth = new Firebase();
  bool notifications = true, emails = false;

  @override
  Widget build(BuildContext context) {
    return ScrollableContainer(
      padding: EdgeInsets.symmetric(vertical: 20, horizontal: 15),
      child: Column(
        children: [
          Container(
            child: Row(
              children: [
                Expanded(
                    child: Text("Push Notifications",
                        style: TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w500))),
                Switch(
                  activeTrackColor: BACKGROUND_ORANGE,
                  activeColor: BUTTON_COLOR,
                  value: notifications,
                  onChanged: (val) => setState(( ){
                    this.notifications = val;
                  }),
                )
              ],
            ),
          ),
          BottomSeparator(),
          Container(
            child: Row(
              children: [
                Expanded(
                    child: Text("Alert Emails",
                        style: TextStyle(
                            fontSize: 15, fontWeight: FontWeight.w500))),
                Switch(
                  activeTrackColor: BACKGROUND_ORANGE,
                  activeColor: BUTTON_COLOR,
                  value: emails,
                  onChanged: (val) => setState(( ){
                    this.emails = val;
                  }),
                )
              ],
            ),
          ),
          BottomSeparator(),
          InkWell(
            onTap: () => print("Change Password"),
            child: Container(
              alignment: Alignment.topLeft,
              margin: EdgeInsets.symmetric(vertical: 15),
              child: Text("Change Password",
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
            ),
          ),
          BottomSeparator(),
          InkWell(
            onTap: () async {
              await _auth.logout();
            },
            child: Container(
              alignment: Alignment.topLeft,
              margin: EdgeInsets.symmetric(vertical: 15),
              child: Text("Logout",
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
            ),
          ),
        ],
      ),
    );
  }
}

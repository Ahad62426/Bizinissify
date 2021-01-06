import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Chat extends StatelessWidget {
  String ownEmail, userName, lastMessage;
  int lastUpdated;
  VoidCallback onPressed;
  Map chat;

  Chat(this.chat, this.ownEmail, this.onPressed) {
    int namedIndex = this.chat['users'].indexOf(ownEmail);
    this.userName = this.chat['userSNames'][namedIndex == 0 ? 1 : 0];
    this.lastUpdated = this.chat['lastUpdated'];
    this.lastMessage =
        this.chat['messages'][this.chat['messages'].length - 1]['message'];
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(left: 10, right: 10, top: 15),
      height: 100,
      child: RaisedButton(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        onPressed: this.onPressed,
        color: LIGHT_COLOR,
        padding: EdgeInsets.symmetric(vertical: 12, horizontal: 10),
        child: Column(children: [
          Container(
            alignment: Alignment.centerLeft,
            child: Text(
              this.userName != null ? this.userName : "Unknown",
              style: TextStyle(
                  color: BLACK, fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            margin: EdgeInsets.only(top: 3, bottom: 7),
            child: Text(
              DateFormat.yMMMd().add_jm().format(DateTime.fromMillisecondsSinceEpoch(this.lastUpdated)),
              style: TextStyle(
                  color: BLACK, fontSize: 10, fontStyle: FontStyle.italic),
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            child: Text(
              this.lastMessage,
              maxLines: 2,
              style: TextStyle(color: BLACK, fontWeight: FontWeight.w300, fontSize: 12),
            ),
          ),
        ]),
      ),
    );
  }
}

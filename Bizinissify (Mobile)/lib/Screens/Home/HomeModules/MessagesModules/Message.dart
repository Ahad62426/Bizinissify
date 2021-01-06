import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

class Message extends StatelessWidget {
  final String message, sender, ownEmail, timeStamp;

  Message(this.message, this.sender, this.ownEmail, this.timeStamp);

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment:
          sender == ownEmail ? Alignment.centerLeft : Alignment.centerRight,
      margin: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
      width: double.infinity,
      child: Container(
        width: MediaQuery.of(context).size.width * 0.70,
        padding: EdgeInsets.symmetric(vertical: 15, horizontal: 10),
        decoration: BoxDecoration(
            color: sender == ownEmail ? MSG_OWN : MSG_OTHER,
            borderRadius: BorderRadius.circular(5.0)),
        child: Column(children: [
          Container(
              alignment: Alignment.centerLeft,
              width: MediaQuery.of(context).size.width * 0.80,
              child: Text(message, style: TextStyle( fontSize: 12))),
          Container(
              margin: EdgeInsets.only(top: 10),
              alignment: Alignment.centerRight,
              width: MediaQuery.of(context).size.width * 0.80,
              child: Text(timeStamp, style: TextStyle(
                  color: APP_COLOR, fontSize: 10, fontStyle: FontStyle.italic)))
        ]),
      ),
    );
  }
}

import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Loader {
  show(BuildContext context) {
    return showCupertinoDialog(
      barrierDismissible: false,
      context: context,
      builder: (BuildContext context) {
        return CupertinoAlertDialog(
          title: Text(
            'Loading . . .',
            style: TextStyle(
                color: BLACK,
                fontSize: 16,
                fontWeight: FontWeight.bold),
          ),
          content: Center(
            child: Container(
              margin: EdgeInsets.all(15),
              child: SizedBox(
                height: 30,
                width: 30,
                child: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(BUTTON_COLOR)),
              ),
            ),
          ),
        );
      },
    );
  }

  hide(BuildContext context) {
    Navigator.pop(context);
  }
}

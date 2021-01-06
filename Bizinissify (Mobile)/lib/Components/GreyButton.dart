import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

class GreyButton extends StatelessWidget {
  final String text;
  final bool expanded;
  final VoidCallback onPressed;

  GreyButton({this.text, this.expanded, this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 10, bottom: 10),
      child: SizedBox(
        height: 45,
        width: expanded == null || expanded ? double.infinity : null,
        child: RaisedButton(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          onPressed: this.onPressed,
          color: GREY,
          padding: EdgeInsets.only(left: 30, right: 30),
          child: Text(
            this.text,
            style: TextStyle(
                color: WHITE, fontSize: 16, fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}

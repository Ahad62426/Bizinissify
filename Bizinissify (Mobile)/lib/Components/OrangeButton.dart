import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

class OrangeButton extends StatelessWidget {
  final String text;
  final bool disable;
  final bool expanded;
  final VoidCallback onPressed, disableClick;

  OrangeButton({this.text, this.expanded, this.disable, this.disableClick, this.onPressed});

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
          onPressed: this.disable
              ? this.disableClick != null ? this.disableClick : () => null
              : this.onPressed,
          color: this.disable
              ? BACKGROUND_ORANGE
              : BUTTON_COLOR,
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

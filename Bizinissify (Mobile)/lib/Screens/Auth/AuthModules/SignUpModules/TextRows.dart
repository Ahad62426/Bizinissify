import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

class TextRows extends StatelessWidget {
  String text;
  TextRows(this.text);
  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(bottom: 5),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              margin: EdgeInsets.only(right: 10),
              width: 10,
              height: 20,
              child: Image.asset('./assets/SVG/OtherThanSVG/orange_arrow.jpg'),
            ),
            Flexible(
                child: Text(text,
                    style: TextStyle(color: GREY, fontSize: 14)))
          ],
        ));
  }
}

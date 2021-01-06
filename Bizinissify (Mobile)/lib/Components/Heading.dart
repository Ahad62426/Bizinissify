import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

class Heading extends StatelessWidget {
  final String text;
  final Color color;

  Heading(this.text, [this.color]);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
          color: color != null ? color : BLACK,
          fontSize: 17,
          fontWeight: FontWeight.bold),
    );
  }
}

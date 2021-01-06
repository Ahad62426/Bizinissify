import 'package:flutter/material.dart';

typedef BoolToVoidFunc = void Function(bool);

class CustomCheckbox extends StatelessWidget {
  final bool value;
  final String text;
  final BoolToVoidFunc onChanged;
  final double fontSize;

  CustomCheckbox({this.value, this.text, this.onChanged, this.fontSize});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        SizedBox(
          width: 20,
          child: Checkbox(
            onChanged: onChanged,
            value: value,
          ),
        ),
        Flexible(
          child: Container(
            margin: EdgeInsets.only(left: 10),
            child: Text(
              text,
              style: TextStyle(fontSize: fontSize != null ? fontSize : 12),
            ),
          ),
        ),
      ],
    );
  }
}

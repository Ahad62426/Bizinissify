import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

typedef StringToVoidFunc = void Function(String);

class SimpleInput extends StatelessWidget {
  final String initialValue, placeholder;
  final bool enabled;
  bool obscureText;
  int maxLength;
  TextInputType keyboardType;
  StringToVoidFunc validator, onChanged;

  SimpleInput(
      {this.enabled,
      this.initialValue,
      this.placeholder,
      this.keyboardType,
      this.maxLength,
      this.obscureText,
      this.onChanged,
      this.validator});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 10, bottom: maxLength == null ? 10 : 0),
      child: TextFormField(
        enabled: enabled,
        initialValue: initialValue,
        validator: validator,
        onChanged: onChanged,
        keyboardType: keyboardType != null ? keyboardType : TextInputType.text,
        maxLength: maxLength,
        obscureText: obscureText != null ? obscureText : false,
        textInputAction: TextInputAction.next,
        onFieldSubmitted: (_) => FocusScope.of(context).nextFocus(),
        style: TextStyle(
          fontSize: 12,
          color: !enabled ? BLACK_DISABLE : BLACK,
        ),
        decoration: InputDecoration(
          contentPadding: EdgeInsets.only(left: 10, right: 10),
          labelText: placeholder,
          labelStyle: TextStyle(
            color: GREY,
          ),
          fillColor: WHITE,
          border: new OutlineInputBorder(
            borderRadius: new BorderRadius.circular(10),
            borderSide: new BorderSide(),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: new BorderSide(color: APP_COLOR, width: 2),
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    );
  }
}

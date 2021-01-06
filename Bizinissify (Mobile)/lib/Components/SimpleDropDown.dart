import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

typedef StringToVoidFunc = void Function(String);

class SimpleDropDown extends StatelessWidget {
  final String value, placeholder;
  final bool enabled;
  final List<String> options;
  StringToVoidFunc validator, onChanged;

  SimpleDropDown(
      {this.enabled,
      this.placeholder,
      this.options,
      this.value,
      this.onChanged,
      this.validator});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      child: DropdownButtonFormField<String>(
        isExpanded: true,
        value: value,
        items: options
            .map((option) => DropdownMenuItem(
                  child: Text(option),
                  value: option,
                ))
            .toList(),
        hint: Text(placeholder),
        validator: validator,
        onChanged: onChanged,
        style: TextStyle(
          fontSize: 12,
          color: !enabled ? BLACK_DISABLE : BLACK,
        ),
        decoration: InputDecoration(
          contentPadding: EdgeInsets.only(left: 10, right: 10),
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

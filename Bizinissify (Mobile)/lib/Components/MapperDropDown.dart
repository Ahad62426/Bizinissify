import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

typedef MapToVoidFunc = void Function(Map);

class MapperDropDown extends StatelessWidget {
  final int value;
  final String placeholder;
  final bool enabled;
  final List<Map> options;
  final MapToVoidFunc validator, onChanged;

  MapperDropDown(
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
      child: DropdownButtonFormField<Map>(
        isExpanded: true,
        value: value != null && value > 0 ? options[value-1] : null,
        items: options
            .map((option) => DropdownMenuItem<Map>(
                  child: Text(option['label']),
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

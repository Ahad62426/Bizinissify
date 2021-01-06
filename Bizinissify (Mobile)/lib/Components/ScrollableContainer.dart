import 'package:bizinissify/Constants/Constant.dart';
import 'package:flutter/material.dart';

class ScrollableContainer extends StatelessWidget {
  final Alignment alignment;
  final Color color;
  final EdgeInsets margin, padding;
  final Widget child;

  ScrollableContainer({this.color, this.alignment, this.padding, this.margin, this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: color != null ? color : WHITE,
      alignment: alignment != null ? alignment : Alignment.topCenter,
      height: double.infinity,
      padding: padding,
      margin: margin,
      child: SingleChildScrollView(
        child: child,
      ),
    );
  }
}

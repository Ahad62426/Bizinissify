import 'dart:convert';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:fluttertoast/fluttertoast.dart';

class CustomToast {
  Map backgroundColor = {'success': SUCCESS, 'error': ERROR};

  Map textColor = {'success': BLACK, 'error': WHITE};

  void show(String text, String nature, Toast length) {
    Fluttertoast.showToast(
      msg: text,
      toastLength: length,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      backgroundColor: backgroundColor[nature],
      textColor: WHITE,
    );
  }
}

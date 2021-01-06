import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/models/User.dart';
import 'package:bizinissify/screens/Auth/Auth.dart';
import 'package:bizinissify/screens/home/Home.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';

class Wrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark.copyWith(statusBarColor: TRANSPARENT, systemNavigationBarColor: WHITE, systemNavigationBarIconBrightness: Brightness.dark));
    final user = Provider.of<User>(context);
    if (user == null) {
      return Auth();
    } else {
      return Home();
    }
  }
}
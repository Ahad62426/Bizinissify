import 'package:bizinissify/models/User.dart';
import 'package:bizinissify/screens/Wrapper.dart';
import 'package:bizinissify/services/Firebase.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return StreamProvider<User>.value(
        value: Firebase().user,
        child: MaterialApp(debugShowCheckedModeBanner: false, home: Wrapper()));
  }
}

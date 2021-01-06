import 'dart:convert';

import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/components/OrangeButton.dart';
import 'package:bizinissify/components/ScrollableContainer.dart';
import 'package:bizinissify/components/SimpleInput.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Profile extends StatefulWidget {
  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  String name, lastName, email, altEmail;
  Map profile;
  bool loading = true, enabled = true;

  @override
  void initState() {
    super.initState();
    getProfile();
  }

  Future<void> getProfile() async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    if (sp.getString('profile') != null)
      setProfile(json.decode(sp.getString('profile')));
    else setState(() {
      this.loading = false;
    });
  }

  void setProfile(Map profile) {
    setState(() {
      this.profile = profile;
      this.name = profile['name'];
      this.lastName = profile['lastName'];
      this.email = profile['email'];
      this.altEmail = profile['altEmail'];
      this.loading = false;
    });
  }

  bool validate() {
    if ((formKey.currentState != null && !formKey.currentState.validate()) ||
        (profile != null &&
            name == profile['name'] &&
            lastName == profile['lastName'] &&
            altEmail == profile['altEmail'])) return true;
    return false;
  }

  void submit() {
    print(profile);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60),
        child: AppBar(
          brightness: Brightness.light,
          backgroundColor: LIGHT_COLOR,
          iconTheme: IconThemeData(
            color: BLACK,
          ),
          title: Heading("Account Management", APP_COLOR),
          centerTitle: true,
        ),
      ),
        body: ScrollableContainer(
      padding: EdgeInsets.only(top: 10, left: 20, right: 20),
      child: Form(
        key: formKey,
        child: Column(
            children: !loading
                ? [
              SimpleInput(
                enabled: enabled,
                initialValue: name,
                placeholder: "First Name",
                onChanged: (val) => setState(() {
                  name = val;
                }),
                validator: (val) =>
                val.length < 1 ? 'Firstname can\'t be blank' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: lastName,
                placeholder: "Last Name (Optional)",
                onChanged: (val) => setState(() {
                  lastName = val;
                }),
              ),
              SimpleInput(
                enabled: false,
                initialValue: email,
                placeholder: "Email (Primary)",
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: altEmail,
                placeholder: "Email (Alternate)",
                onChanged: (val) => setState(() {
                  altEmail = val;
                }),
                validator: (val) => val == email
                    ? 'Primary and alternate email can\'t be same'
                    : null,
              ),
              SimpleInput(
                enabled: false,
                initialValue: "********",
                placeholder: "Password",
              ),
              OrangeButton(
                text: "Save Changes",
                disable: validate(),
                onPressed: () => submit(),
              )
            ]
                : []),
      ),
    ),
    );
  }
}

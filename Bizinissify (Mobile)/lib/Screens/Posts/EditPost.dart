import 'dart:convert';

import 'package:bizinissify/Components/MapperDropDown.dart';
import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Components/Loader.dart';
import 'package:bizinissify/Components/OrangeButton.dart';
import 'package:bizinissify/Components/ScrollableContainer.dart';
import 'package:bizinissify/Components/SimpleDropDown.dart';
import 'package:bizinissify/Components/SimpleInput.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';

class EditPost extends StatefulWidget {
  final Map postToEdit;

  EditPost({this.postToEdit});

  @override
  _EditPostState createState() => _EditPostState();
}

class _EditPostState extends State<EditPost> {
  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  String title,
      sub_title,
      state_city,
      price,
      established_on,
      short_description,
      long_description,
      business_owners,
      country,
      facilities,
      support_n_training,
      reason_for_selling,
      business_website,
      demographic_information;
  int category;
  bool enabled = true;

  @override
  void initState() {
    super.initState();
    if (widget.postToEdit != null) {
      setState(() {
        this.title = widget.postToEdit['title'];
        this.sub_title = widget.postToEdit['sub_title'];
        this.state_city = widget.postToEdit['state_city'];
        this.price = widget.postToEdit['price'].toString();
        this.established_on = widget.postToEdit['established_on'] != null &&
                widget.postToEdit['established_on'] > 0
            ? widget.postToEdit['established_on'].toString()
            : null;
        this.short_description = widget.postToEdit['short_description'];
        this.long_description = widget.postToEdit['long_description'];
        this.business_owners = widget.postToEdit['business_owners'];
        this.country = widget.postToEdit['country'];
        this.facilities = widget.postToEdit['facilities'];
        this.support_n_training = widget.postToEdit['support_n_training'];
        this.reason_for_selling = widget.postToEdit['reason_for_selling'];
        this.business_website = widget.postToEdit['business_website'];
        this.demographic_information =
            widget.postToEdit['demographic_information'];
        this.category = widget.postToEdit['category'];
      });
    }
  }

  bool validate() {
    if (formKey.currentState != null && !formKey.currentState.validate())
      return true;
    return false;
  }

  Future<void> updatePost() async {
    try {
      Loader().show(context);

      FirebaseUser user = await Firebase().getFireUser();
      Map<String, String> headers = HEADERS;
      headers["Authorization"] = user.uid.toString();

      Map data = widget.postToEdit;
      data['title'] = this.title;
      data['sub_title'] = this.sub_title;
      data['state_city'] = this.state_city;
      data['price'] = this.price;
      data['established_on'] = this.established_on;
      data['short_description'] = this.short_description;
      data['long_description'] = this.long_description;
      data['business_owners'] = this.business_owners;
      data['country'] = this.country;
      data['facilities'] = this.facilities;
      data['support_n_training'] = this.support_n_training;
      data['reason_for_selling'] = this.reason_for_selling;
      data['business_website'] = this.business_website;
      data['demographic_information'] = this.demographic_information;
      data['category'] = this.category;
      data['last_updated'] = DateTime.now().millisecondsSinceEpoch;
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + EDIT_POST, headers: headers, body: body);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200) Navigator.pop(context, "updated");
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to fetch posts!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: PreferredSize(
          preferredSize: Size.fromHeight(50),
          child: AppBar(
            brightness: Brightness.light,
            backgroundColor: LIGHT_COLOR,
            iconTheme: IconThemeData(
              color: BLACK,
            ),
            title: Heading("Edit Your Business Details", APP_COLOR),
            centerTitle: true,
          ),
        ),
        body: ScrollableContainer(
          padding: EdgeInsets.only(top: 10, bottom: 10, left: 20, right: 20),
          child: Form(
            key: formKey,
            child: Column(children: <Widget>[
              SimpleInput(
                enabled: enabled,
                initialValue: title,
                placeholder: "Enter Title",
                maxLength: 100,
                onChanged: (val) => setState(() {
                  title = val;
                }),
                validator: (val) => val.isEmpty ? 'Title is required' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: sub_title,
                placeholder: "Enter Sub Title",
                maxLength: 200,
                onChanged: (val) => setState(() {
                  sub_title = val;
                }),
              ),
              MapperDropDown(
                enabled: enabled,
                placeholder: "Select a Category",
                options: options,
                value: category,
                validator: (val) => val == null ? 'Category is required' : null,
                onChanged: (option) => setState(() {
                  category = option['value'];
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: state_city,
                placeholder: "Enter City / State",
                onChanged: (val) => setState(() {
                  state_city = val;
                }),
                validator: (val) =>
                    val.isEmpty ? 'State / City is required' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: price,
                placeholder: "Enter Price",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  price = val;
                }),
                validator: (val) => val.isEmpty ? 'Price is required' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: established_on,
                placeholder: "Enter Establishing Year",
                maxLength: 4,
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  established_on = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: short_description,
                placeholder: "Enter Short Description",
                maxLength: 500,
                onChanged: (val) => setState(() {
                  short_description = val;
                }),
                validator: (val) =>
                    val.isEmpty ? 'Short Description is required' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: long_description,
                placeholder: "Enter Long Description",
                maxLength: 2000,
                onChanged: (val) => setState(() {
                  long_description = val;
                }),
                validator: (val) =>
                    val.isEmpty ? 'Long Description is required' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: business_owners,
                placeholder: "Enter Business Owner(s) Name(s)",
                maxLength: 100,
                onChanged: (val) => setState(() {
                  business_owners = val;
                }),
              ),
              SimpleDropDown(
                enabled: enabled,
                placeholder: "Select a Country",
                options: countryList,
                value: country,
                validator: (val) => val == null ? 'Country is required' : null,
                onChanged: (country) => setState(() {
                  this.country = country;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: facilities,
                placeholder: "Enter Facilities (if any)",
                maxLength: 1500,
                onChanged: (val) => setState(() {
                  facilities = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: support_n_training,
                placeholder:
                    "Provide details for Support & Training you may offer",
                maxLength: 200,
                onChanged: (val) => setState(() {
                  support_n_training = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: reason_for_selling,
                placeholder:
                    "Provide details for Why are you Selling (Optional)",
                maxLength: 200,
                onChanged: (val) => setState(() {
                  reason_for_selling = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: business_website,
                placeholder: "nter Business Website (Optional)",
                maxLength: 100,
                onChanged: (val) => setState(() {
                  business_website = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: demographic_information,
                placeholder: "Enter Demographic Information (Optional)",
                maxLength: 100,
                onChanged: (val) => setState(() {
                  demographic_information = val;
                }),
              ),
              OrangeButton(
                text: "Submit",
                disable: validate(),
                onPressed: () => updatePost(),
              )
            ]),
          ),
        ));
  }
}

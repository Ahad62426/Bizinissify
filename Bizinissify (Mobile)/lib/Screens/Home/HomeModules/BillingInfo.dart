import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/components/OrangeButton.dart';
import 'package:bizinissify/components/ScrollableContainer.dart';
import 'package:bizinissify/components/SimpleInput.dart';
import 'package:bizinissify/models/BillingInfo.dart' as BillingInfoData;
import 'package:flutter/material.dart';

class BillingInfo extends StatefulWidget {
  @override
  _BillingInfoState createState() => _BillingInfoState();
}

class _BillingInfoState extends State<BillingInfo> {
  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  String firstName,
      lastName,
      phoneNumber,
      streetAddress,
      country,
      city,
      zipcode;
  BillingInfoData.BillingInfo billingInfo = new BillingInfoData.BillingInfo(
      "Jawad",
      "Ali",
      "+923158731014",
      "B-465, B-Area, Kalaboard, Malir",
      "Pakistan",
      "Karachi",
      "75080");
  bool enabled = true;

  _BillingInfoState() {
    if (billingInfo != null) {
      firstName = billingInfo.firstName;
      lastName = billingInfo.lastName;
      phoneNumber = billingInfo.phoneNumber;
      streetAddress = billingInfo.streetAddress;
      country = billingInfo.country;
      city = billingInfo.city;
      zipcode = billingInfo.zipcode;
    }
  }

  bool validate() {
    if ((billingInfo != null &&
            formKey.currentState != null &&
            !formKey.currentState.validate()) ||
        (billingInfo == null &&
            (firstName == null ||
                firstName == '' ||
                lastName == null ||
                lastName == '' ||
                phoneNumber == null ||
                phoneNumber == '' ||
                streetAddress == null ||
                streetAddress == '' ||
                country == null ||
                country == '' ||
                city == null ||
                city == '' ||
                zipcode == null ||
                zipcode == '')) ||
        (billingInfo != null &&
            firstName == billingInfo.firstName &&
            lastName == billingInfo.lastName &&
            phoneNumber == billingInfo.phoneNumber &&
            streetAddress == billingInfo.streetAddress &&
            country == billingInfo.country &&
            city == billingInfo.city &&
            zipcode == billingInfo.zipcode)) return true;
    return false;
  }

  int getMinLength(String val) {
    if (val.contains("+")) return 11;
    return 10;
  }

  void submit() {
    if (billingInfo == null)
      print(billingInfo);
    else
      update();
  }

  void update() {
    print(billingInfo.firstName);
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
          title: Heading("Billing Info", APP_COLOR),
          centerTitle: true,
        ),
      ),
      body: ScrollableContainer(
        padding: EdgeInsets.only(top: 10, left: 20, right: 20),
        child: Form(
          key: formKey,
          child: Column(children: <Widget>[
            SimpleInput(
              enabled: enabled,
              initialValue: firstName,
              placeholder: "First Name",
              onChanged: (val) => setState(() {
                firstName = val;
              }),
              validator: (val) =>
              val.isEmpty ? 'Firstname can\'t be blank' : null,
            ),
            SimpleInput(
              enabled: enabled,
              initialValue: lastName,
              placeholder: "Last Name",
              onChanged: (val) => setState(() {
                lastName = val;
              }),
              validator: (val) => val.isEmpty ? 'Lastname can\'t be blank' : null,
            ),
            SimpleInput(
              enabled: enabled,
              initialValue: phoneNumber,
              placeholder: "Phone Number",
              keyboardType: TextInputType.phone,
              maxLength: 14,
              onChanged: (val) => setState(() {
                phoneNumber = val;
              }),
              validator: (val) => val.isEmpty
                  ? 'Phone number can\'t be blank'
                  : val.length < getMinLength(val)
                  ? 'Minimum length is for any International dial is ' +
                  getMinLength(val).toString() +
                  ' digits'
                  : null,
            ),
            SimpleInput(
              enabled: enabled,
              initialValue: streetAddress,
              placeholder: "Street Address",
              maxLength: 50,
              onChanged: (val) => setState(() {
                streetAddress = val;
              }),
              validator: (val) =>
              val.isEmpty ? 'Street address can\'t be blank' : null,
            ),
            SimpleInput(
              enabled: enabled,
              initialValue: country,
              placeholder: "Country",
              onChanged: (val) => setState(() {
                country = val;
              }),
              validator: (val) => val.isEmpty ? 'Country can\'t be blank' : null,
            ),
            SimpleInput(
              enabled: enabled,
              initialValue: city,
              placeholder: "City",
              onChanged: (val) => setState(() {
                city = val;
              }),
              validator: (val) => val.isEmpty ? 'City can\'t be blank' : null,
            ),
            SimpleInput(
              enabled: enabled,
              initialValue: zipcode,
              placeholder: "Zipcode",
              onChanged: (val) => setState(() {
                zipcode = val;
              }),
              validator: (val) => val.isEmpty ? 'Zipcode can\'t be blank' : null,
            ),
            OrangeButton(
              text: "Save Changes",
              disable: validate(),
              onPressed: () => submit(),
            )
          ]),
        ),
      ),
    );
  }
}

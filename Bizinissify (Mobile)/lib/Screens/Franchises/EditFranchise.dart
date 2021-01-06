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

class EditFranchise extends StatefulWidget {
  final Map franchiseToEdit;

  EditFranchise({this.franchiseToEdit});

  @override
  _EditFranchiseState createState() => _EditFranchiseState();
}

class _EditFranchiseState extends State<EditFranchise> {
  GlobalKey<FormState> formKey = new GlobalKey<FormState>();
  String title,
      state_city,
      price,
      capital_required_min,
      capital_required_max,
      liquid_capital,
      net_worth,
      initial_franchise_fee,
      avg_sales,
      company_units,
      existing_units,
      short_description,
      long_description,
      business_owners,
      why_us_title,
      why_us_description,
      offers,
      ideal_candidate,
      history,
      support_n_training,
      country;
  int category;
  bool enabled = true, financing;

  @override
  void initState() {
    super.initState();
    if (widget.franchiseToEdit != null) {
      setState(() {
        this.title = widget.franchiseToEdit['title'];
        this.state_city = widget.franchiseToEdit['state_city'];
        this.price = widget.franchiseToEdit['price'].toString();
        this.capital_required_min =
            widget.franchiseToEdit['capital_required_min'].toString();
        this.capital_required_max =
            widget.franchiseToEdit['capital_required_max'].toString();
        if (widget.franchiseToEdit['liquid_capital'] != null)
          this.liquid_capital =
              widget.franchiseToEdit['liquid_capital'].toString();
        this.net_worth = widget.franchiseToEdit['net_worth'].toString();
        this.financing = widget.franchiseToEdit['financing'] == 1;
        if (widget.franchiseToEdit['initial_franchise_fee'] != null)
          this.initial_franchise_fee =
              widget.franchiseToEdit['initial_franchise_fee'].toString();
        if (widget.franchiseToEdit['avg_sales'] != null)
          this.avg_sales = widget.franchiseToEdit['avg_sales'].toString();
        this.company_units = widget.franchiseToEdit['company_units'].toString();
        this.existing_units =
            widget.franchiseToEdit['existing_units'].toString();
        this.short_description = widget.franchiseToEdit['short_description'];
        this.long_description = widget.franchiseToEdit['long_description'];
        this.business_owners = widget.franchiseToEdit['business_owners'];
        this.why_us_title = widget.franchiseToEdit['why_us_title'];
        this.why_us_description = widget.franchiseToEdit['why_us_description'];
        this.offers = widget.franchiseToEdit['offers'];
        this.ideal_candidate = widget.franchiseToEdit['ideal_candidate'];
        this.history = widget.franchiseToEdit['history'];
        this.support_n_training = widget.franchiseToEdit['support_n_training'];
        this.country = widget.franchiseToEdit['country'];
        this.category = widget.franchiseToEdit['category'];
      });
    }
  }

  bool validate() {
    if (formKey.currentState != null && !formKey.currentState.validate())
      return true;
    return false;
  }

  Future<void> updateFranchise() async {
    try {
      Loader().show(context);

      FirebaseUser user = await Firebase().getFireUser();
      Map<String, String> headers = HEADERS;
      headers["Authorization"] = user.uid.toString();

      Map data = widget.franchiseToEdit;
      data['title'] = this.title;
      data['state_city'] = this.state_city;
      data['price'] = this.price;
      data['capital_required_min'] = this.capital_required_min;
      data['capital_required_max'] = this.capital_required_max;
      data['liquid_capital'] = this.liquid_capital;
      data['net_worth'] = this.net_worth;
      data['financing'] = this.financing;
      data['initial_franchise_fee'] = this.initial_franchise_fee;
      data['avg_sales'] = this.avg_sales;
      data['company_units'] = this.company_units;
      data['existing_units'] = this.existing_units;
      data['short_description'] = this.short_description;
      data['long_description'] = this.long_description;
      data['business_owners'] = this.business_owners;
      data['why_us_title'] = this.why_us_title;
      data['why_us_description'] = this.why_us_description;
      data['offers'] = this.offers;
      data['ideal_candidate'] = this.ideal_candidate;
      data['history'] = this.history;
      data['support_n_training'] = this.support_n_training;
      data['country'] = this.country;
      data['category'] = this.category;
      data['last_updated'] = DateTime.now().millisecondsSinceEpoch;
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + EDIT_FRANCHISE, headers: headers, body: body);
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
            iconTheme: IconThemeData(color: BLACK),
            title: Heading("Edit Your Franchise Details", APP_COLOR),
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
              MapperDropDown(
                enabled: enabled,
                placeholder: "Select a Category",
                options: franchiseOptions,
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
                initialValue: capital_required_min,
                placeholder: "Enter Minimum Capital Required",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  capital_required_min = val;
                }),
                validator: (val) => val.isEmpty
                    ? 'Minimum capital requirement is required'
                    : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: capital_required_max,
                placeholder: "Enter Maximum Capital Required",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  capital_required_max = val;
                }),
                validator: (val) => val.isEmpty
                    ? 'Maximum capital requirement is required'
                    : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: liquid_capital,
                placeholder: "Enter Liquid Capital",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  liquid_capital = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: net_worth,
                placeholder: "Enter Net Worth",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  net_worth = val;
                }),
                validator: (val) =>
                    val.isEmpty ? 'Net worth is required' : null,
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: initial_franchise_fee,
                placeholder: "Enter Initial Franchise Fee",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  initial_franchise_fee = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: avg_sales,
                placeholder: "Enter Average Yearly Sales",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  avg_sales = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: company_units,
                placeholder: "Enter Company Owned Units",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  company_units = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: existing_units,
                placeholder: "Enter Existing Units",
                keyboardType: TextInputType.number,
                onChanged: (val) => setState(() {
                  existing_units = val;
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
                maxLength: 1000,
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
              SimpleInput(
                enabled: enabled,
                initialValue: why_us_description,
                placeholder: "Enter Description For Why Choose You",
                maxLength: 500,
                onChanged: (val) => setState(() {
                  why_us_description = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: offers,
                placeholder: "Enter What Do You Offer",
                maxLength: 1500,
                onChanged: (val) => setState(() {
                  offers = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: ideal_candidate,
                placeholder: "Enter Ideal Candidate Description",
                maxLength: 500,
                onChanged: (val) => setState(() {
                  ideal_candidate = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: history,
                placeholder: "Enter Franchise History",
                maxLength: 2000,
                onChanged: (val) => setState(() {
                  history = val;
                }),
              ),
              SimpleInput(
                enabled: enabled,
                initialValue: support_n_training,
                placeholder:
                    "Provide details for Support & Training you may offer",
                maxLength: 1000,
                onChanged: (val) => setState(() {
                  support_n_training = val;
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
              OrangeButton(
                text: "Submit",
                disable: validate(),
                onPressed: () => updateFranchise(),
              )
            ]),
          ),
        ));
  }
}

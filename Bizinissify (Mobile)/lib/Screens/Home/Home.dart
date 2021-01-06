import 'dart:convert';

import 'package:bizinissify/Components/Heading.dart';
import 'package:bizinissify/Components/Loader.dart';
import 'package:bizinissify/Components/MapperDropDown.dart';
import 'package:bizinissify/Components/OrangeButton.dart';
import 'package:bizinissify/Components/ScrollableContainer.dart';
import 'package:bizinissify/Components/SimpleDropDown.dart';
import 'package:bizinissify/Components/SimpleInput.dart';
import 'package:bizinissify/Components/GreyButton.dart';
import 'package:bizinissify/Helpers/dateTimeHelpers.dart';
import 'package:bizinissify/Screens/Franchises/AddFranchise.dart';
import 'package:bizinissify/Screens/Home/HomeModules/Chats.dart';
import 'package:bizinissify/Screens/Home/HomeModules/Franchises.dart';
import 'package:bizinissify/Screens/Home/HomeModules/Memberships.dart';
import 'package:bizinissify/Screens/Home/HomeModules/OwnListing.dart';
import 'package:bizinissify/Screens/Home/HomeModules/Settings.dart';
import 'package:bizinissify/Screens/Posts/AddPost.dart';
import 'package:bizinissify/screens/Home/HomeModules/BillingInfo.dart';
import 'package:bizinissify/screens/Home/HomeModules/Dashboard.dart';
import 'package:bizinissify/screens/Home/HomeModules/Profile.dart';
import 'package:bizinissify/services/Firebase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/services.dart';
import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Components/Toast.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      getPosts();
    });
    checkToGetProfile();
  }

  FirebaseUser user;
  List<dynamic> postsList = new List<dynamic>(),
      franchisesList = new List<dynamic>();
  String chatID;
  Map sellerDetails = new Map();
  String keyword, state_city, country, time, selected = "business";
  int category, timeStamp;
  Map profile;
  bool enabled = true;

  Firebase _auth = new Firebase();
  int index = 0;
  List<String> titles = ["Dashboard", "Chats", "Settings"];
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  String namedTitle;

  Future<void> getPosts() async {
    try {
      Loader().show(context);
      Response response = await get(BASE_URL + GET_ALL_POSTS);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        setState(() {
          postsList = (json.decode(response.body)['posts']);
        });
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

  Future<void> getfranchises() async {
    try {
      Loader().show(context);
      Response response = await get(BASE_URL + GET_ALL_FRANCHISES);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        setState(() {
          franchisesList = (json.decode(response.body)['franchises']);
        });
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to fetch franchises!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  Future<void> getFilteredPosts(bool modal) async {
    if (modal) Navigator.pop(context);
    FocusScope.of(context).unfocus();
    try {
      Loader().show(context);
      Map<String, String> headers = HEADERS;
      Map data = new Map();
      if (keyword != null && !keyword.isEmpty) data['keyword'] = keyword;
      if (category != null) data['category'] = category;
      if (state_city != null && !state_city.isEmpty)
        data['state_city'] = state_city;
      if (country != null) data['country'] = country;
      if (timeStamp != null) data['timeStamp'] = timeStamp;
      var body = json.encode(data);

      Response response = await post(BASE_URL + GET_FILTERED_POSTS,
          headers: headers, body: body);
      Loader().hide(context);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200)
        setState(() {
          postsList = (json.decode(response.body)['posts']);
        });
      else
        setState(() {
          postsList = [];
        });
    } catch (e) {
      Loader().hide(context);
      CustomToast().show(
        'Unable to fetch filtered posts!',
        'error',
        Toast.LENGTH_SHORT,
      );
      print("error: " + e.toString());
    }
  }

  Future<void> startChat(String id) async {
    try {
      Loader().show(context);
      Map<String, String> headers = HEADERS;
      Map data = {'id': id};
      var body = json.encode(data);
      Response response =
          await post(BASE_URL + GET_POST_DETAILS, headers: headers, body: body);
      if (json.decode(response.body)['msg'] != null) {
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      }
      if (response.statusCode == 200) {
        String chatID =
            buildChatID(json.decode(response.body)['sellerDetails']['email']);
        setState(() {
          this.chatID = chatID;
          this.sellerDetails = (json.decode(response.body)['sellerDetails']);
          this.index = 1;
        });
      }
      Loader().hide(context);
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

  String buildChatID(String sellerEmail) {
    List emails = [user.email.toString(), sellerEmail];
    emails.sort();
    String chatID = emails.join(':');
    return chatID;
  }

  Future<void> checkToGetProfile() async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    if (sp.getString("tempProfile") != null) {
      SharedPreferences sp = await SharedPreferences.getInstance();
      createProfile(json.decode(sp.getString("tempProfile")));
      sp.remove("tempProfile");
    } else
      getProfile();
  }

  Future<void> createProfile(Map tempProfile) async {
    FirebaseUser user = await Firebase().getFireUser();
    tempProfile['id'] = user.uid.toString();
    tempProfile['profileImage'] = "https://firebasestorage.googleapis.com/v0/b/bizinissify-cea9d.appspot.com/o/profile%402x.png?alt=media";
    Map<String, String> headers = HEADERS;
    var body = json.encode(tempProfile);
    headers["Authorization"] = user.uid.toString();

    try {
      Response response = await post(BASE_URL + CREATE_ACCOUNT, headers: headers, body: body);
      if (json.decode(response.body)['msg'] != null &&
          response.statusCode != 200)
        CustomToast().show(
          json.decode(response.body)['msg'],
          response.statusCode == 200 ? 'success' : 'error',
          Toast.LENGTH_SHORT,
        );
      print(json.decode(response.body));
      if (response.statusCode == 200) getProfile();
      else Firebase().delete();
    } catch (e) {
      CustomToast().show(
        'Unable to fetch profile!',
        'error',
        Toast.LENGTH_SHORT,
      );
      Firebase().delete();
      print("error: " + e.toString());
    }
  }

  Future<void> getProfile() async {
    FirebaseUser user = await Firebase().getFireUser();
    setState(() {
      this.user = user;
    });
    Map<String, String> headers = HEADERS;
    headers["Authorization"] = user.uid.toString();

    SharedPreferences sp = await SharedPreferences.getInstance();
    if (sp.getString('profile') == null) {
      try {
        Response response = await get(BASE_URL + GET_PROFILE, headers: headers);
        if (json.decode(response.body)['msg'] != null &&
            response.statusCode != 200)
          CustomToast().show(
            json.decode(response.body)['msg'],
            response.statusCode == 200 ? 'success' : 'error',
            Toast.LENGTH_SHORT,
          );
        if (response.statusCode == 200) {
          sp.setString(
            'profile',
            json.encode(json.decode(response.body)['profile']),
          );
          setState(() {
            this.profile = json.decode(response.body)['profile'];
          });
        } else if (response.statusCode == 401) Firebase().delete();
        else
          Firebase().logout();
      } catch (e) {
        CustomToast().show(
          'Unable to fetch profile!',
          'error',
          Toast.LENGTH_SHORT,
        );
        Firebase().logout();
        print("error: " + e.toString());
      }
    } else {
      setState(() {
        this.profile = json.decode(sp.getString('profile'));
      });
    }
  }

  Widget view() {
    switch (index) {
      case 0:
        return (Stack(
          children: [
            if (selected == "business")
              Dashboard(
                  context,
                  postsList,
                  (val) => {
                        if (val != null && val == 'updated')
                          getPosts()
                        else if (val != null && val != 'updated')
                          startChat(val)
                      }),
            if (selected == "franchise")
              Franchises(
                  context,
                  franchisesList,
                  (val) =>
                      {if (val != null && val == 'updated') getfranchises()}),
            SizedBox(
              height: 40,
              child: Row(
                children: [
                  Expanded(
                    flex: 1,
                    child: Container(
                      alignment: Alignment.center,
                      padding: EdgeInsets.symmetric(vertical: 10),
                      color: MSG_OTHER,
                      child: InkWell(
                        onTap: () => {
                          if (this.postsList == null || this.postsList.isEmpty)
                            getPosts(),
                          setState(() {
                            this.selected = "business";
                          })
                        },
                        child: Text(
                          "Business",
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: this.selected == "business"
                                ? FontWeight.bold
                                : FontWeight.normal,
                            color:
                                this.selected == "business" ? APP_COLOR : BLACK,
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Container(
                      alignment: Alignment.center,
                      padding: EdgeInsets.symmetric(vertical: 10),
                      color: MSG_OTHER,
                      child: InkWell(
                        onTap: () => {
                          if (this.franchisesList == null ||
                              this.franchisesList.isEmpty)
                            getfranchises(),
                          setState(() {
                            this.selected = "franchise";
                          })
                        },
                        child: Text(
                          "Franchises",
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: this.selected == "franchise"
                                ? FontWeight.bold
                                : FontWeight.normal,
                            color: this.selected == "franchise"
                                ? APP_COLOR
                                : BLACK,
                          ),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            )
          ],
        ));
        break;
      case 1:
        return (Chats(
          onSelect: (val) => setState(() {
            namedTitle = val != null ? val : "Unknown";
          }),
          namedTitle: namedTitle,
          chatID: chatID,
          sellerDetails: sellerDetails,
          onChatInitDone: () => setState(() {
            this.chatID = null;
            this.sellerDetails = null;
          }),
        ));
        break;
      case 2:
        return (Settings());
        break;
    }
  }

  void handleTimeChange(time) {
    int timeStamp;
    switch (timesArray.indexOf(time)) {
      case 0:
        timeStamp = getTodayTimeStamp();
        break;
      case 1:
        timeStamp = getCurrentMonthTimeStamp();
        break;
      case 2:
        timeStamp = getCurrentYearTimeStamp();
        break;
    }
    setState(() {
      this.time = time;
      this.timeStamp = timeStamp;
    });
  }

  void resetFilters() {
    Navigator.pop(context);
    setState(() {
      this.keyword = null;
      this.category = null;
      this.state_city = null;
      this.country = null;
      this.time = null;
      this.timeStamp = null;
    });
    if (selected == "business")
      getPosts();
    else
      getfranchises();
  }

  Widget filterDialog() {
    return new Dialog(
      child: ScrollableContainer(
        padding: EdgeInsets.all(20),
        child: Column(children: [
          Text(
            'Filters',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          Container(
            height: 1.0,
            color: BLACK,
            margin: EdgeInsets.symmetric(vertical: 10),
          ),
          SimpleInput(
            enabled: enabled,
            initialValue: keyword,
            placeholder: "City or Keyword",
            onChanged: (val) => setState(() {
              keyword = val;
            }),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              'Select Category',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ),
          MapperDropDown(
            enabled: enabled,
            placeholder: "All Categories",
            options: options,
            value: category,
            onChanged: (option) => setState(() {
              category = option['value'];
            }),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              'Enter State / City',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ),
          SimpleInput(
            enabled: enabled,
            initialValue: state_city,
            placeholder: "Enter State / City",
            onChanged: (val) => setState(() {
              state_city = val;
            }),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              'Select Country',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ),
          SimpleDropDown(
            enabled: enabled,
            placeholder: "Select a Country",
            options: countryList,
            value: country,
            onChanged: (country) => setState(() {
              this.country = country;
            }),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              'Added Time',
              style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
            ),
          ),
          SimpleDropDown(
            enabled: enabled,
            placeholder: "Any Time",
            options: timesArray,
            value: time,
            onChanged: (time) => handleTimeChange(time),
          ),
          OrangeButton(
            disable: false,
            text: "Apply",
            onPressed: () => getFilteredPosts(true),
          ),
          GreyButton(
            expanded: true,
            text: "Reset",
            onPressed: () => resetFilters(),
          )
        ]),
      ),
    );
  }

  List<Widget> appBar() {
    switch (index) {
      case 0:
        return (<Widget>[
          Flexible(
            child: Column(
              children: <Widget>[
                Container(
                  margin: EdgeInsets.only(top: 10, left: 10),
                  height: 40,
                  child: TextFormField(
                    enabled: enabled,
                    initialValue: keyword,
                    onChanged: (val) => setState(() {
                      keyword = val;
                    }),
                    onEditingComplete: () => getFilteredPosts(false),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: WHITE,
                      labelText: "Search",
                      labelStyle: TextStyle(
                        fontSize: 14,
                        color: GREY,
                      ),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(25)),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(color: APP_COLOR, width: 2),
                        borderRadius: BorderRadius.circular(25),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 15),
            child: InkWell(
              onTap: () => showDialog(child: filterDialog(), context: context),
              child: Icon(
                Icons.filter_list,
                color: APP_COLOR,
              ),
            ),
          )
        ]);
        break;
      default:
        break;
    }
  }

  Widget NavDrawer() {
    return Drawer(
      child: ListView(
        children: <Widget>[
          DrawerHeader(
            child: Column(
              children: [
                SizedBox(
                  height: 80,
                  width: 80,
                  child: Container(
                      decoration: BoxDecoration(
                          border: Border.all(
                              color: profile != null &&
                                      profile["profileImage"] != null
                                  ? APP_COLOR
                                  : TRANSPARENT,
                              width: 1),
                          borderRadius: BorderRadius.all(Radius.circular(
                              profile != null && profile["profileImage"] != null
                                  ? 50
                                  : 10)),
                          image: DecorationImage(
                              fit: BoxFit.contain,
                              image: profile != null &&
                                      profile["profileImage"] != null
                                  ? NetworkImage(profile['profileImage'])
                                  : AssetImage('assets/logo/logo.png')))),
                ),
                Container(
                  margin: EdgeInsets.only(top: 15),
                  child: Text(
                    profile != null
                        ? "Welcome " +
                            profile['name'] +
                            " " +
                            profile['lastName']
                        : "Welcome",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                )
              ],
            ),
          ),
          ListTile(
            leading: Icon(Icons.account_circle),
            title: Text('Account Management'),
            onTap: () => {
              Navigator.of(context).pop(),
              Navigator.push(
                  context, MaterialPageRoute(builder: (_) => Profile())),
            },
          ),
          ListTile(
            leading: Icon(Icons.border_color),
            title: Text('Billing Info'),
            onTap: () => {
              Navigator.of(context).pop(),
              Navigator.push(
                  context, MaterialPageRoute(builder: (_) => BillingInfo())),
            },
          ),
          ListTile(
            leading: Icon(Icons.exit_to_app),
            title: Text('Own Listing'),
            onTap: () => {
              Navigator.of(context).pop(),
              Navigator.push(
                  context, MaterialPageRoute(builder: (_) => OwnListing())),
            },
          ),
          ListTile(
            leading: Icon(Icons.account_balance_wallet),
            title: Text('MemberShips'),
            onTap: () => {
              Navigator.of(context).pop(),
              Navigator.push(
                  context, MaterialPageRoute(builder: (_) => Memberships())),
            },
          ),
          ListTile(
              leading: Icon(Icons.power_settings_new),
              title: Text('Logout'),
              onTap: () async {
                await _auth.logout();
              }),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    bool keyboardIsOpened = MediaQuery.of(context).viewInsets.bottom != 0.0;
    return Scaffold(
      key: _scaffoldKey,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(60),
        child: AppBar(
          brightness: Brightness.light,
          backgroundColor: LIGHT_COLOR,
          leading: namedTitle != null
              ? BackButton(color: BLACK)
              : IconButton(icon: Icon(null), onPressed: () {  },),
          title: Heading(
              namedTitle != null ? namedTitle : titles[index], APP_COLOR),
          centerTitle: true,
          actions: appBar(),
        ),
      ),
      drawer: NavDrawer(),
      body: view(),
      floatingActionButton: keyboardIsOpened
          ? null
          : new FloatingActionButton(
              onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        selected == "business" ? AddPost() : AddFranchise()),
              ).then((val) {
                if (val != null && (val == 'added')) {
                  if (selected == "business")
                    getPosts();
                  else
                    getfranchises();
                }
                ;
              }),
              tooltip: 'Increment',
              backgroundColor: BUTTON_COLOR,
              child: new Icon(Icons.add),
              elevation: 7,
            ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        notchMargin: 7,
        shape: CircularNotchedRectangle(),
        child: new Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            IconButton(
              icon: Icon(Icons.menu),
              color: BLACK,
              onPressed: () => _scaffoldKey.currentState.openDrawer(),
            ),
            IconButton(
              icon: Icon(Icons.search),
              color: this.index == 0 ? APP_COLOR : BLACK,
              onPressed: () {
                setState(() {
                  this.namedTitle = null;
                  this.index = 0;
                });
              },
            ),
            IconButton(icon: Icon(null), onPressed: () {  },),
            IconButton(
              icon: Icon(Icons.message),
              color: this.index == 1 ? APP_COLOR : BLACK,
              onPressed: () {
                setState(() {
                  this.namedTitle = null;
                  this.index = 1;
                });
              },
            ),
            IconButton(
              icon: Icon(Icons.settings),
              color: this.index == 2 ? APP_COLOR : BLACK,
              onPressed: () {
                setState(() {
                  this.namedTitle = null;
                  this.index = 2;
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

import 'package:bizinissify/Screens/Posts/PostDetails.dart';
import 'package:flutter/material.dart';
import 'package:bizinissify/Constants/Constant.dart';

typedef StringToVoidFunc = void Function(String);

class Dashboard extends StatelessWidget {
  List<dynamic> postsList = new List<dynamic>();
  StringToVoidFunc onUpdate;
  BuildContext context;
  double marginTop;

  Dashboard(this.context, this.postsList, this.onUpdate, [this.marginTop]);

  void showPostDetails(id) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => PostDetails(id: id)),
    ).then((val) {
      onUpdate(val);
    });
  }

  List<Widget> renderPostList() {
    return postsList
        .map((doc) => RaisedButton(
      shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10)),
      onPressed: () => showPostDetails(doc['id']),
      elevation: 3,
      color: WHITE,
      padding: EdgeInsets.symmetric(vertical: 15, horizontal: 15),
      child: Column(
        children: [
          Flexible(
            child: Container(
              height: 100,
              width: 100,
              margin: EdgeInsets.only(bottom: 10),
              decoration: BoxDecoration(
                borderRadius: new BorderRadius.all(Radius.circular(10)),
                image: DecorationImage(
                  fit: BoxFit.fill,
                  image: NetworkImage(doc['image_url']),
                ),
              ),
            ),
          ),
          Container(
            alignment: Alignment.topLeft,
            child: Text(
              doc['title'],
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14),
            ),
          ),
          Container(
            alignment: Alignment.topLeft,
            margin: EdgeInsets.only(top: 5),
            child: Text(
              doc['short_description'],
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  color: BUTTON_COLOR,
                  fontWeight: FontWeight.bold,
                  fontSize: 10),
            ),
          ),
          Container(
            height: 1.0,
            color: BLACK,
            margin: EdgeInsets.symmetric(vertical: 10),
          ),
          Row(
            children: [
              Expanded(
                child: Column(
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.only(top: 2),
                      alignment: Alignment.topLeft,
                      child: Text(
                        'Location:',
                        style: TextStyle(
                          color: GREY,
                          fontSize: 11,
                        ),
                      ),
                    ),
                    Container(
                      alignment: Alignment.topLeft,
                      child: Text(
                        doc['state_city'],
                        maxLines: 1,
                        style: TextStyle(
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.symmetric(horizontal: 5),
              ),
              Expanded(
                child: Column(
                  children: <Widget>[
                    Container(
                      margin: EdgeInsets.only(top: 2),
                      alignment: Alignment.topLeft,
                      child: Text(
                        'Cost Required:',
                        style: TextStyle(
                          color: GREY,
                          fontSize: 11,
                        ),
                      ),
                    ),
                    Container(
                      alignment: Alignment.topLeft,
                      child: Text(
                        '\$ ' + doc['price'].toString(),
                        maxLines: 1,
                        style: TextStyle(
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          )
        ],
      ),
    ))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(top: marginTop != null ? marginTop : 40),
        child: GridView.count(
            padding: EdgeInsets.all(10),
            crossAxisCount: 2,
            childAspectRatio: 0.8,
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            children: renderPostList()
        ));
  }
}

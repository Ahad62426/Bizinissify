import 'package:bizinissify/Screens/Franchises/FranchiseDetails.dart';
import 'package:flutter/material.dart';
import 'package:bizinissify/Constants/Constant.dart';

typedef StringToVoidFunc = void Function(String);

class Franchises extends StatelessWidget {
  List<dynamic> franchisesList = new List<dynamic>();
  StringToVoidFunc onUpdate;
  BuildContext context;

  Franchises(this.context, this.franchisesList, this.onUpdate);

  void showFranchiseDetails(id) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => FranchiseDetails(id: id)),
    ).then((val) {
      onUpdate(val);
    });
  }

  List<Widget> renderFranchiseList() {
    return franchisesList
        .map((doc) => RaisedButton(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              onPressed: () => showFranchiseDetails(doc['id']),
              elevation: 10,
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
        margin: EdgeInsets.only(top: 40),
        child: GridView.count(
            padding: EdgeInsets.all(10),
            crossAxisCount: 2,
            childAspectRatio: 0.8,
            mainAxisSpacing: 10,
            crossAxisSpacing: 10,
            children: renderFranchiseList()));
  }
}

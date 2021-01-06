import 'package:bizinissify/Constants/Constant.dart';
import 'package:bizinissify/Screens/Home/HomeModules/MessagesModules/Chat.dart';
import 'package:bizinissify/Screens/Home/HomeModules/MessagesModules/SelectedChat.dart';
import 'package:bizinissify/Services/Firebase.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

typedef StringToVoidFunc = void Function(String);

class Chats extends StatefulWidget {
  StringToVoidFunc onSelect;
  VoidCallback onChatInitDone;
  String namedTitle, chatID;
  Map sellerDetails = new Map();
  Chats(
      {this.onSelect,
      this.namedTitle,
      this.chatID,
      this.sellerDetails,
      this.onChatInitDone});

  @override
  _ChatsState createState() =>
      _ChatsState(onSelect, null, chatID, sellerDetails);
}

class _ChatsState extends State<Chats> {
  final Firestore _db = Firestore.instance;
  FirebaseUser user;
  String email, typedMessage, selectedChatId;
  StringToVoidFunc onSelect;
  String chatID;
  Map sellerDetails = new Map();
  int namedIndex;

  ScrollController scrollController = ScrollController();

  _ChatsState(this.onSelect, this.selectedChatId,
      [this.chatID, this.sellerDetails]);

  @override
  void initState() {
    super.initState();
    setEmail();
    Future.delayed(Duration.zero, () {
      if (widget.chatID != null) {
        chatexists(widget.chatID).then((userExists) => {
              if (!userExists) startNewChat()
              else
                {
                  onSelect(
                      sellerDetails['name'] + ' ' + sellerDetails['lastName']),
                  selectedChatId = chatID,
                }
            });
        widget.onChatInitDone();
      }
    });
  }

  Future<bool> chatexists(chatID) async {
    return _db
        .collection('chats')
        .document(chatID)
        .get()
        .then((value) => value.exists);
  }

  void startNewChat() async {
    _db.collection('chats').document(chatID).setData({
      'lastUpdated': DateTime.now().millisecondsSinceEpoch,
      'messages': [
        {
          'message': 'Hi ${sellerDetails['name']}',
          'sender': email,
          'timeStamp': DateTime.now().millisecondsSinceEpoch,
        }
      ],
      'userSNames': [user.displayName, '${sellerDetails['name']} ${sellerDetails['lastName']}'],
      'users': [user.email, sellerDetails['email']],
    }).then((val) => {
          onSelect(sellerDetails['name'] + ' ' + sellerDetails['lastName']),
          selectedChatId = chatID,
        });
  }

  Future<void> setEmail() async {
    FirebaseUser user = await Firebase().getFireUser();
    setState(() => {
      this.user = user,
      this.email = user.email
    });
  }

  DocumentSnapshot getSelectedChatById(List<DocumentSnapshot> list) {
    List selected =
        list.where((list) => list.documentID == selectedChatId).toList();
    if (selected.length == 1)
      return selected[0];
    else {
      selectedChatId = null;
      return null;
    }
  }

  void sendMessage() {
    if (typedMessage != null && !typedMessage.replaceAll(' ', '').isEmpty) {
      _db.collection('chats').document(selectedChatId).updateData({
        'messages': FieldValue.arrayUnion([
          {
            'message': typedMessage,
            'sender': email,
            'timeStamp': DateTime.now().millisecondsSinceEpoch,
          }
        ]),
        'lastUpdated': DateTime.now().millisecondsSinceEpoch
      });
      setState(() {
        typedMessage = null;
      });
    } else
      print("No Message to send");
  }

  Future<bool> _onBackPress() {
    if (selectedChatId != null) {
      onSelect(null);
      selectedChatId = null;
      typedMessage = null;
      return Future.value(false);
    } else
      return Future.value(true);
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onBackPress,
      child: Container(
        color: WHITE,
        child: StreamBuilder<QuerySnapshot>(
          stream: _db
              .collection('chats')
              .where('users', arrayContains: email)
              .snapshots(),
          builder: (context, snapshot) {
            if (!snapshot.hasData)
              return Center(
                child: Text("Chats Not Initialized!"),
              );
            List<DocumentSnapshot> docs = snapshot.data.documents;
            docs.sort((a, b) =>
                b.data['lastUpdated'].compareTo(a.data['lastUpdated']));
            List<Widget> chatsList = docs
                .map((doc) => Chat(
                    doc.data,
                    email,
                    () => {
                          namedIndex = doc.data['users'].indexOf(email),
                          onSelect(
                              doc.data['userSNames'][namedIndex == 0 ? 1 : 0]),
                          selectedChatId = doc.documentID
                        }))
                .toList();
            return selectedChatId != null &&
                    widget.namedTitle != null &&
                    getSelectedChatById(docs) != null
                ? SelectedChat(
                    getSelectedChatById(docs).data['messages'],
                    email,
                    typedMessage,
                    scrollController,
                    (val) => typedMessage = val,
                    () => sendMessage(),
                  )
                : Container(
                    margin: EdgeInsets.only(bottom: 15),
                    child: ListView(children: chatsList),
                  );
          },
        ),
      ),
    );
  }
}

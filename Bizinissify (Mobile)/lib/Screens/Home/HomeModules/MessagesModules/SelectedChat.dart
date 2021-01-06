import 'package:bizinissify/Components/OrangeButton.dart';
import 'package:bizinissify/Components/SimpleInput.dart';
import 'package:bizinissify/Screens/Home/HomeModules/MessagesModules/Message.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

typedef StringToVoidFunc = void Function(String);

class SelectedChat extends StatelessWidget {
  String ownEmail, typedMessage;
  StringToVoidFunc onChanged;
  VoidCallback onSubmit;
  List messages;
  ScrollController _scrollController;

  SelectedChat(this.messages, this.ownEmail, this.typedMessage,
      this._scrollController, this.onChanged, this.onSubmit) {
    this
        .messages
        .sort((a, b) => b['timeStamp'].compareTo(a['timeStamp']));
  }

  List<Widget> messagesList() {
    return this
        .messages
        .map((data) => Message(
        data['message'],
        data['sender'],
        ownEmail,
        DateFormat.yMMMd().add_jm().format(DateTime.fromMillisecondsSinceEpoch(data['timeStamp']))
    ))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Expanded(
          flex: 1,
          child: ListView(
              controller: _scrollController,
              reverse: true,
              shrinkWrap: true,
              children: messagesList())),
      Container(
        margin: EdgeInsets.symmetric(horizontal: 10),
        child: Row(
          children: [
            Expanded(
              child: SimpleInput(
                enabled: true,
                initialValue: typedMessage,
                placeholder: "Type message here . . .",
                onChanged: onChanged,
              ),
            ),
            Container(
              margin: EdgeInsets.only(left: 10),
              child: OrangeButton(
                text: "Send",
                expanded: false,
                disable: false,
                onPressed: onSubmit,
              ),
            )
          ],
        ),
      ),
    ]);
  }
}

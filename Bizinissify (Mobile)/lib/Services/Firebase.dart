import 'package:bizinissify/models/User.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Firebase {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Stream<User> get user {
    return _auth.onAuthStateChanged.map(getCurrentUser);
  }

  Future<FirebaseUser> getFireUser() {
    return _auth.currentUser();
  }

  User getCurrentUser(FirebaseUser user) {
    return user != null ? User(user.uid, user.displayName, user.email) : null;
  }

  Future register(String name, String email, String pass) async {
    await _auth.createUserWithEmailAndPassword(email: email, password: pass);
    UserUpdateInfo updateInfo = UserUpdateInfo();
    updateInfo.displayName = name;
  }

  Future login(String email, String pass) async {
    await _auth.signInWithEmailAndPassword(email: email, password: pass);
  }

  Future logout() async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.remove('profile');
    return await _auth.signOut();
  }

  delete() async {
    FirebaseUser currentUser = await _auth.currentUser();
    if (currentUser != null) currentUser.delete();
  }
}

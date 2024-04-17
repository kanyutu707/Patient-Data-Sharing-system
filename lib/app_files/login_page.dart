import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:patient/app_files/Database/database_user.dart';
import 'package:patient/app_files/Registration_Page.dart';
import 'package:patient/app_files/emergencies.dart';
import 'package:patient/app_files/indexPage.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(const login_page());
}

class login_page extends StatefulWidget {
  const login_page({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<login_page> {
  final TextEditingController userEmailController = TextEditingController();
  final TextEditingController userPasswordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  Future<void> loginUser() async {
    try {
      var response = await http.post(
        Uri.parse("http://10.0.2.2:8080/backend/login"),
        headers: <String, String>{"Content-Type": "application/json"},
        body: jsonEncode(<String, String>{
          "role": "Patient",
          "password": userPasswordController.text,
          "email": userEmailController.text,
        }),
      );
      if (response.statusCode == 200) {
        Map<String, dynamic> responseBodyMap = jsonDecode(response.body);
        String? token = responseBodyMap['token'] as String?;
        String? email = responseBodyMap['email'] as String?;
        final SharedPreferences prefs = await SharedPreferences.getInstance();
        prefs.setString('email', email ?? '');
        prefs.setString('token', token ?? '');
        Navigator.of(context).push(MaterialPageRoute(
          builder: (context) => const indexPage(),
        ));
      } else {
        print("${response.statusCode} Data Not submitted");
      }
    } catch (e) {
      print('Error fetching user data: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
        backgroundColor: Colors.blue,
      ),
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              Container(
                height: 600,
                margin: EdgeInsets.only(top: 60, left: 10, right: 10),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(14)),
                ),
                width: MediaQuery.of(context).size.width,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      SizedBox(
                        height: 50,
                      ),
                      Text(
                        "LOGIN",
                        style: TextStyle(
                          fontSize: 47,
                        ),
                      ),
                      SizedBox(
                        height: 30,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Email",
                          style: TextStyle(
                            fontSize: 40,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userEmailController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.email),
                          hintText: "EMAIL",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please enter your email';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Password",
                          style: TextStyle(
                            fontSize: 40,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userPasswordController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.lock),
                          hintText: "PASSWORD",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        obscureText: true,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please enter your password';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            loginUser();
                          }
                        },
                        child: Text('Login'),
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Center(
                        child: InkWell(
                          onTap: () {
                            Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => const Registration_Page(),
                            ));
                          },
                          child: Text(
                            "Don't Have an Account?",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Colors.blue,
                            ),
                          ),
                        ),
                      ),
                        SizedBox(
                        height: 10,
                      ),
                      Center(
                        child: InkWell(
                          onTap: () {
                            Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => const Emergencies(),
                            ));
                          },
                          child: Text(
                            "Emergency?",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                              color: Colors.red,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

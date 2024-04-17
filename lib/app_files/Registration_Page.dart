import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:patient/app_files/login_page.dart';

void main() {
  runApp(const Registration_Page());
}

File? _image;

class Registration_Page extends StatefulWidget {
  const Registration_Page({Key? key}) : super(key: key);

  @override
  _Registration_PageState createState() => _Registration_PageState();
}

class _Registration_PageState extends State<Registration_Page> {
  final TextEditingController userEmailController = TextEditingController();
  final TextEditingController userPasswordController = TextEditingController();
  final TextEditingController userFirstNameController = TextEditingController();
  final TextEditingController userLastNameController = TextEditingController();
  final TextEditingController userDateOfBirthController =
      TextEditingController();
  final TextEditingController userGenderController = TextEditingController();
  final TextEditingController userFacilityController = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    userEmailController.dispose();
    userPasswordController.dispose();
  }

  final _formKey = GlobalKey<FormState>();

  Future<void> _openCamera(BuildContext context) async {
    final picker = ImagePicker();
    final pickedFile = await picker.getImage(source: ImageSource.camera);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });
    } else {
      print('No image selected.');
    }
  }

  Future<void> postUser() async {
    var response = await http.post(
      Uri.parse("http://10.0.2.2:8080/backend/register"),
      headers: <String, String>{"Content-Type": "application/json"},
      body: jsonEncode(<String, String>{
        "user_DOB": userDateOfBirthController.text,
        "role": "Patient",
        "password": userPasswordController.text,
        "first_Name": userFirstNameController.text,
        "last_Name": userLastNameController.text,
        "email": userEmailController.text,
        "user_Gender": userGenderController.text,
        "facility_of_choice": userFacilityController.text
      }),
    );
    if (response.statusCode == 200) {
      print("Data submitted successfully");
    } else {
      print("${response.statusCode} Data Not submitted");
    }
  }

  Future<void> uploadImage(String email, File file) async {
    try {
      final initialUrl =
          Uri.parse('http://10.0.2.2:9020/upload_image?email=$email');
      var url = initialUrl;
      while (true) {
        var request = http.MultipartRequest('POST', url);

        request.files.add(
          await http.MultipartFile.fromPath('uploaded_file', file.path),
        );

        var response = await request.send();
        if (response.statusCode == 200) {
          print("Image uploaded successfully");
          break;
        } else if (response.statusCode == 307) {
          var redirectUrl = response.headers['location'];
          if (redirectUrl == null) {
            print("Redirection failed: No 'Location' header in response.");
            break;
          }

          url = Uri.parse(redirectUrl);
          print("Following redirection to: $url");
        } else {
          print("Image upload failed with status code: ${response.statusCode}");

          print(await response.stream.bytesToString());
          break;
        }
      }
    } catch (e) {
      print("Error uploading image: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Up'),
        backgroundColor: Colors.blue,
      ),
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(top: 10, left: 3, right: 3),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(14)),
                ),
                width: MediaQuery.of(context).size.width,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      SizedBox(height: 14),
                      Text(
                        "SIGN UP",
                        style: TextStyle(
                          fontSize: 32,
                        ),
                      ),
                      SizedBox(height: 15),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Email",
                          style: TextStyle(
                            fontSize: 24,
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
                        height: 7,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "First Name",
                          style: TextStyle(
                            fontSize: 24,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userFirstNameController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.person),
                          hintText: "FIRST NAME",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please enter your First Name';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Second Name",
                          style: TextStyle(
                            fontSize: 24,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userLastNameController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.person_2),
                          hintText: "Second Name",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please enter your Second Name';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Gender",
                          style: TextStyle(
                            fontSize: 24,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userGenderController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.person_2_rounded),
                          hintText: "Gender",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please input your Gender';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Gender",
                          style: TextStyle(
                            fontSize: 24,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userFacilityController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.local_hospital),
                          hintText: "Facility Of Choice",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please input your Facility of choice';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Date Of Birth",
                          style: TextStyle(
                            fontSize: 24,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userDateOfBirthController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.celebration),
                          hintText: "Date Of Birth",
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(
                              Radius.circular(10),
                            ),
                          ),
                        ),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Please enter your date of birth';
                          }
                          return null;
                        },
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Align(
                        alignment: Alignment.topLeft,
                        child: Text(
                          "Password",
                          style: TextStyle(
                            fontSize: 14,
                          ),
                        ),
                      ),
                      TextFormField(
                        controller: userPasswordController,
                        decoration: InputDecoration(
                          prefixIcon: Icon(Icons.lock),
                          hintText: "Password",
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

                      SizedBox(height: 10),
                      GestureDetector(
                        onTap: () {
                          _openCamera(context);
                        },
                        child: Container(
                          padding: EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Row(
                            children: [
                              Icon(Icons.camera_alt),
                              SizedBox(width: 10),
                              Text('Take a photo'),
                            ],
                          ),
                        ),
                      ),
                      SizedBox(height: 10),
                      // Display the selected image if available
                      _image != null ? Image.file(_image!) : Container(),

                      SizedBox(height: 10),
                      ElevatedButton(
                        onPressed: () async {
                          if (_formKey.currentState!.validate()) {
                            await postUser();
                            if (_image != null) {
                              await uploadImage(
                                  userEmailController.text, _image!);
                            }
                            Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => const login_page(),
                            ));
                          }
                        },
                        child: Text('SIGN UP'),
                      ),
                      SizedBox(height: 14),
                      Center(
                        child: InkWell(
                          onTap: () {
                            // Handle navigation to sign up page
                            Navigator.of(context).push(MaterialPageRoute(
                              builder: (context) => const login_page(),
                            ));
                          },
                          child: Text(
                            "Do you have an account?",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                              color: Colors.blue,
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

import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:patient/app_files/Data_Transfer.dart';
import 'package:patient/app_files/Database/database_user.dart';
import 'package:patient/app_files/Facility_Page.dart';
import 'package:patient/app_files/treatment.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

Future<List<SysUser>> authUser() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();

  final Uri url = Uri.parse("http://10.0.2.2:8080/backend/Get_All_Users");
  final response = await http.get(
    url,
    headers: {
      HttpHeaders.authorizationHeader:
          "Bearer ${prefs.getString('token') ?? ''}",
    },
  );

  print(response.body);

  final List<dynamic> list = json.decode(response.body);
  return list.map((e) => SysUser.fromJson(e)).toList();
}

class indexPage extends StatefulWidget {
  const indexPage({Key? key}) : super(key: key);

  @override
  _IndexPageState createState() => _IndexPageState();
}

class _IndexPageState extends State<indexPage> {
  late Future<SysUser> _userDataFuture;
  late String userFacility = '';
  late String userName = '';
  late String userId = '';
  bool _isLoading = true; // Add a loading state

  @override
  void initState() {
    super.initState();
    _fetchUserData();
  }

  Future<void> _fetchUserData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    
    final List<SysUser> users = await authUser();
    final userEmail = prefs.getString('email')??'';

    final user = users.firstWhere((user) => user.email == userEmail);
    setState(() {
      userFacility = user.facility_of_choice!;
      userName = '${user.first_Name} ${user.last_Name}';
      userId= user.user_Id!;
      _userDataFuture = Future.value(user); // Assign value to _userDataFuture
      _isLoading = false; 
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home"),
        backgroundColor: Colors.blue,
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : FutureBuilder<SysUser>(
              future: _userDataFuture,
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  return _buildUserDataUI(snapshot.data!);
                } else {
                  return Center(
                    child: Text('No data available'),
                  );
                }
              },
            ),
    );
  }

  Widget _buildUserDataUI(SysUser user) {
    var screenSize = MediaQuery.of(context).size;
    return SingleChildScrollView(
      child: Container(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              height: screenSize.height / 3,
              width: double.infinity,
              child: Image.network(
                'https://images.all-free-download.com/images/graphiclarge/big_ben_clockface_192640.jpg',
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Personal Info',
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Column(
                    children: [
                      Card(
                        child: ListTile(
                          title: const Text('Name'),
                          subtitle: Text(userName),
                        ),
                      ),
                      Card(
                        child: ListTile(
                          title: const Text('PATIENT ID'),
                          subtitle: Text(userId),
                        ),
                      ),
                      Card(
                        child: ListTile(
                          title: const Text('Facility Of Choice'),
                          subtitle: Text(userFacility),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Container(
              width: MediaQuery.of(context).size.width,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  SizedBox(
                    width: 125,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () {
                        print("View Records");
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => const Treatment(),
                        ));
                      },
                      child: const Text('View Records'),
                    ),
                  ),
                  SizedBox(
                    width: 125,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () {
                        print("Transfer Data");
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => const Data_Transfer(),
                        ));
                      },
                      child: const Text('Transfer Data'),
                    ),
                  ),
                  SizedBox(
                    width: 125,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () {
                        print("Change Facility");
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => const Facility_Page(),
                        ));
                      },
                      child: const Text('Change Facility'),
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:patient/app_files/Database/RegistrationDetail.dart';
import 'package:patient/app_files/bottom_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

var email = '';

Future<List<RegistrationDetail>> fetchRegistration() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  email = prefs.getString('email')!;
  final response = await http.get(
    Uri.parse('http://10.0.2.2:8080/backend/Get_All_Registrations'),
    headers: {
      HttpHeaders.authorizationHeader:
          "Bearer ${prefs.getString('token') ?? ''}",
    },
  );

  if (response.statusCode == 200) {
    print('Response body: ${response.body}');
    try {
      List<dynamic> jsonResponse = jsonDecode(response.body);
      if (jsonResponse.isNotEmpty) {
        List<RegistrationDetail> registrations = jsonResponse
            .map((json) => RegistrationDetail.fromJson(json))
            .toList();
        return registrations;
      } else {
        throw Exception('Empty response: No data available');
      }
    } catch (e) {
      print('Error decoding JSON: $e');
      throw Exception('Failed to decode JSON');
    }
  } else {
    throw Exception('Failed to load data: ${response.statusCode}');
  }
}

Future<void> updateRegistration(String reg_to_update) async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  String? updateEmail = prefs.getString('email');

  if (reg_to_update == null) {
    print("Email not found in SharedPreferences");
    return;
  }

  var url = Uri.parse("http://10.0.2.2:8080/backend/update_registration");

  url = Uri.http(url.authority, url.path, {"Registration_Id": reg_to_update});

  var response = await http.put(
    url,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      HttpHeaders.authorizationHeader:
          "Bearer ${prefs.getString('token') ?? ''}",
    },
    body: jsonEncode(<String, bool>{
      "approval_status": true,
    }),
  );

  if (response.statusCode == 200) {
    print("Data submitted successfully");
  } else {
    print("${response.statusCode} Data Not submitted");
  }
}

void main() {
  runApp(const Data_Transfer());
}

class Data_Transfer extends StatefulWidget {
  const Data_Transfer({Key? key}) : super(key: key);

  @override
  State<Data_Transfer> createState() => _DataTransferState();
}

class _DataTransferState extends State<Data_Transfer> {
  late Future<List<RegistrationDetail>> futureRegistration;
  TextEditingController searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    futureRegistration = fetchRegistration();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const bottom_bar()),
              );
            },
            icon: const Icon(Icons.arrow_back),
          ),
          title: const Text(
            "Registration",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 30,
              wordSpacing: 10,
              color: Colors.white,
            ),
          ),
          backgroundColor: Colors.blue,
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: searchController,
                decoration: const InputDecoration(
                  labelText: 'Search',
                  prefixIcon: Icon(Icons.search),
                  border: OutlineInputBorder(),
                ),
                onChanged: (value) {
                  setState(() {
                    // Implement search logic based on your needs
                    futureRegistration = fetchRegistration().then(
                      (registrations) => registrations.where(
                        (registration) => registration.registrationId
                            !.toLowerCase()
                            .contains(value.toLowerCase()),
                      ).toList(),
                    );
                  });
                },
              ),
            ),
            Expanded(
              child: FutureBuilder<List<RegistrationDetail>>(
                future: futureRegistration,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (snapshot.hasData) {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (BuildContext context, int index) {
                        final registration = snapshot.data![index];
                        return ListTile(
                          title: Text(registration.registrationType ?? ''),
                          subtitle: Text(registration.registrationDate.toString() ?? ''),
                          leading: const Icon(Icons.person_outline_rounded),
                          trailing: const Icon(Icons.select_all_rounded),
                          onTap: () {
                            updateRegistration(registration.registrationId!);
                            debugPrint(
                              'Facility ${registration.registrationId} ${registration.registrationType}',
                            );
                          },
                        );
                      },
                    );
                  } else {
                    return const Center(child: Text('No data available'));
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}

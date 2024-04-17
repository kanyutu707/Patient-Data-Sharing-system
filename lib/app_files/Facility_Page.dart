import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:patient/app_files/Database/database_facilities.dart';
import 'package:patient/app_files/bottom_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<List<FacilityDetail>> fetchFacility() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final response = await http.get(
    Uri.parse('http://10.0.2.2:8080/backend/Get_All_Facilities'),
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
        List<FacilityDetail> facility =
            jsonResponse.map((json) => FacilityDetail.fromJson(json)).toList();
        return facility;
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

Future<void> updateUser(String updateFacility) async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  String? updateEmail = prefs.getString('email');

  if (updateEmail == null) {
    print("Email not found in SharedPreferences");
    return;
  }

  var url = Uri.parse("http://10.0.2.2:8080/backend/update_User");

  url = Uri.http(url.authority, url.path, {"user_email": updateEmail});

  var response = await http.put(
    url,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      HttpHeaders.authorizationHeader:
          "Bearer ${prefs.getString('token') ?? ''}",
    },
    body: jsonEncode(<String, String>{
      "facility_of_choice": updateFacility,
    }),
  );

  if (response.statusCode == 200) {
    print("Data submitted successfully");
  } else {
    print("${response.statusCode} Data Not submitted");
  }
}

void main() {
  runApp(const Facility_Page());
}

class Facility_Page extends StatefulWidget {
  const Facility_Page({Key? key}) : super(key: key);

  @override
  State<Facility_Page> createState() => _Facility_PageState();
}

class _Facility_PageState extends State<Facility_Page> {
  late Future<List<FacilityDetail>> futureFacilityDetail;
  TextEditingController searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    futureFacilityDetail = fetchFacility();
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
              icon: const Icon(Icons.arrow_back)),
          title: const Text(
            "FacilityDetail",
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
                    futureFacilityDetail = fetchFacility().then(
                        (FacilityDetail) => FacilityDetail.where(
                            (FacilityDetail) => FacilityDetail.facilityName!
                                .toLowerCase()
                                .contains(value.toLowerCase())).toList());
                  });
                },
              ),
            ),
            Expanded(
              child: FutureBuilder<List<FacilityDetail>>(
                future: futureFacilityDetail,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (snapshot.hasData) {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (BuildContext context, int index) {
                        final FacilityDetail = snapshot.data![index];
                        return Card(
                          child: ListTile(
                            title: Text(FacilityDetail.facilityName!),
                            subtitle: Text(FacilityDetail.facilityId!.toString()),
                            leading: const Icon(Icons.person_outline_rounded),
                            trailing: const Icon(Icons.select_all_rounded),
                            onTap: () {
                              updateUser(FacilityDetail.facilityName!);
                              debugPrint(
                                  'Facility ${(FacilityDetail.facilityId)}' +
                                      '${FacilityDetail.facilityName}');
                            },
                          ),
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

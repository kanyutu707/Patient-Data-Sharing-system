import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:patient/app_files/Database/database_facilities.dart';
import 'package:patient/app_files/Database/database_diagnosis.dart';
import 'package:patient/app_files/bottom_bar.dart';
import 'package:patient/app_files/specific_diagnosis.dart';
import 'package:shared_preferences/shared_preferences.dart';

var email = '';
Future<http.Response> updateFacility(String newFacility) async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  return http.put(
    Uri.parse(
        'http://10.0.2.2:8080/backend/update_patient/17986932-cc13-4753-a0ea-c536bdfa8309'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      HttpHeaders.authorizationHeader:
          "Bearer ${prefs.getString('token') ?? ''}",
    },
    body: jsonEncode(<String, String>{
      'facility_Of_Choice': newFacility,
    }),
  );
}

Future<List<Diagnosis>> fetchDiagnosis() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  email = prefs.getString('email')!;
  final response = await http.get(
    Uri.parse('http://10.0.2.2:8080/backend/Get_All_Diagnosis'),
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
        List<Diagnosis> diagnosis =
            jsonResponse.map((json) => Diagnosis.fromJson(json)).toList();
        return diagnosis;
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

void main() {
  runApp(const Treatment());
}

class Treatment extends StatefulWidget {
  const Treatment({super.key});

  @override
  State<Treatment> createState() => _TreatmentState();
}

class _TreatmentState extends State<Treatment> {
  late Future<List<Diagnosis>> futureDiagnosis;

  TextEditingController searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    futureDiagnosis = fetchDiagnosis();
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
                      futureDiagnosis = fetchDiagnosis().then((Diagnosis) =>
                          Diagnosis.where((Diagnosis) => Diagnosis.diagnosisName
                              .toLowerCase()
                              .contains(value.toLowerCase())).toList());
                    });
                  },
                ),
              ),
              Expanded(
                child: FutureBuilder<List<Diagnosis>>(
                  future: futureDiagnosis,
                  builder: (context, snapshot) {
                    String diagnosisName = '';
                    String diagnosisId = '';
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else if (snapshot.hasData) {
                      print("Email from outside " + email);
                      return ListView.builder(
                        itemCount: snapshot.data!.length,
                        itemBuilder: (BuildContext context, int index) {
                          var diagnosed = snapshot.data![index];
                          String diagnosisName = '';
                          String facility_name = '';
                          String diagnosisId = '';

                          for (var registrations
                              in diagnosed.registrationDetails) {
                            for (var users in registrations.SysUsers!) {
                              if (users.email == email) {
                                diagnosisName = diagnosed.diagnosisName;
                                facility_name =
                                    users.facility_of_choice.toString();
                                diagnosisId = diagnosed.diagnosisId;

                                break;
                              }
                            }

                            if (diagnosisName.isNotEmpty &&
                                facility_name.isNotEmpty) {
                              break;
                            }
                          }

                          if (diagnosisName.isNotEmpty &&
                              facility_name.isNotEmpty) {
                            return Card(
                              color: Colors.white,
                              child: ListTile(
                                title: Text(diagnosisName),
                                subtitle: Text(facility_name),
                                leading:
                                    const Icon(Icons.person_outline_rounded),
                                trailing: const Icon(Icons.select_all_rounded),
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => specific_diagnosis(
                                        specific_id: diagnosisId,
                                      ),
                                    ),
                                  );

                                  debugPrint('Diagnosis ${(diagnosisId)}');
                                },
                              ),
                            );
                          } else {
                            // Return an empty container if there is no data
                            return Container();
                          }
                        },
                      );
                    } else {
                      return Center(
                        child: Text("No Data Available"),
                      );
                    }
                  },
                ),
              ),
            ],
          ),
        ));
  }
}

import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:patient/app_files/Database/database_diagnosis.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

Future<List<Diagnosis>> readDiagnosisData() async {
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  final response = await http
      .get(Uri.parse('http://10.0.2.2:8080/backend/Get_All_Diagnosis'),
             headers: {
      HttpHeaders.authorizationHeader:
          "Bearer ${prefs.getString('token') ?? ''}",
    },
      );

  final list = json.decode(response.body) as List<dynamic>;

  return list.map((e) => Diagnosis.fromJson(e)).toList();
}

DateTime registrationDate = DateTime.now();
String treatmentFacility = '';

class specific_diagnosis extends StatefulWidget {
  final String specific_id;

  specific_diagnosis({required this.specific_id});

  @override
  State<specific_diagnosis> createState() => _SpecificDiagnosisState();
}

class _SpecificDiagnosisState extends State<specific_diagnosis> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text("SPECIFIC PATIENT DATA"),
        ),
        backgroundColor: Colors.blue,
      ),
      body: Container(
        color: Colors.grey[200],
        child: FutureBuilder(
          future: readDiagnosisData(),
          builder: (context, data) {
            if (data.hasError) {
              return Center(child: Text("${data.error}"));
            } else if (data.hasData) {
              var diagnosed = data.data as List<Diagnosis>;
              return ListView.builder(
                itemCount: diagnosed.length,
                itemBuilder: (context, index) {
                  if (diagnosed[index].diagnosisId == widget.specific_id) {
                    
                    /*for (var registration
                        in diagnosed[index].diagnosisId) {
                      registrationDate = registration.registrationDate;
                      for (var facility in registration.facilityDetails) {
                        treatmentFacility = facility.facilityName;
                      }
                      
                    }*/
                   
                    return Card(
                      elevation: 0,
                      margin: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      color: Colors.white,
                      child: ListTile(
                        contentPadding: EdgeInsets.all(8),
                        leading: Container(
                          width: 50,
                          child: Image.network(
                            'https://images.all-free-download.com/images/graphiclarge/big_ben_clockface_192640.jpg',
                          ),
                        ),
                        title: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "FACILITY NAME: ${treatmentFacility}",
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            RichText(
                              text: TextSpan(
                                style: DefaultTextStyle.of(context).style,
                                children: [
                                  TextSpan(
                                    text: "DIAGNOSIS: ",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                    ),
                                  ),
                                  TextSpan(
                                    text: "${diagnosed[index].diagnosisName}",
                                    style: TextStyle(
                                      fontSize: 16,
                                      color: Colors.blue,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Text(
                              "TREATMENT: ${diagnosed[index].treatment}",
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              "REGISTRATION DATE: $registrationDate",
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              "SYMPTOMS: ${diagnosed[index].diagnosisName}",
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  } else {
                    return Container();
                  }
                },
              );
            } else {
              return Center(
                child: CircularProgressIndicator(),
              );
            }
          },
        ),
      ),
    );
  }
}

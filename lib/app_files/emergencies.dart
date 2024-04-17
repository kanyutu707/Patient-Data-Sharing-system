import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:image/image.dart' as img;
import 'package:location/location.dart';
import 'package:patient/app_files/Database/Facility_Detail.dart';

List<CameraDescription> cameras = [];

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
  runApp(const Emergencies());
}

class Emergencies extends StatefulWidget {
  const Emergencies({Key? key}) : super(key: key);

  @override
  _EmergenciesState createState() => _EmergenciesState();
}

class RegistrationData {
  final DateTime registration_Date;
  final String status;
  final String registration_Type;
  final bool approval_status;

  RegistrationData(this.registration_Date, this.status, this.registration_Type,
      this.approval_status);

  Map<dynamic, dynamic> toJson() => {
        "registration": {
          'registration_Date': 1234,
          'status': status,
          'registration_Type': "Remote",
          'approval_status': true,
        }
      };
}

class LocationService {
  Future<void> createEmergency(String email) async {
    Location location = Location();
    LocationData? locationData;
    try {
      locationData = await location.getLocation();
    } catch (e) {
      print('Failed to get location: $e');
      return;
    }

    double latitude = locationData!.latitude!;
    double longitude = locationData.longitude!;

    final registrationData = RegistrationData(
      DateTime.now(),
      "Inpatient",
      "Remote",
      true,
    );

    var response = await http.post(
      Uri.parse(
          "http://10.0.2.2:8080/backend/create_new_emergency?email=$email&latitude=$latitude&longitude=$longitude"),
      headers: <String, String>{"Content-Type": "application/json"},
      body: jsonEncode(registrationData.toJson()),
    );

    if (response.statusCode == 200) {
      print("Data submitted successfully");
    } else {
      print("${response.statusCode} Data Not submitted");
    }
  }
}

/* Future<void> createEmergency() async {
    var response = await http.post(
      Uri.parse("http://10.0.2.2:8080/backend/new_emergency_registraton"),
      
      body: jsonEncode(<String, String>{
        
        "registration_Date":DateTime.now().toString(),
        "registration_Type":"Remote",
        "register_User":"7a52092b-5a15-495a-be60-4a7bdf8a8998 ",
        "approval_Status":true.toString(),
        "system_Facility":"2d0b4abf-606a-4480-8a11-20a71720a775"
      }),
    );
    if (response.statusCode == 200) {
      print("Data submitted successfully");
    } else {
      print("${response.statusCode} Data Not submitted");
    }
  }*/
class _EmergenciesState extends State<Emergencies> {
  late CameraController controller;
  bool isCameraReady = false;

  @override
  void initState() {
    super.initState();
    initializeCamera();
  }

  Future<void> initializeCamera() async {
    try {
      cameras = await availableCameras();
      if (cameras.isNotEmpty) {
        controller = CameraController(cameras[0], ResolutionPreset.high);
        await controller.initialize();
        setState(() {
          isCameraReady = true;
        });
      } else {
        print('No cameras available');
      }
    } catch (e) {
      print('Error initializing camera: $e');
    }
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  Future<void> captureAndSend() async {
    try {
      XFile? imageFile = await controller.takePicture();
      if (imageFile != null) {
        final bytes = await imageFile.readAsBytes();

        final image = img.decodeImage(bytes);

        final resizedImage = img.copyResize(image!, width: 100, height: 100);

        final resizedBytes = img.encodeJpg(resizedImage);

        final uri = Uri.parse('http://10.0.2.2:9020/receive-image/');
        final request = http.MultipartRequest('POST', uri);

        request.files.add(http.MultipartFile.fromBytes(
          'file',
          resizedBytes,
          filename: 'image.jpg',
          contentType: MediaType('image', 'jpeg'),
        ));
        final streamedResponse = await request.send();
        final response = await http.Response.fromStream(streamedResponse);
        if (response.statusCode == 200) {
          final responseData = jsonDecode(response.body);
          await LocationService().createEmergency(responseData.toString());
          print('Response status: ${response.statusCode}');
          print('Response body: $responseData');
        } else {
          print('Error sending image: ${response.reasonPhrase}');
        }
      }
    } catch (e) {
      print('Error capturing and sending image: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!isCameraReady) {
      return Scaffold(body: Center(child: CircularProgressIndicator()));
    }
    return MaterialApp(
      title: 'Camera Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(title: Text('Emergencies')),
        body: Column(
          children: [
            ElevatedButton(
              onPressed: captureAndSend,
              child: Text('Capture and Send'),
            ),
            SizedBox(height: 20),
            Expanded(
              child: AspectRatio(
                aspectRatio: controller.value.aspectRatio,
                child: CameraPreview(controller),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

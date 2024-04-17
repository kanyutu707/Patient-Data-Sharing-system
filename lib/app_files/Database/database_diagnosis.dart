import 'dart:convert';

import 'package:patient/app_files/Database/RegistrationDetail.dart';

List<Diagnosis> diagnosisFromJson(String str) => List<Diagnosis>.from(json.decode(str).map((x) => Diagnosis.fromJson(x)));

String diagnosisToJson(List<Diagnosis> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Diagnosis {
    String treatment;
    String symptoms;
    dynamic detailsFacility;
    String diagnosisId;
    String diagnosisName;
    String patientRegistration;
    List<RegistrationDetail> registrationDetails;
    dynamic facilityDetails;

    Diagnosis({
        required this.treatment,
        required this.symptoms,
        required this.detailsFacility,
        required this.diagnosisId,
        required this.diagnosisName,
        required this.patientRegistration,
        required this.registrationDetails,
        required this.facilityDetails,
    });

    factory Diagnosis.fromJson(Map<String, dynamic> json) => Diagnosis(
        treatment: json["treatment"],
        symptoms: json["symptoms"],
        detailsFacility: json["details_facility"],
        diagnosisId: json["diagnosis_id"],
        diagnosisName: json["diagnosis_Name"],
        patientRegistration: json["patient_Registration"],
        registrationDetails: List<RegistrationDetail>.from(json["registration_Details"].map((x) => RegistrationDetail.fromJson(x))),
        facilityDetails: json["facility_Details"],
    );

    Map<String, dynamic> toJson() => {
        "treatment": treatment,
        "symptoms": symptoms,
        "details_facility": detailsFacility,
        "diagnosis_id": diagnosisId,
        "diagnosis_Name": diagnosisName,
        "patient_Registration": patientRegistration,
        "registration_Details": List<dynamic>.from(registrationDetails.map((x) => x.toJson())),
        "facility_Details": facilityDetails,
    };
}
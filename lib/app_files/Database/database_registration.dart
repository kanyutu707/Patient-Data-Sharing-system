import 'package:patient/app_files/Database/database_diagnosis.dart';

class Registration {
    List<Diagnosis> diagnosis;
    String status;
    String registrationId;
    int registrationDate;
    String registrationType;

    Registration({
        required this.diagnosis,
        required this.status,
        required this.registrationId,
        required this.registrationDate,
        required this.registrationType,
    });

    factory Registration.fromJson(Map<String, dynamic> json) => Registration(
        diagnosis: List<Diagnosis>.from(json["diagnosis"].map((x) => Diagnosis.fromJson(x))),
        status: json["status"],
        registrationId: json["registration_Id"],
        registrationDate: json["registration_Date"],
        registrationType: json["registration_Type"],
    );

    Map<String, dynamic> toJson() => {
        "diagnosis": List<dynamic>.from(diagnosis.map((x) => x.toJson())),
        "status": status,
        "registration_Id": registrationId,
        "registration_Date": registrationDate,
        "registration_Type": registrationType,
    };
}

import 'package:patient/app_files/Database/database_registration.dart';

class Patient {
    String password;
    String email;
    String role;
    List<Registration> registrations;
    String firstName;
    String lastName;
    String userGender;
    String userDob;
    String userId;

    Patient({
        required this.password,
        required this.email,
        required this.role,
        required this.registrations,
        required this.firstName,
        required this.lastName,
        required this.userGender,
        required this.userDob,
        required this.userId,
    });

    factory Patient.fromJson(Map<String, dynamic> json) => Patient(
        password: json["password"],
        email: json["email"],
        role: json["role"],
        registrations: List<Registration>.from(json["registrations"].map((x) => Registration.fromJson(x))),
        firstName: json["first_Name"],
        lastName: json["last_Name"],
        userGender: json["user_Gender"],
        userDob: json["user_DOB"],
        userId: json["user_Id"],
    );

    Map<String, dynamic> toJson() => {
        "password": password,
        "email": email,
        "role": role,
        "registrations": List<dynamic>.from(registrations.map((x) => x.toJson())),
        "first_Name": firstName,
        "last_Name": lastName,
        "user_Gender": userGender,
        "user_DOB": userDob,
        "user_Id": userId,
    };
}
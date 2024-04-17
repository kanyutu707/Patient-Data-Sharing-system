class SysUser {
  String? role;
  String? user_Id;
  String? userGender;
  String? userDob;
  String? first_Name;
  String? last_Name;
  String? email;
  String? password;
  String? facility_of_choice;

  SysUser({
    required this.role,
    required this.user_Id,
    required this.first_Name,
    required this.last_Name,
    required this.userGender,
    required this.userDob,
    required this.email,
    required this.password,
    required this.facility_of_choice,
  });

  factory SysUser.fromJson(Map<String, dynamic> json) => SysUser(
        role: json["role"],
        user_Id: json["user_Id"],
        userGender: json["user_Gender"],
        userDob: json["user_DOB"],
        first_Name: json["first_Name"],
        last_Name: json["last_Name"],
        email: json["email"],
        password: json["password"],
        facility_of_choice: json["facility_of_choice"],
      );

  Map<String, dynamic> toJson() => {
        "role": role,
        "user_Id": user_Id,
        "user_Gender": userGender,
        "user_DOB": userDob,
        "first_Name": first_Name,
        "last_Name": last_Name,
        "email": email,
        "password": password,
        "facility_of_choice": facility_of_choice,
      };
}

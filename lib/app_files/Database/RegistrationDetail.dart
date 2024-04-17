import 'package:patient/app_files/Database/database_facilities.dart';
import 'package:patient/app_files/Database/database_user.dart';

class RegistrationDetail {
    bool? approvalStatus;
    List<SysUser>? SysUsers;
    String? status;
    List<FacilityDetail>? facilityDetails;
    String? registrationId;
    int? registrationDate;
    String? registrationType;
    String? registerUser;
    String? systemFacility;

    RegistrationDetail({
        required this.approvalStatus,
        required this.SysUsers,
        required this.status,
        required this.facilityDetails,
        required this.registrationId,
        required this.registrationDate,
        required this.registrationType,
        required this.registerUser,
        required this.systemFacility,
    });

    factory RegistrationDetail.fromJson(Map<String, dynamic> json) => RegistrationDetail(
        approvalStatus: json["approval_status"],
        SysUsers: List<SysUser>.from(json["user_details"].map((x) => SysUser.fromJson(x))),
        status: json["status"],
        facilityDetails: List<FacilityDetail>.from(json["facility_Details"].map((x) => FacilityDetail.fromJson(x))),
        registrationId: json["registration_Id"],
        registrationDate: json["registration_Date"],
        registrationType: json["registration_Type"],
        registerUser: json["register_User"],
        systemFacility: json["system_Facility"],
    );

    Map<String, dynamic> toJson() => {
        "approval_status": approvalStatus,
        "user_details": List<dynamic>.from(SysUsers!.map((x) => x.toJson())),
        "status": status,
        "facility_Details": List<dynamic>.from(facilityDetails!.map((x) => x.toJson())),
        "registration_Id": registrationId,
        "registration_Date": registrationDate,
        "registration_Type": registrationType,
        "register_User": registerUser,
        "system_Facility": systemFacility,
    };
}

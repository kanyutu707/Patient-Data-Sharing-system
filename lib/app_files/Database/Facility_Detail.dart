class FacilityDetail {
    String facilityStatus;
    String facilityName;
    double facilityLongitude;
    double facilityLatitude;
    String facilityId;

    FacilityDetail({
        required this.facilityStatus,
        required this.facilityName,
        required this.facilityLongitude,
        required this.facilityLatitude,
        required this.facilityId,
    });


factory FacilityDetail.fromJson(Map<String, dynamic> json) {
  return FacilityDetail(
    facilityStatus: json["facility_Status"],
    facilityName: json["facility_Name"],
    facilityLongitude: json["facility_Longitude"].toDouble(),
    facilityLatitude: json["facility_Latitude"].toDouble(),
    facilityId: json["facility_Id"],
  );
}




    Map<String, dynamic> toJson() => {
        "facility_Status": facilityStatus,
        "facility_Name": facilityName,
        "facility_Longitude": facilityLongitude,
        "facility_Latitude": facilityLatitude,
        "facility_Id": facilityId,
    };
}
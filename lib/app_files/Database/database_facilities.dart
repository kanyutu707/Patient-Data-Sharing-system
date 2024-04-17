class FacilityDetail {
    String ?facilityName;
    double ?facilityLatitude;

    String ?facilityId;
    double ?facilityLongitude;

    FacilityDetail({
        required this.facilityName,
        required this.facilityLatitude,
        required this.facilityId,
        required this.facilityLongitude,
    });

  factory FacilityDetail.fromJson(Map<String, dynamic> json) {
  return FacilityDetail(
   
    facilityName: json["facility_Name"],
    facilityLongitude: json["facility_Longitude"].toDouble(),
    facilityLatitude: json["facility_Latitude"].toDouble(),
    facilityId: json["facility_Id"],
  );
}


    Map<String, dynamic> toJson() => {
        "facility_Name": facilityName,
        "facility_Latitude": facilityLatitude,
        "facility_Id": facilityId,
        "facility_Longitude":facilityLongitude
       
    };
}
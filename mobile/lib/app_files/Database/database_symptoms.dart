class symptoms {
  String symptom_name;

  symptoms({
    required this.symptom_name,
  });
  factory symptoms.fromJson(Map<String, dynamic> json) =>
      symptoms(
          symptom_name: json['symptom_name']);

  Map<String, dynamic> toJson() => {
    "symptom_name":symptom_name
  };
}

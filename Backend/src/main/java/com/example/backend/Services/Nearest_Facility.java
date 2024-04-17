package com.example.backend.Services;

import com.example.backend.model.Facility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Nearest_Facility {
    @Autowired
    private vincenty_formula vincentyFormula;

    public String getNearestFacility(List<Facility> facilities, double latitude, double longitude) {
        String nearestFacilityId = null;
        double minDistance = Double.MAX_VALUE;

        for (Facility facility : facilities) {
            double distance = vincentyFormula.calculateDistance(latitude, longitude, facility.getFacility_Latitude(), facility.getFacility_Longitude());
            if (distance < minDistance) {
                minDistance = distance;
                nearestFacilityId = facility.getFacility_Id();
            }
        }

        return nearestFacilityId;
    }
}

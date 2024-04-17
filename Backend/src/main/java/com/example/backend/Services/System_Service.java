package com.example.backend.Services;

import com.example.backend.Exceptions.AppException;
import com.example.backend.Mappers.UserMapper;
import com.example.backend.dto.*;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.nio.CharBuffer;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class System_Service {

    @Autowired
    public void PasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    private PasswordEncoder passwordEncoder;

    @Autowired
    public void userRepo(User_Repo userRepo) {
        this.userRepo = userRepo;
    }

    private User_Repo userRepo;

    @Autowired
    public void UserMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    private UserMapper userMapper;

    private  VincentyFormula vincentyFormula;


    @Autowired
    public void VincentyFormula(VincentyFormula vincentyFormula) {
        this.vincentyFormula = vincentyFormula;
    }

    @Autowired
    public void Medical_repo(Medical_Officers_Repo medical_repo) {
        this.medical_repo = medical_repo;
    }

    private Medical_Officers_Repo medical_repo;

    @Autowired
    public void Facility_repo(Facility_Repo facility_repo) {
        this.facility_repo = facility_repo;
    }

    public void setRegistration(Registration_Repo registration) {
        this.registration = registration;
    }

    public Registration_Repo registration;

    private Facility_Repo facility_repo;


    private Registration_Repo registration_repo;

    @Autowired
    public void Registration_repo(Registration_Repo registration_repo) {
        this.registration_repo = registration_repo;
    }


    private User_Repo user_repo;

    @Autowired
    public void User_repo(User_Repo user_repo) {
        this.user_repo = user_repo;
    }


    private Diagnosis_Repo diagnosis_repo;

    @Autowired
    public void Diagnosis_repo(Diagnosis_Repo diagnosis_repo) {
        this.diagnosis_repo = diagnosis_repo;
    }





    public UserDTO login(CredentialsDTO credentialsDTO) {
        System_User user = userRepo.findByEmail(credentialsDTO.email())
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.password()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public String addUser(System_User system_user) {
        system_user.setPassword(passwordEncoder.encode(system_user.getPassword()));
        userRepo.save(system_user);
        return "User added successfully";
    }

    public UserDTO register(SignUpDTO signUpDTO) {
        Optional<System_User> ruser = userRepo.findByEmail(signUpDTO.email());

        if (ruser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }
        System_User user = userMapper.signUpToUser(signUpDTO);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDTO.password())));
        System_User savedUser = userRepo.save(user);
        return userMapper.toUserDto(savedUser);
    }

    public Registration_DTO create_registration(Registration_DTO registration_dto, @RequestParam String email, @RequestParam double pat_lat, @RequestParam double pat_long) {
        // Get the user
        Optional<System_User> get_user = user_repo.findByEmail(email);
        if (get_user.isPresent()) {
            System_User current_user = get_user.get();

            // Get user id
            String user_Id = current_user.getUser_Id();

            // Get the facility coordinates
            List<Facility> all_facilities = facility_repo.findAll();
            double lat1 = pat_lat;
            double long1 = pat_long;

            // Initialize variables to track minimum distance and corresponding facility ID
            double minDistance = Double.MAX_VALUE;
            String facilityIdWithMinDistance = null;

            for (Facility facility : all_facilities) {
                double lat2 = facility.getFacility_Latitude();
                double long2 = facility.getFacility_Longitude();

                double distance = vincentyFormula.calculateDistance(lat1, long1, lat2, long2);

                // Update minimum distance and corresponding facility ID if a closer facility is found
                if (distance < minDistance) {
                    minDistance = distance;
                    facilityIdWithMinDistance = facility.getFacility_Id();
                }
            }

            // Now you have the facilityId with the least distance
            if (facilityIdWithMinDistance != null) {
                // Create a new Registration object
                Registration registration = new Registration();
                registration.setRegistration_Date(new Date());
                registration.setStatus("Pending"); // Or any other default status
                registration.setRegistration_Type("Remote");

                registration.setSystem_Facility(facilityIdWithMinDistance); // Set facilityId with least distance
                registration.setRegister_User(user_Id);

                // Save the registration
                registration_repo.save(registration);

                // You may return the registration DTO or any other response here
                return registration_dto;
            } else {
                // Handle case where no facilities were found
                // You might throw an exception or return an appropriate response
                return null;
            }
        } else {
            // Handle case where user is not found
            // You might throw an exception or return an appropriate response
            return null;
        }
    }




}

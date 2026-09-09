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

    private VincentyFormula vincentyFormula;

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
        System.out.println("=== DEBUG SIGNUP DTO ===");
        System.out.println("Email: " + (signUpDTO != null ? signUpDTO.getEmail() : "DTO IS NULL"));
        System.out.println("First Name: " + (signUpDTO != null ? signUpDTO.getFirstName() : "N/A"));
        System.out.println("Password: " + (signUpDTO != null ? signUpDTO.getPassword() : "N/A"));
        System.out.println("========================");

        Optional<System_User> ruser = userRepo.findByEmail(signUpDTO.getEmail());

        if (ruser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }
        System_User user = userMapper.signUpToUser(signUpDTO);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDTO.getPassword())));
        System_User savedUser = userRepo.save(user);

        // Manual mapping fallback to guarantee a populated response
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(savedUser.getUser_Id());
        userDTO.setEmail(savedUser.getEmail());
        userDTO.setFirstName(savedUser.getFirstName());
        userDTO.setLastName(savedUser.getLastName());
        userDTO.setUserGender(savedUser.getUserGender());
        userDTO.setUserDOB(savedUser.getUserDOB());
        userDTO.setRole(savedUser.getRole());
        userDTO.setFacilityOfChoice(savedUser.getFacilityOfChoice());

        return userDTO;
    }

    public Registration_DTO create_registration(Registration_DTO registration_dto, @RequestParam String email, @RequestParam double pat_lat, @RequestParam double pat_long) {
        Optional<System_User> get_user = user_repo.findByEmail(email);
        if (get_user.isPresent()) {
            System_User current_user = get_user.get();
            String user_Id = current_user.getUser_Id();

            List<Facility> all_facilities = facility_repo.findAll();
            double lat1 = pat_lat;
            double long1 = pat_long;

            double minDistance = Double.MAX_VALUE;
            String facilityIdWithMinDistance = null;

            for (Facility facility : all_facilities) {
                double lat2 = facility.getFacility_Latitude();
                double long2 = facility.getFacility_Longitude();

                double distance = vincentyFormula.calculateDistance(lat1, long1, lat2, long2);

                if (distance < minDistance) {
                    minDistance = distance;
                    facilityIdWithMinDistance = facility.getFacility_Id();
                }
            }

            if (facilityIdWithMinDistance != null) {
                Registration registration = new Registration();
                registration.setRegistration_Date(new Date());
                registration.setStatus("Pending");
                registration.setRegistration_Type("Remote");

                registration.setSystem_Facility(facilityIdWithMinDistance);
                registration.setRegister_User(user_Id);

                registration_repo.save(registration);

                return registration_dto;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
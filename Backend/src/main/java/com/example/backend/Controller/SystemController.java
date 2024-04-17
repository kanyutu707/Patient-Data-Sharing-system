package com.example.backend.Controller;

import com.example.backend.Config.UserAuthProvider;
import com.example.backend.Services.Nearest_Facility;
import com.example.backend.Services.System_Service;
import com.example.backend.dto.*;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/backend/")

public class SystemController {
    private static final Logger logger = LoggerFactory.getLogger(SystemController.class);
    private final UserAuthProvider userAuthProvider;
    public SystemController(UserAuthProvider userAuthProvider) {
        this.userAuthProvider = userAuthProvider;
    }

    @Autowired
    public void Service(System_Service service) {
        this.service = service;
    }
    private System_Service service;

    private User_Repo user;

   // private Patient_Repo patient;

    private Facility_Repo facility;

    private Diagnosis_Repo diagnosis;

    private Registration_Repo registration;

    @Autowired
    public void earestFacility(Nearest_Facility nearestFacility) {
        this.nearestFacility = nearestFacility;
    }

    private Nearest_Facility nearestFacility;
    @Autowired
    public void Registration(Registration_Repo registration) {
        this.registration = registration;
    }

    @Autowired
    public void Diagnosis(Diagnosis_Repo diagnosis) {
        this.diagnosis = diagnosis;
    }

    @Autowired
    public void Facility(Facility_Repo facility) {
        this.facility = facility;
    }

    /*@Autowired
    public void Patient(Patient_Repo patient) {
        this.patient = patient;
    }
*/
    @Autowired
    public void User(User_Repo user) {
        this.user = user;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialsDTO){
        UserDTO user=service.login(credentialsDTO);
        user.setToken(userAuthProvider.createToken(user));
        return ResponseEntity.ok(user);
    }
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody SignUpDTO signUpDTO){
       UserDTO user= service.register(signUpDTO);
       return ResponseEntity.created(URI.create("/users/" + user.getEmail())).body(user);
    }
    @RequestMapping(path = "create_user", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public System_User Create_User(@RequestBody System_User newUser){

        return user.save(newUser);
    }

    @RequestMapping(path = "Get_All_Users", method = RequestMethod.GET)
    public List<System_User> Get_All_Users(){
        return user.findAll();
    }


    /*@RequestMapping(path="Get_User_By_Name/{User_Id}",method = RequestMethod.GET)
    public System_User Get_User_By_Id(@PathVariable String User_Id){
        Optional<System_User> systemUser=user.findById(User_Id);

        if (systemUser.isPresent()) {
            return systemUser.get();
        }
        throw new RuntimeException("System user is not found");
    }*/

    /*@RequestMapping(path="Get_User_By_Name/{User_Name}",method = RequestMethod.GET)
    public Optional<System_User> Get_User_By_Name(@PathVariable(name = "User_Name") String User_Name){
        return user.findByUserName(User_Name);
    }*/

    //PATIENT
  /*  @RequestMapping(path = "create_patient", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Patient Create_Patient(@RequestBody Patient_DTO newPatient){
        return patient.save(newPatient.getPatient());
    }

    @RequestMapping(path = "Get_All_Patients", method = RequestMethod.GET)
    public List<Patient> Get_All_Patient(){
        return patient.findAll();
    }
*/
    //FACILITY
    @RequestMapping(path = "create_facility", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Facility Create_Facility(@RequestBody Facility newFacility){

        return facility.save(newFacility);
    }

    @RequestMapping(path = "Get_All_Facilities", method = RequestMethod.GET)
    public List<Facility> Get_All_Facilities(){
        return facility.findAll();
    }


    @RequestMapping(path = "emergency_details", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    private Registration emergency_registration(@RequestParam String email, @RequestBody Registration registration_data, double latitude, double longitude) {
        logger.debug("Received emergency registration request for email: {}", email);

        List<Facility> facilities = facility.findAll();
        logger.debug("Found {} facilities", facilities.size());

        String nearestFacilityId = nearestFacility.getNearestFacility(facilities, latitude, longitude);
        logger.debug("Nearest facility ID: {}", nearestFacilityId);

        Optional<System_User> optionalUser = user.findByEmail(email);

        if (optionalUser.isPresent()) {
            System_User currentEmergency = optionalUser.get();
            if (email.equals(currentEmergency.getEmail())) {
                registration_data.setRegister_User(currentEmergency.getUser_Id()); // Assuming the setter method is correct
                registration_data.setSystem_Facility(nearestFacilityId); // Set the nearest facility ID
                Registration savedRegistration = registration.save(registration_data);
                logger.debug("Registration saved successfully: {}", savedRegistration);
                return savedRegistration;
            }
        } else {
            logger.debug("User not found for email: {}", email);
        }

        return registration_data;
    }



    @RequestMapping(path = "update_User", method = RequestMethod.PUT)
    public System_User updateUser(@RequestParam String user_email, @RequestBody System_User sys_user) {
        Optional<System_User> optionalUser = user.findByEmail(user_email);

        if (optionalUser.isPresent()) {
            System_User updateData = optionalUser.get();

            if (StringUtils.isNotBlank(sys_user.getFirst_Name())) {
                updateData.setFirst_Name(sys_user.getFirst_Name());
            }

            if(StringUtils.isNotBlank(sys_user.getLast_Name())){
                updateData.setLast_Name(sys_user.getLast_Name());
            }

            if(StringUtils.isNotBlank(sys_user.getEmail())){
                updateData.setEmail(sys_user.getEmail());
            }

            if(StringUtils.isNotBlank(sys_user.getFacility_of_choice())){
                updateData.setFacility_of_choice(sys_user.getFacility_of_choice());
            }
            if(StringUtils.isNotBlank(sys_user.getPassword())){
                updateData.setPassword(sys_user.getPassword());
            }

            return user.save(updateData);
        } else {

            return null;
        }
    }

    @RequestMapping(path = "update_registration", method = RequestMethod.PUT)
    private Registration update_registration(@RequestParam String Registration_Id, @RequestBody Registration current_registration){
        Optional<Registration> optionalRegistration=registration.findById(Registration_Id);
        if(optionalRegistration.isPresent()){
            Registration update_registration=optionalRegistration.get();

            update_registration.setApproval_status(current_registration.isApproval_status());

            return registration.save(update_registration);

        }
        return null;
    }



    //STATUS
    @RequestMapping(path = "create_Diagnosis", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Diagnosis Create_Diagnosis(@RequestBody Diagnosis_DTO newDiagnosis){
        return diagnosis.save(newDiagnosis.getDiagnosis());
    }

    @RequestMapping(path = "Get_All_Diagnosis", method = RequestMethod.GET)
    public List<Diagnosis> Get_All_Diagnosis(){
        return diagnosis.findAll();
    }

    @RequestMapping(path = "create_Registration", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Registration Create_Registration(@RequestBody Registration_DTO newRegistration){
        return registration.save(newRegistration.getRegistration());
    }
    @RequestMapping(path = "Get_All_Registrations", method = RequestMethod.GET)
    public List<Registration> Get_All_Registrations(){
        return registration.findAll();
    }

    @PostMapping(path = "/create_new_emergency", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Registration Create_Emergency(@RequestBody Registration_DTO newRegistration, @RequestParam String email, @RequestParam double latitude, @RequestParam double longitude) {
        return service.create_registration(newRegistration, email, latitude, longitude).getRegistration();
    }



}

package com.example.backend.Mappers;

import com.example.backend.dto.SignUpDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.System_User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    default System_User signUpToUser(SignUpDTO signUpDTO) {
        if (signUpDTO == null) {
            return null;
        }
        System_User user = new System_User();
        user.setEmail(signUpDTO.getEmail());
        user.setPassword(signUpDTO.getPassword());
        user.setRole(signUpDTO.getRole());
        user.setFirstName(signUpDTO.getFirstName());
        user.setLastName(signUpDTO.getLastName());
        user.setUserGender(signUpDTO.getUserGender());
        user.setUserDOB(signUpDTO.getUserDOB());
        user.setFacilityOfChoice(signUpDTO.getFacilityOfChoice());
        return user;
    }

    default UserDTO toUserDto(System_User user) {
        if (user == null) {
            return null;
        }
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUser_Id());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setUserGender(user.getUserGender());
        dto.setUserDOB(user.getUserDOB());
        dto.setRole(user.getRole());
        dto.setFacilityOfChoice(user.getFacilityOfChoice());
        return dto;
    }
}
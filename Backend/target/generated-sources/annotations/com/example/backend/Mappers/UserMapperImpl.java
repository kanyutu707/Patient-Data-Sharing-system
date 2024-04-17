package com.example.backend.Mappers;

import com.example.backend.dto.SignUpDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.System_User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-04-14T11:03:45-0400",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.38.0.v20240325-1403, environment: Java 17.0.10 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toUserDto(System_User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO.UserDTOBuilder userDTO = UserDTO.builder();

        userDTO.email( user.getEmail() );
        userDTO.facility_of_choice( user.getFacility_of_choice() );
        userDTO.first_Name( user.getFirst_Name() );
        userDTO.last_Name( user.getLast_Name() );
        userDTO.password( user.getPassword() );
        userDTO.role( user.getRole() );
        userDTO.user_DOB( user.getUser_DOB() );
        userDTO.user_Gender( user.getUser_Gender() );
        userDTO.user_Id( user.getUser_Id() );

        return userDTO.build();
    }

    @Override
    public System_User signUpToUser(SignUpDTO signUpDTO) {
        if ( signUpDTO == null ) {
            return null;
        }

        System_User system_User = new System_User();

        system_User.setEmail( signUpDTO.email() );
        system_User.setFacility_of_choice( signUpDTO.facility_of_choice() );
        system_User.setFirst_Name( signUpDTO.first_Name() );
        system_User.setLast_Name( signUpDTO.last_Name() );
        system_User.setRole( signUpDTO.role() );
        system_User.setUser_DOB( signUpDTO.user_DOB() );
        system_User.setUser_Gender( signUpDTO.user_Gender() );

        return system_User;
    }
}

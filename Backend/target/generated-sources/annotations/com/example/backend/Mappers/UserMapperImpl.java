package com.example.backend.Mappers;

import com.example.backend.dto.SignUpDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.System_User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-01-26T22:53:09+0300",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.16 (OpenLogic)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toUserDto(System_User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        return userDTO;
    }

    @Override
    public System_User signUpToUser(SignUpDTO signUpDTO) {
        if ( signUpDTO == null ) {
            return null;
        }

        System_User system_User = new System_User();

        return system_User;
    }
}

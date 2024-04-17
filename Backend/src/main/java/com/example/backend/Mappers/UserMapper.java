package com.example.backend.Mappers;
import com.example.backend.dto.EmergencyDTO;
import com.example.backend.dto.Registration_DTO;
import com.example.backend.dto.SignUpDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.Registration;
import com.example.backend.model.System_User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel="spring")
public interface UserMapper {
    UserDTO toUserDto(System_User user);

    @Mapping(target="password", ignore = true)
    System_User signUpToUser(SignUpDTO signUpDTO);



}

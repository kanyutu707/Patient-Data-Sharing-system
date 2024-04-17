package com.example.backend.Config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.backend.Exceptions.AppException;
import com.example.backend.Mappers.UserMapper;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.System_User;
import com.example.backend.repository.User_Repo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final User_Repo repository;

    private  final UserMapper userMapper;

    @PostConstruct
    protected void init(){
        secretKey= Base64.getEncoder().encodeToString(secretKey.getBytes());

    }
    Date now=new Date();
    Date validity=new Date(now.getTime()+3_600_000);

    public String createToken(UserDTO dto){
        return JWT.create()
                .withIssuer(dto.getEmail())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("fistName" , dto.getFirst_Name())
                .withClaim("lastName" , dto.getLast_Name())
                .sign(Algorithm.HMAC256(secretKey));
    }
    public Authentication validateToken(String token){
        Algorithm algorithm=Algorithm.HMAC256(secretKey);

        JWTVerifier verifier=JWT.require(algorithm).build();
        DecodedJWT decoded=verifier.verify(token);
       UserDTO user= UserDTO.builder()
                .email(decoded.getIssuer())
                .first_Name(decoded.getClaim("firstName").asString())
                .last_Name(decoded.getClaim("lastName").asString())
                .build();

       return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());



    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm=Algorithm.HMAC256(secretKey);

        JWTVerifier verifier=JWT.require(algorithm).build();
        DecodedJWT decoded=verifier.verify(token);

        System_User user=repository.findByEmail(decoded.getIssuer())
                .orElseThrow(()->new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return new UsernamePasswordAuthenticationToken(userMapper.toUserDto(user), null, Collections.emptyList());

    }
}

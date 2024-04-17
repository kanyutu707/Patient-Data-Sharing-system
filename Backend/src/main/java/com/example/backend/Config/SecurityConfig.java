package com.example.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserAuthProvider userAuthProvider;

    public SecurityConfig(UserAuthProvider userAuthProvider) {
        this.userAuthProvider = userAuthProvider;
    }
   /* @Autowired
    public void PasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    private PasswordEncoder passwordEncoder;*/

    /*@Bean
    public UserDetailsService userDetailsService(){
       // UserDetails admin= User.withUsername("Bassant")
              //  .password(encoder.encode("pwd1"))
            //    .roles("ADMIN")
          //      .build();
        //UserDetails medicalOfficer= User.withUsername("John")
              //  .password(encoder.encode("pwd2"))
            //    .roles("MedicalOfficer")
          //      .build();
        //UserDetails patient= User.withUsername("David")
          //      .password(encoder.encode("pwd3"))
        //        .roles("Patient")
      //          .build();
    //return new InMemoryUserDetailsManager(admin, medicalOfficer, patient);

        return new UserInfoUserDetailsService();
    }
*/
    @Bean

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       /* return http
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth->auth
                .requestMatchers("/backend/Get_All_Users/**", "/backend/create_user/**").permitAll()
                .requestMatchers("/backend/**")
                        .authenticated()

                .anyRequest().authenticated())
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                .httpBasic(Customizer.withDefaults()).build();*/
        http.csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                .sessionManagement(customizer->customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        (requests)->requests.requestMatchers(HttpMethod.POST, "/backend/login", "/backend/register", "backend/create_new_emergency", "/backend/Get_All_Users")
                                .permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();


    }


  /*  @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }*/
}

package com.hiresmart.service;

import com.hiresmart.model.User;
import com.hiresmart.repository.UserRepository;
import com.hiresmart.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String register(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return "User registered";
    }

    public String login(String email,String password){

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        if(passwordEncoder.matches(password,user.getPassword())){

            return jwtUtil.generateToken(user.getEmail(),user.getRole());

        }

        throw new RuntimeException("Invalid credentials");
    }
}
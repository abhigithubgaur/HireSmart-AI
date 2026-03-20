package com.hiresmart.controller;

import com.hiresmart.model.User;
import com.hiresmart.service.AuthService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user){

        return authService.register(user);

    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password){

        return authService.login(email,password);

    }
}
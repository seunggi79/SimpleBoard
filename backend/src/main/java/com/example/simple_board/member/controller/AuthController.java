package com.example.simple_board.member.controller;

import com.example.simple_board.member.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;


    // 회원 가입
    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody Map<String, String> body) {

    }
}

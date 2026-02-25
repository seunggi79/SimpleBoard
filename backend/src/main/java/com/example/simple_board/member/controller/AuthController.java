package com.example.simple_board.member.controller;

import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.dto.SignupRequest;
import com.example.simple_board.member.dto.SignupResponse;
import com.example.simple_board.member.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;


    // 회원 가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public SignupResponse signup(@RequestBody @Valid SignupRequest req) {
        Member m = authService.signup(req.email(), req.nickname(), req.password());
        return new SignupResponse(m.getId(), m.getEmail(), m.getNickname());
    }
}

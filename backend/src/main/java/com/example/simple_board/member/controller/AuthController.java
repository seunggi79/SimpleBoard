package com.example.simple_board.member.controller;

import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.dto.LoginRequest;
import com.example.simple_board.member.dto.LoginResponse;
import com.example.simple_board.member.dto.SignupRequest;
import com.example.simple_board.member.dto.SignupResponse;
import com.example.simple_board.member.service.AuthService;
import jakarta.servlet.http.HttpSession;
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

    private static final String SESSION_MEMBER_ID = "MEMBER_ID"; // 세션 상수
    // 회원 가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public SignupResponse signup(@RequestBody @Valid SignupRequest req) {
        Member m = authService.signup(req.email(), req.nickname(), req.password());
        return new SignupResponse(m.getId(), m.getEmail(), m.getNickname());
    }

    // 로그인
    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest req, HttpSession session){
        LoginResponse res = authService.login(req.email(), req.password());
        session.setAttribute(SESSION_MEMBER_ID, res.memberId());
        return res;
    }
}

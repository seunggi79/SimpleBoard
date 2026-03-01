package com.example.simple_board.member.auth;

import com.example.simple_board.member.auth.dto.LoginResponseJwt;
import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.dto.LoginRequest;
import com.example.simple_board.member.dto.LoginResponse;
import com.example.simple_board.member.dto.SignupRequest;
import com.example.simple_board.member.dto.SignupResponse;
import com.example.simple_board.security.jwt.AuthPrincipal;
import com.example.simple_board.security.jwt.JwtProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    private final JwtProvider jwtProvider;

    private static final String SESSION_MEMBER_ID = "MEMBER_ID"; // 세션 상수
    // 회원 가입
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public SignupResponse signup(@RequestBody @Valid SignupRequest req) {
        Member m = authService.signup(req.email(), req.nickname(), req.password());
        return new SignupResponse(m.getId(), m.getEmail(), m.getNickname());
    }

    // 세션 로그인
    /*@PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest req, HttpSession session){
        LoginResponse res = authService.loginSession(req.email(), req.password());
        session.setAttribute(SESSION_MEMBER_ID, res.memberId());
        return res;
    }*/

    // jwt 로그인
    @PostMapping("/login")
    public LoginResponseJwt login(@RequestBody @Valid LoginRequest req) {
        Member m = authService.loginJwt(req.email(), req.password()); // ✅ Member 반환
        String token = jwtProvider.createAccessToken(m.getId(), m.getRole().asAuthority()); // ✅ role 포함
        return new LoginResponseJwt(m.getId(), token);
    }

    @GetMapping("/me")
    public String me(@AuthenticationPrincipal AuthPrincipal principal) {
        return principal == null ? "anonymous" : "id = " + principal.memberId();
    }
}

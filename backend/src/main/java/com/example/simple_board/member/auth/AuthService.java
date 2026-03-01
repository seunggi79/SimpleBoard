package com.example.simple_board.member.auth;

import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.domain.Status;
import com.example.simple_board.member.dto.LoginResponse;
import com.example.simple_board.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Member signup(String email, String nickname, String rawPassword) {
        if (memberRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        String hash = passwordEncoder.encode(rawPassword);
        Member member = new Member(email, nickname, hash);
        return memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public LoginResponse loginSession(String email, String rawPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(rawPassword, member.getPasswordHash())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 계정 상태 체크 (enum 비교)
        if (member.getStatus() != Status.ACTIVE) {
            throw new IllegalStateException("계정 상태가 비활성입니다.");
        }

        return new LoginResponse(member.getId(), member.getNickname(), member.getRole().name());
    }

    // ✅ 변경: JWT 로그인도 role이 필요하니 Member 자체를 반환
    @Transactional(readOnly = true)
    public Member loginJwt(String email, String rawPassword) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new AuthException("이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(rawPassword, member.getPasswordHash())) {
            throw new AuthException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // ✅ 추가: JWT 로그인도 상태 체크는 반드시 (차단계정 토큰 발급 방지)
        if (member.getStatus() != Status.ACTIVE) {
            throw new AuthException("계정이 비활성/차단 상태입니다.");
        }

        return member;
    }
}

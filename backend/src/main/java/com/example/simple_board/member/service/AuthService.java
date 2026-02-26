package com.example.simple_board.member.service;

import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.domain.Status;
import com.example.simple_board.member.dto.LoginRequest;
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
    public LoginResponse login(String email, String rawPassword) {
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
}

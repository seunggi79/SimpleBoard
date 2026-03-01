package com.example.simple_board.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {
    private final Key key;
    private final long expMs;

    public JwtProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-token-exp-min}") long expMin
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expMs = expMin * 60_000;
    }

    // ✅ 변경: roleAuthority(ROLE_USER/ROLE_ADMIN)를 토큰에 넣음
    public String createAccessToken(Long memberId, String roleAuthority) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(String.valueOf(memberId))
                .claim("role", roleAuthority) // ✅ 추가
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validate(String token) {
        try {
            parseClaims(token); // ✅ 공통 파서 사용(권장)
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }


    public Long getMemberId(String token) {
        return Long.valueOf(
                Jwts.parserBuilder().setSigningKey(key).build()
                        .parseClaimsJws(token).getBody().getSubject()
        );
    }
    // ✅ 추가: 토큰에서 권한 문자열(ROLE_USER/ROLE_ADMIN) 추출
    public String getRole(String token) {
        Object v = parseClaims(token).get("role");
        return v == null ? null : String.valueOf(v);
    }

    // ✅ 추가(권장): 토큰 파싱을 한 곳으로 모아 중복/실수 줄임
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
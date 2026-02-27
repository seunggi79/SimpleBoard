package com.example.simple_board.config;

import com.example.simple_board.security.jwt.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                // ✅ JWT 모드: 세션 안 씀
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 세션 모드로 되돌릴 때는 위 줄 주석 처리하고 필요하면 아래처럼:
                // .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))

                .authorizeHttpRequests(auth -> auth
                        // 로그인/회원가입은 무조건 열어두기
                        .requestMatchers("/auth/**").permitAll()

                        // 게시판 API 임시 공개(원하면 나중에 authenticated로 바꾸면 됨)
                        .requestMatchers("/posts/**").permitAll()

                        .anyRequest().authenticated()
                )

                // ✅ JWT 필터 추가 (토큰 검증)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                // ✅ 폼로그인/베이직 인증 끄기 (API 서버면 보통 끔)
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
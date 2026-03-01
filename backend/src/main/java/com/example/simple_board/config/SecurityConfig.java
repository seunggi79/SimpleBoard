package com.example.simple_board.config;

import com.example.simple_board.security.jwt.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity // ✅ @PreAuthorize 쓰고 싶으면 켜두는 게 좋음 (안 쓰면 빼도 됨)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth
                        // ✅ 인증 없이 허용
                        .requestMatchers("/auth/signup", "/auth/login").permitAll()
                        .requestMatchers("/auth/me").authenticated()

                        // ✅ 관리자 전용
                        .requestMatchers("/admin/**").hasRole("ADMIN")

                        // ✅ 읽기만 공개(권장)
                        .requestMatchers(HttpMethod.GET, "/posts/**").permitAll()

                        // ✅ 쓰기/수정/삭제는 로그인 필요(권장)
                        .requestMatchers("/posts/**").authenticated()

                        // 나머지
                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
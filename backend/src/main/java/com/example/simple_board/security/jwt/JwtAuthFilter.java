package com.example.simple_board.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    public JwtAuthFilter(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        // 이미 인증이 있으면 중복 세팅하지 않음
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            chain.doFilter(req, res);
            return;
        }

        String auth = req.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("[JwtAuthFilter] uri=" + req.getRequestURI() + " auth=" + auth);

        if (auth == null || !auth.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        String token = auth.substring(7).trim();

        boolean ok = jwtProvider.validate(token);
        System.out.println("[JwtAuthFilter] validate=" + ok);

        if (!ok) {
            chain.doFilter(req, res);
            return;
        }

        Long memberId = jwtProvider.getMemberId(token);
        String role = jwtProvider.getRole(token); // ROLE_USER / ROLE_ADMIN

        System.out.println("[JwtAuthFilter] OK memberId=" + memberId + " role=" + role);

        List<SimpleGrantedAuthority> authorities =
                (role == null || role.isBlank())
                        ? List.of()
                        : List.of(new SimpleGrantedAuthority(role));

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(new AuthPrincipal(memberId), null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        chain.doFilter(req, res);
    }
}
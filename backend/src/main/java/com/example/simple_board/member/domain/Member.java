package com.example.simple_board.member.domain;

import jakarta.persistence.*;

@Entity
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false, unique = true)
    public String email;

    @Column(nullable = false)
    public String nickname;

    protected Member() {}

    public Member(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }
}
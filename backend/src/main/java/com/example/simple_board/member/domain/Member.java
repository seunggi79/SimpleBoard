package com.example.simple_board.member.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 190)
    private String email;

    @Column(nullable = false, length = 30)
    private String nickname;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.USER; // 권한 ex) USER, ADMIN

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.ACTIVE; // 계정상태 ex) active, blocked


    protected Member() {} // protected : JPA가 호출 가능

    public Member(String email, String nickname, String passwordHash) {
        this.email = email;
        this.nickname = nickname;
        this.passwordHash = passwordHash;
        this.role = Role.USER;
        this.status = Status.ACTIVE;
    }

    public void changeRole(Role role) {
        this.role = role;
    }

    public void block() {
        this.status = Status.BLOCKED;
    }

    public void activate() {
        this.status = Status.ACTIVE;
    }

}



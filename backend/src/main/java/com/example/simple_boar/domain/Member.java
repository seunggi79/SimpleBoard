package com.example.simple_boar.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter // 나중에 제거
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    //@Column(nullable = false, unique = true, length = 255)
    private String email;

    //@Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    //@Column(nullable = false, unique = true, length = 50)
    private String nickname;

    //@Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; // = LocalDateTime.now(); 기본값

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    //protected Member() {} // JPA 기본 생성자, protected: new 생성 막기

    /*public Member(String email, String passwordHash, String nickname) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.nickname = nickname;
    }*/
}

package com.example.simple_boar.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter // 일단은 편의로 유지
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    //@Column(nullable = false, length = 200)
    private String title;

    //@Lob Stirng + @Lob -> TEXT 타입
    //@Column(nullable = false)
    private String content;

    //@Column(nullable = false)
    private long viewCount = 0L;

    //@Column(nullable = false)
    private boolean isDeleted = false;

    //@Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; //= LocalDateTime.now();

    //@Column(nullable = false)
    private LocalDateTime updatedAt; //= LocalDateTime.now();

    // 작성자 (N:1)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();
}

package com.example.simple_boar.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @Lob
    //@Column(nullable = false)
    private String content;

    //@Column(nullable = false)
    private boolean isDeleted = false;

    //@Column(nullable = false, updatable = false)
    private LocalDateTime createdAt; //= LocalDateTime.now();

    //@Column(nullable = false)
    private LocalDateTime updatedAt; //= LocalDateTime.now();


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
}

package com.example.simple_boar.post;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class PostTest {

    @Test
    void postDataTest(){
        Post post = new Post();
        post.setId(1L);
        post.setTitle("제목입니다");
        post.setContent("내용입니다");

        assertThat(post.getId()).isEqualTo(1L);
        assertThat(post.getTitle()).isEqualTo("제목입니다");
        assertThat(post.getContent()).isEqualTo("내용입니다");
    }
}

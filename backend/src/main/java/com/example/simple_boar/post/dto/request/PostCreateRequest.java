package com.example.simple_boar.post.dto.request;

import lombok.Data;

@Data
public class PostCreateRequest {
    private String title;
    private String content;

}

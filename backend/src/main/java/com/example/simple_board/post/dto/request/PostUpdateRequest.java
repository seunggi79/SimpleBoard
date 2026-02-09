package com.example.simple_board.post.dto.request;

import lombok.Data;

@Data
public class PostUpdateRequest {
    private String title;
    private String content;
}

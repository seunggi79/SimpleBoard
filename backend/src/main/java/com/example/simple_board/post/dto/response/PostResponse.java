package com.example.simple_board.post.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String content;
}


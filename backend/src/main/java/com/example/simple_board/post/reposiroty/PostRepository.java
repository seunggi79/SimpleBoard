package com.example.simple_board.post.reposiroty;

import com.example.simple_board.post.domain.Post;

import java.util.List;

public interface PostRepository {
    Post save(Post post);

    List<Post> findAll();

    Post findById(Long id);

    void deleteById(Long id);

    Post updateById(Long id, String title, String content);

}

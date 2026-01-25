package com.example.simple_boar.post.reposiroty;

import com.example.simple_boar.post.domain.Post;

import java.util.List;

public interface PostRepository {
    Post save(Post post);

    List<Post> findAll();

    Post findById(Long id);
}

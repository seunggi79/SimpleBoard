package com.example.simple_boar.post.reposiroty;

import com.example.simple_boar.post.domain.Post;
import com.example.simple_boar.post.dto.request.PostUpdateRequest;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PostRepository {
    Post save(Post post);

    List<Post> findAll();

    Post findById(Long id);

    void deleteById(Long id);

    Post updateById(Long id, String title, String content);

}

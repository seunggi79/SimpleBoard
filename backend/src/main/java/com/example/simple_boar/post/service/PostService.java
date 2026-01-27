package com.example.simple_boar.post.service;

import com.example.simple_boar.post.domain.Post;
import com.example.simple_boar.post.dto.request.PostUpdateRequest;
import com.example.simple_boar.post.reposiroty.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PostService {

    PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    public Post create(String title, String content){
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);

        Post saved = postRepository.save(post);
        return saved;
    }

    public List<Post> findAll(){
        return postRepository.findAll();
    }

    public Post findById(Long id){
        return postRepository.findById(id);
    }

    public void deleteById(Long id){
        postRepository.deleteById(id);
    }

    public Post update(Long id, String title, String content){
        Post updated = postRepository.updateById(id, title, content);
        if (updated == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "post not found");
        }
        return updated;
    }
}

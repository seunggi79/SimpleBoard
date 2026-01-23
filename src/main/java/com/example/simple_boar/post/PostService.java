package com.example.simple_boar.post;

import org.springframework.stereotype.Service;

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
}

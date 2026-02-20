package com.example.simple_board.post.service;

import com.example.simple_board.post.domain.Post;
import com.example.simple_board.post.reposiroty.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    // 생성
    public Post create(String title, String content){
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);

        Post saved = postRepository.save(post);
        return saved;
    }

    // 게시글 전체 목록 조회
    public List<Post> findAll(){
        return postRepository.findAll();
    }

    // 특정 id의 게시글 1개 조회
    public Post findById(Long id){
        return postRepository.findById(id);
    }

    // 삭제
    public void deleteById(Long id){
        postRepository.deleteById(id);
    }

    // 수정
    public Post update(Long id, String title, String content){
        Post updated = postRepository.updateById(id, title, content);
        if (updated == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "post not found");
        }
        return updated;
    }
}

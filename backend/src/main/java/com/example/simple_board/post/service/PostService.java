package com.example.simple_board.post.service;

import com.example.simple_board.post.domain.Post;
import com.example.simple_board.post.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    // 생성
    @Transactional
    public Post create(String title, String content){
        Post post = new Post(title, content);
        return postRepository.save(post);
    }

    // 게시글 전체 목록 조회
    @Transactional(readOnly = true)
    public List<Post> findAll(){
        return postRepository.findAll();
    }

    // 특정 id의 게시글 1개 조회
    @Transactional(readOnly = true)
    public Post findById(Long id){
        return postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 없습니다. id=" + id));
    }

    // 삭제 (조회 후 삭제 방식)
    @Transactional
    public void deleteById(Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("삭제할 게시글이 없습니다. id=" + id));
        postRepository.delete(post);
    }

    // 수정 (변경감지)
    @Transactional
    public Post update(Long id, String title, String content) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("수정할 게시글이 없습니다. id=" + id));

        post.update(title, content);
        return post;
    }
}
package com.example.simple_boar.post.controller;

import com.example.simple_boar.post.domain.Post;
import com.example.simple_boar.post.dto.request.PostCreateRequest;
import com.example.simple_boar.post.service.PostService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }


    // 글 생성 (POST /posts)
    @PostMapping
    public Post create(@RequestBody PostCreateRequest req) {
        return postService.create(req.getTitle(), req.getContent());
    }


    // /new 글 생성
    @GetMapping("/new")
    public String newForm() {
        return "posts/new"; // templates/posts/new.html
    }

    @PostMapping("/new")
    public String createFromForm(@RequestParam String title, @RequestParam String content){
        postService.create(title, content);
        return "redirect:/posts";
    }

    @GetMapping
    @ResponseBody
    public List<Post> list(){
        return postService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Post detail(@PathVariable Long id){
        return postService.findById(id);
    }

}

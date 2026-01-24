package com.example.simple_boar.post;

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
    public Post create(@RequestParam String title,
                       @RequestParam String content) {
        return postService.create(title, content);
    }
    @GetMapping("/new")
    public String newForm() {
        return "posts/new"; // templates/posts/new.html
    }

    @PostMapping("/new")
    public String createFromForm(@RequestParam String title, @RequestParam String content){
        postService.create(title, content);
        return "redirect:/posts";
    }

    @GetMapping("/init")
    @ResponseBody
    public String init(){
        postService.create("첫 번째 글", "첫 번째 내용");
        postService.create("두 번째 글", "두 번째 내용");
        return "ok";
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

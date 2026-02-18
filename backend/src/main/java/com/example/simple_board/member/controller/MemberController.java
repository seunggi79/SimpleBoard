package com.example.simple_board.member.controller;

import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.repository.MemberRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberRepository repo;

    public MemberController(MemberRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Member create(@RequestBody Member m) {
        return repo.save(new Member(m.email, m.nickname));
    }

    @GetMapping("/{id}")
    public Member get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @GetMapping
    public List<Member> list() {
        return repo.findAll();
    }

    @PatchMapping("/{id}")
    public Member update(@PathVariable Long id, @RequestBody Member req) {
        Member m = repo.findById(id).orElseThrow();
        if (req.nickname != null) m.nickname = req.nickname;
        return repo.save(m);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
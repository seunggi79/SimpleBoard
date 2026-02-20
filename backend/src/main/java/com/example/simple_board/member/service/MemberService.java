package com.example.simple_board.member.service;

import com.example.simple_board.member.domain.Member;
import com.example.simple_board.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository){
        this.memberRepository = memberRepository;
    }

    public Member create(String email, String nickname){
        Member member = new Member(email, nickname);
        return memberRepository.save(member);
    }

    public List<Member> findAll(){
        return memberRepository.findAll();
    }

    public Member findById(Long id){
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "member not found"));
    }

    public void deleteById(Long id){
        memberRepository.deleteById(id);
    }

    public Member update(Long id, String nickname){
        Member member = findById(id);
        if (nickname != null){
            member.nickname = nickname;
        }
        return memberRepository.save(member);
    }
}

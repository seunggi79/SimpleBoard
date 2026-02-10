package com.example.simple_board.repository;

import com.example.simple_board.domain.Member;
import com.example.simple_board.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;


@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@Rollback(false) // db 확인용
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    void save_and_find() {
        Member m = new Member("a@a.com", "hash", "nick");
        Member saved = memberRepository.save(m);

        Member found = memberRepository.findById(saved.getId()).orElseThrow();
        Assertions.assertThat(found.getEmail()).isEqualTo("a@a.com");

        System.out.println("============================");
        System.out.println("saved id = " + saved.getId());
        System.out.println("============================");

    }
}
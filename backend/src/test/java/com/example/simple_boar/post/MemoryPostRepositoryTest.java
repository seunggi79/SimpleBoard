package com.example.simple_boar.post;

import com.example.simple_boar.post.domain.Post;
import com.example.simple_boar.post.reposiroty.MemoryPostRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


public class MemoryPostRepositoryTest {

    @Test
    void save_and_findAll_and_findById(){
        MemoryPostRepository memoryPostRepository = new MemoryPostRepository();

        Post p1 = new Post();
        p1.setTitle("제목1");
        p1.setContent("내용1");

        Post p2 = new Post();
        p2.setTitle("제목2");
        p2.setContent("내용2");

        Post saved1 = memoryPostRepository.save(p1);
        Post saved2 = memoryPostRepository.save(p2);

        List<Post> all = memoryPostRepository.findAll();
        Post find1 = memoryPostRepository.findById(saved1.getId());
        Post find2 = memoryPostRepository.findById(saved2.getId());

        assertThat(all).hasSize(2);
        assertThat(all).extracting("title").containsExactly("제목1", "제목2");

        assertThat(find1.getTitle()).isEqualTo("제목1");
        assertThat(find1.getContent()).isEqualTo("내용1");

        assertThat(find2.getTitle()).isEqualTo("제목2");
        assertThat(find2.getContent()).isEqualTo("내용2");

    }
}

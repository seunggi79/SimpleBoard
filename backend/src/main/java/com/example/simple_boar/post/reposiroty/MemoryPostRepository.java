package com.example.simple_boar.post.reposiroty;

import com.example.simple_boar.post.domain.Post;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class MemoryPostRepository implements PostRepository {


    private final Map<Long, Post> store = new LinkedHashMap<>();

    // id 자동 증가용
    private final AtomicLong seq = new AtomicLong(0);

    @Override
    public Post save(Post post) {
        Long id = seq.incrementAndGet(); // 1, 2, 3, ...
        post.setId(id);
        store.put(id, post);
        return post;
    }

    @Override
    public List<Post> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Post findById(Long id) {
        return store.get(id);
    }

    @Override
    public void deleteById(Long id) {
        store.remove(id);
    }
}

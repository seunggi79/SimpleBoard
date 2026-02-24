package com.example.simple_board;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

public class BCryptTest {

    @Test
    void bcrypt_encode_and_matches() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        String raw = "1234";
        String hash1 = encoder.encode(raw);
        String hash2 = encoder.encode(raw);

        // 같은 비번이어도 해시는 매번 달라지는 게 정상(salt 때문)
        assertThat(hash1).isNotEqualTo(hash2);

        // 검증은 matches로 해야 함
        assertThat(encoder.matches(raw, hash1)).isTrue();
        assertThat(encoder.matches("wrong", hash1)).isFalse();
    }

}
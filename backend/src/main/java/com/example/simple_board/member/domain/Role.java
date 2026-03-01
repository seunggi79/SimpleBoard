package com.example.simple_board.member.domain;

public enum Role {
    USER, ADMIN;
    public String asAuthority() {
        return "ROLE_" + this.name();
    }
}

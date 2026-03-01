package com.example.simple_board.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {
    @GetMapping("/admin/ping")
    public String ping() { return "admin ok"; }
}
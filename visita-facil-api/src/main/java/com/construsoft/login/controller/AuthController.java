package com.construsoft.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.construsoft.login.service.*;;

@Controller
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/login")
    public String mostrarFormulario() {
        return "login";
    }

    @PostMapping("/login")
    public String procesarLogin(@RequestParam String username,
                                 @RequestParam String password,
                                 Model model) {
        return usuarioService.autenticar(username, password).isPresent()
                ? "redirect:/home"
                : "login";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }
}
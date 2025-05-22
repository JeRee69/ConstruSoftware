package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.model.Usuario;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class UsuarioController {
    @RequestMapping(value = "/api/usuario", method = RequestMethod.GET)
    public Usuario geUsuario(@RequestParam String username) {
        return new Usuario(null, username, username, username);
    }
    
}
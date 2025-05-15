package com.construsoft.login.service;

import java.util.Optional;
import com.construsoft.login.model.*;;

public interface UsuarioService {
    Optional<Usuario> autenticar(String username, String password);
}

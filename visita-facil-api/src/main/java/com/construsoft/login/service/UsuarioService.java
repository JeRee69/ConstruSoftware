package com.construsoft.login;

import java.util.Optional;

public interface UsuarioService {
    Optional<Usuario> autenticar(String username, String password);
}

package com.construsoft.login;

import java.util.Optional;

public interface UsuarioRepository {
    Optional<Usuario> findByUsername(String username);
}

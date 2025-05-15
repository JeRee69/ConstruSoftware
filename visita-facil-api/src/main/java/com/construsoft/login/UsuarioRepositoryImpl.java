package com.construsoft.login;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepositoryImpl implements UsuarioRepository {
    private static final List<Usuario> usuarios = List.of(
        new Usuario("usuario", "1234"),
        new Usuario("admin", "admin")
    );

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return usuarios.stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst();
    }
}

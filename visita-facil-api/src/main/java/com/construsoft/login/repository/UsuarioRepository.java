package com.construsoft.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository; // ✅ IMPORTANTE

import com.construsoft.login.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}

package com.construsoft.visita_facil_api.repository;
import com.construsoft.visita_facil_api.model.Usuario;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<User, Long> {
    Optional<Usuario> findByUsername(String username);
}
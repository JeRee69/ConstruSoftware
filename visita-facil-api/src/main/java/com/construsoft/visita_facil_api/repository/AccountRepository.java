package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.enums.Rol;
import com.construsoft.visita_facil_api.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmail(String email);
    List<Account> findAllByRol(Rol rol);
}

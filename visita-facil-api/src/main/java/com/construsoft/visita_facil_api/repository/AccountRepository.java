package com.construsoft.visita_facil_api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.construsoft.visita_facil_api.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByEmail(String email);
}

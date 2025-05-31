package com.construsoft.visita_facil_api.cuenta.repository;

import com.construsoft.visita_facil_api.cuenta.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByAccountId(Long accountId);
}
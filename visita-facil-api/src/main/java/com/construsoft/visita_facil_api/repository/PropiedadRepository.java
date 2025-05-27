package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropiedadRepository extends JpaRepository<Propiedad, Integer> {
    Optional<Propiedad> findById(Integer id);
}

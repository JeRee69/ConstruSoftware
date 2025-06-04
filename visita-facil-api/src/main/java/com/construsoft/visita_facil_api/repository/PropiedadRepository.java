package com.construsoft.visita_facil_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construsoft.visita_facil_api.model.Propiedad;

@Repository
public interface PropiedadRepository extends JpaRepository<Propiedad, Integer> {
    public List<Propiedad> findByDisponibleTrue();
}

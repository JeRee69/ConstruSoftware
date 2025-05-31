package com.construsoft.visita_facil_api.propiedad.repository;

import com.construsoft.visita_facil_api.propiedad.model.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropiedadRepository extends JpaRepository<Propiedad, Integer> {
}

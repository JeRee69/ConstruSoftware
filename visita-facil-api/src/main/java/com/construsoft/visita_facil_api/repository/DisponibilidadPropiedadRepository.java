package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.model.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;

public interface DisponibilidadPropiedadRepository extends JpaRepository<DisponibilidadPropiedad, Long> {
    List<DisponibilidadPropiedad> findByPropiedadAndDiaSemana(Propiedad propiedad, DayOfWeek diaSemana);
}

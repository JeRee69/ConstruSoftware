package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.HorarioPropiedad;
import com.construsoft.visita_facil_api.model.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;

public interface HorarioPropiedadRepository extends JpaRepository<HorarioPropiedad, Long> {
    List<HorarioPropiedad> findByPropiedadAndDia(Propiedad propiedad, DayOfWeek dia);
    List<HorarioPropiedad> findByPropiedadId(Long propiedadId);
}

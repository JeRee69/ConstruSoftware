package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DisponibilidadAgenteRepository extends JpaRepository<DisponibilidadAgente, Long> {
    List<DisponibilidadAgente> findByAgenteIdAndFecha(Long agenteId, LocalDate fecha);
    List<DisponibilidadAgente> findByFecha(LocalDate fecha);
    List<DisponibilidadAgente> findByAgenteId(Long accountId);
}

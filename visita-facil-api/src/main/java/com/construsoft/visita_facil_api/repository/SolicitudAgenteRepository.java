package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.model.SolicitudAgente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitudAgenteRepository extends JpaRepository<SolicitudAgente, Long> {
    List<SolicitudAgente> findByAgenteId(Long agenteId);
    List<SolicitudAgente> findByAgenteIdAndEstado(Long agenteId, EstadoSolicitudAgente estado);
}


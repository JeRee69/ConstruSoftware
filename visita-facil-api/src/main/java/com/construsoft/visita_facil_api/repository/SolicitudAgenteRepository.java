package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.SolicitudAgente;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SolicitudAgenteRepository extends JpaRepository<SolicitudAgente, Long> {
    List<SolicitudAgente> findByAgenteId(Long agenteId);
    List<SolicitudAgente> findByAgenteIdAndEstado(Long agenteId, EstadoSolicitudAgente estado);

    Optional<SolicitudAgente> findByAgenteAndSolicitudVisita(Account agente, SolicitudVisita visita);
}


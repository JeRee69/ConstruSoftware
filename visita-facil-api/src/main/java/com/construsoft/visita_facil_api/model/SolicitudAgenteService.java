package com.construsoft.visita_facil_api.model;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.repository.SolicitudAgenteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudAgenteService {

    private final SolicitudAgenteRepository solicitudAgenteRepository;

    public SolicitudAgenteService(SolicitudAgenteRepository solicitudAgenteRepository) {
        this.solicitudAgenteRepository = solicitudAgenteRepository;
    }

    public List<SolicitudAgente> obtenerSolicitudesPorAgente(Long agenteId) {
        return solicitudAgenteRepository.findByAgenteId(agenteId);
    }

    public List<SolicitudAgente> obtenerSolicitudesPorAgenteYEstado(Long agenteId, EstadoSolicitudAgente estado) {
        return solicitudAgenteRepository.findByAgenteIdAndEstado(agenteId, estado);
    }

}

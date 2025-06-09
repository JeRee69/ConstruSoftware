package com.construsoft.visita_facil_api.model;

import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudVisita;
import com.construsoft.visita_facil_api.repository.SolicitudAgenteRepository;
import com.construsoft.visita_facil_api.repository.SolicitudVisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudAgenteService {

    @Autowired
    private SolicitudAgenteRepository solicitudAgenteRepository;
    @Autowired
    private SolicitudVisitaRepository solicitudVisitaRepository;

    public SolicitudAgenteService(SolicitudAgenteRepository solicitudAgenteRepository) {
        this.solicitudAgenteRepository = solicitudAgenteRepository;
    }

    public List<SolicitudAgente> obtenerSolicitudesPorAgente(Long agenteId) {
        return solicitudAgenteRepository.findByAgenteId(agenteId);
    }

    public List<SolicitudAgente> obtenerSolicitudesPorAgenteYEstado(Long agenteId, EstadoSolicitudAgente estado) {
        return solicitudAgenteRepository.findByAgenteIdAndEstado(agenteId, estado);
    }

    public void procesarAccion(Long solicitudAgenteId, EstadoSolicitudAgente nuevoEstado) {
        SolicitudAgente solicitudAgente = solicitudAgenteRepository.findById(solicitudAgenteId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        solicitudAgente.setEstado(nuevoEstado);
        solicitudAgenteRepository.save(solicitudAgente);

        if (nuevoEstado == EstadoSolicitudAgente.ACEPTADA) {
            SolicitudVisita solicitudVisita = solicitudAgente.getSolicitudVisita();
            solicitudVisita.setEstado(EstadoSolicitudVisita.ACEPTADA);
            solicitudVisita.setAgente(solicitudAgente.getAgente());
            solicitudVisitaRepository.save(solicitudVisita);
        }
    }

}

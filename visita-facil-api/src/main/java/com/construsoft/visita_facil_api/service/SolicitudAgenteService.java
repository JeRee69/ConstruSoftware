package com.construsoft.visita_facil_api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.construsoft.visita_facil_api.domain.SolicitudAgenteDTO;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudVisita;
import com.construsoft.visita_facil_api.model.SolicitudAgente;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.repository.SolicitudAgenteRepository;
import com.construsoft.visita_facil_api.repository.SolicitudVisitaRepository;

@Service
public class SolicitudAgenteService {

    @Autowired
    private SolicitudAgenteRepository solicitudAgenteRepository;

    @Autowired
    private SolicitudVisitaRepository solicitudVisitaRepository;

    public SolicitudAgenteService(SolicitudAgenteRepository solicitudAgenteRepository) {
        this.solicitudAgenteRepository = solicitudAgenteRepository;
    }

    public List<SolicitudAgenteDTO> obtenerSolicitudesPorAgente(Long agenteId) {
        List<SolicitudAgente> solicitudes = solicitudAgenteRepository.findByAgenteId(agenteId);

        return solicitudes.stream().map(solicitud -> {
            SolicitudVisita visita = solicitud.getSolicitudVisita();
            return new SolicitudAgenteDTO(
                    solicitud.getId(),
                    visita.getNombreCliente(),
                    visita.getCorreoCliente(), // correo agregado aquí
                    visita.getPropiedad().getUbicacion(),
                    visita.getFecha().toString(),
                    visita.getHoraInicio().toString(),
                    solicitud.getEstado().name()
            );
        }).toList();
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

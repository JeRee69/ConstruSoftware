package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.RespuestaSolicitudAgenteDTO;
import com.construsoft.visita_facil_api.domain.SolicitudAgenteDTO;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudVisita;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import com.construsoft.visita_facil_api.model.SolicitudAgente;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.repository.AccountRepository;
import com.construsoft.visita_facil_api.repository.DisponibilidadAgenteRepository;
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

    @Autowired
    private DisponibilidadAgenteRepository disponibilidadAgenteRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<SolicitudAgenteDTO> obtenerSolicitudesPorAgente(Long agenteId) {
        List<DisponibilidadAgente> disponibilidades = disponibilidadAgenteRepository.findByAgenteId(agenteId);
        List<SolicitudVisita> visitasPendientes = solicitudVisitaRepository.findByEstado(EstadoSolicitudVisita.PENDIENTE);

        for (DisponibilidadAgente disponibilidadAgente : disponibilidades) {
            System.out.println("disponibilidadAgente:");
            System.out.println(disponibilidadAgente.getFecha());
        }

        for (SolicitudVisita solicitudVisita : visitasPendientes) {
            System.out.println("solicitudVisita:");
            System.out.println(solicitudVisita.getFecha());
        }

        return visitasPendientes.stream()
                .filter(solicitud ->
                        disponibilidades.stream().anyMatch(disp ->
                                disp.getFecha().equals(solicitud.getFecha()) &&
                                        !solicitud.getHoraInicio().isBefore(disp.getHoraInicio()) &&
                                        solicitud.getHoraInicio().isBefore(disp.getHoraFin())
                        )
                )
                .map(solicitud -> new SolicitudAgenteDTO(
                        solicitud.getId(),
                        solicitud.getNombreCliente(),
                        solicitud.getCorreoCliente(),
                        solicitud.getPropiedad().getUbicacion(),
                        solicitud.getFecha().toString(),
                        solicitud.getHoraInicio().toString(),
                        "PENDIENTE"
                ))
                .toList();
    }

    public List<SolicitudAgenteDTO> obtenerSolicitudesPorAgenteYEstado(Long agenteId, EstadoSolicitudAgente estado) {
        List<SolicitudAgente> solicitudes = solicitudAgenteRepository.findByAgenteIdAndEstado(agenteId, estado);

        return solicitudes.stream().map(solicitud -> {
            SolicitudVisita visita = solicitud.getSolicitudVisita();
            return new SolicitudAgenteDTO(
                    solicitud.getId(),
                    visita.getNombreCliente(),
                    visita.getCorreoCliente(),
                    visita.getPropiedad().getUbicacion(),
                    visita.getFecha().toString(),
                    visita.getHoraInicio().toString(),
                    solicitud.getEstado().name()
            );
        }).toList();
    }


    public void procesarAccion(RespuestaSolicitudAgenteDTO dto) {
        Long agenteId = dto.getAgenteId();
        Long visitaId = dto.getSolicitudVisitaId();
        EstadoSolicitudAgente nuevoEstado = dto.getNuevoEstado();

        if (agenteId == null || visitaId == null || nuevoEstado == null) {
            throw new RuntimeException("Faltan datos para procesar la solicitud.");
        }

        Account agente = accountRepository.findById(agenteId)
                .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

        SolicitudVisita visita = solicitudVisitaRepository.findById(visitaId)
                .orElseThrow(() -> new RuntimeException("Solicitud de visita no encontrada"));

        // Crear SolicitudAgente si no existe
        SolicitudAgente solicitudAgente = solicitudAgenteRepository
                .findByAgenteAndSolicitudVisita(agente, visita)
                .orElseGet(() -> {
                    SolicitudAgente nueva = new SolicitudAgente();
                    nueva.setAgente(agente);
                    nueva.setSolicitudVisita(visita);
                    nueva.setEstado(EstadoSolicitudAgente.PENDIENTE);
                    return solicitudAgenteRepository.save(nueva);
                });

        // Actualizar estado
        solicitudAgente.setEstado(nuevoEstado);
        solicitudAgenteRepository.save(solicitudAgente);

        if (nuevoEstado == EstadoSolicitudAgente.ACEPTADA) {
            visita.setEstado(EstadoSolicitudVisita.ACEPTADA);
            visita.setAgente(agente);
            solicitudVisitaRepository.save(visita);
        }
    }
}

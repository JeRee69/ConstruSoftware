package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudVisita;
import com.construsoft.visita_facil_api.model.*;
import com.construsoft.visita_facil_api.repository.DisponibilidadAgenteRepository;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import com.construsoft.visita_facil_api.repository.SolicitudAgenteRepository;
import com.construsoft.visita_facil_api.repository.SolicitudVisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitudVisitaService {

    @Autowired
    private SolicitudVisitaRepository solicitudRepo;
    @Autowired
    private PropiedadRepository propiedadRepo;
    @Autowired
    private DisponibilidadAgenteRepository disponibilidadAgenteRepository;
    @Autowired
    private SolicitudAgenteRepository solicitudAgenteRepository;

    public SolicitudVisita crearSolicitud(SolicitudVisitaDTO dto) {
        Optional<Propiedad> propiedadOpt = propiedadRepo.findById(dto.getIdPropiedad());

        if (propiedadOpt.isEmpty()) {
            throw new IllegalArgumentException("Propiedad no encontrada");
        }

        SolicitudVisita solicitud = new SolicitudVisita();
        solicitud.setNombreCliente(dto.getNombre());
        solicitud.setCorreoCliente(dto.getCorreo());
        solicitud.setTelefonoCliente(dto.getTelefono());
        solicitud.setFecha(dto.getFecha());
        solicitud.setHoraInicio(dto.getHora());
        solicitud.setPropiedad(propiedadOpt.get());

        SolicitudVisita solicitudGuardada = solicitudRepo.save(solicitud);

        List<Account> agentesDisponibles = findAgentesDisponibles(dto.getFecha(), dto.getHora());

        List<SolicitudAgente> solicitudesAgente = agentesDisponibles.stream().map(agente -> {
            SolicitudAgente sa = new SolicitudAgente();
            sa.setAgente(agente);
            sa.setSolicitudVisita(solicitudGuardada);
            sa.setEstado(EstadoSolicitudAgente.PENDIENTE);
            return sa;
        }).toList();

        solicitudAgenteRepository.saveAll(solicitudesAgente);
        return solicitudGuardada;
    }

    private List<Account> findAgentesDisponibles(LocalDate fecha, LocalTime hora) {
        List<DisponibilidadAgente> disponibilidades = disponibilidadAgenteRepository.findByFecha(fecha);
        System.out.println(disponibilidades);

        return disponibilidades.stream()
                .filter(d -> !hora.isBefore(d.getHoraInicio()) && hora.isBefore(d.getHoraFin()))
                .filter(d -> Duration.between(d.getHoraInicio(), d.getHoraFin()).toMinutes() >= 60)
                .map(DisponibilidadAgente::getAgente)
                .distinct()
                .collect(Collectors.toList());
    }

    public boolean cancelarVisita(Long id) {
        Optional<SolicitudVisita> visitaOpt = solicitudRepo.findById(id);
        if (visitaOpt.isPresent()) {
            SolicitudVisita visita = visitaOpt.get();
            if (visita.getEstado() != EstadoSolicitudVisita.CANCELADA && visita.getEstado() != EstadoSolicitudVisita.REALIZADA) {
                visita.setEstado(EstadoSolicitudVisita.CANCELADA);
                solicitudRepo.save(visita);
                return true;
            }
        }

        return false;
    }

}

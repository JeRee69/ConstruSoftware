package com.construsoft.visita_facil_api.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        LocalDate hoy = LocalDate.now();
        LocalTime ahora = LocalTime.now();

        return visitasPendientes.stream()
                .filter(solicitud ->
                        // fecha posterior o igual a hoy, y si es hoy debe ser en el futuro
                        solicitud.getFecha().isAfter(hoy) ||
                                (solicitud.getFecha().isEqual(hoy) && solicitud.getHoraInicio().isAfter(ahora))
                )
                .filter(solicitud ->
                        disponibilidades.stream().anyMatch(disp ->
                                disp.getFecha().equals(solicitud.getFecha()) &&
                                        !solicitud.getHoraInicio().isBefore(disp.getHoraInicio()) &&
                                        solicitud.getHoraInicio().isBefore(disp.getHoraFin())
                        )
                )
                .map(solicitud -> new SolicitudAgenteDTO(
                        solicitud.getId(),
                        solicitud.getPropiedad().getId(),
                        solicitud.getPropiedad().getTitulo(),
                        solicitud.getNombreCliente(),
                        solicitud.getCorreoCliente(),
                        solicitud.getTelefonoCliente(),
                        solicitud.getPropiedad().getUbicacion(),
                        solicitud.getFecha().toString(),
                        solicitud.getHoraInicio().toString(),
                        "PENDIENTE"
                ))
                .toList();
    }

    public List<SolicitudAgenteDTO> obtenerSolicitudesPorAgenteYEstado(Long agenteId, EstadoSolicitudAgente estado) {
        List<SolicitudAgente> solicitudes = solicitudAgenteRepository.findByAgenteIdAndEstado(agenteId, estado);

        LocalDate hoy = LocalDate.now();
        LocalTime ahora = LocalTime.now();

        // Si es estado ACEPTADA, filtrar solo las futuras
        if (estado == EstadoSolicitudAgente.ACEPTADA) {
            solicitudes = solicitudes.stream()
                    .filter(sa -> {
                        LocalDate fecha = sa.getSolicitudVisita().getFecha();
                        LocalTime hora = sa.getSolicitudVisita().getHoraInicio();
                        return fecha.isAfter(hoy) || (fecha.isEqual(hoy) && hora.isAfter(ahora));
                    })
                    .toList();
        }

        return solicitudes.stream().map(solicitud -> {
            SolicitudVisita visita = solicitud.getSolicitudVisita();
            return new SolicitudAgenteDTO(
                    solicitud.getId(),
                    visita.getPropiedad().getId(),
                    visita.getPropiedad().getTitulo(),
                    visita.getNombreCliente(),
                    visita.getCorreoCliente(),
                    visita.getTelefonoCliente(),
                    visita.getPropiedad().getUbicacion(),
                    visita.getFecha().toString(),
                    visita.getHoraInicio().toString(),
                    solicitud.getEstado().name()
            );
        }).toList();
    }

    public List<SolicitudAgenteDTO> obtenerSolicitudesRealizadas(Long agenteId) {
        List<SolicitudAgente> solicitudes = solicitudAgenteRepository.findByAgenteIdAndEstado(agenteId, EstadoSolicitudAgente.ACEPTADA);

        LocalDate hoy = LocalDate.now();
        LocalTime ahora = LocalTime.now();

        return solicitudes.stream()
                .filter(sa -> {
                    SolicitudVisita visita = sa.getSolicitudVisita();
                    // solo si NO está cancelada
                    if (visita.getEstado() == EstadoSolicitudVisita.CANCELADA) return false;

                    LocalDate fecha = visita.getFecha();
                    LocalTime hora = visita.getHoraInicio();
                    return fecha.isBefore(hoy) || (fecha.isEqual(hoy) && hora.isBefore(ahora));
                })
                .map(solicitud -> {
                    SolicitudVisita visita = solicitud.getSolicitudVisita();
                    return new SolicitudAgenteDTO(
                            solicitud.getId(),
                            visita.getPropiedad().getId(),
                            visita.getPropiedad().getTitulo(),
                            visita.getNombreCliente(),
                            visita.getCorreoCliente(),
                            visita.getTelefonoCliente(),
                            visita.getPropiedad().getUbicacion(),
                            visita.getFecha().toString(),
                            visita.getHoraInicio().toString(),
                            solicitud.getEstado().name()
                    );
                })
                .toList();
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


        SolicitudAgente solicitudAgente = solicitudAgenteRepository
                .findByAgenteAndSolicitudVisita(agente, visita)
                .orElseGet(() -> {
                    SolicitudAgente nueva = new SolicitudAgente();
                    nueva.setAgente(agente);
                    nueva.setSolicitudVisita(visita);
                    nueva.setEstado(EstadoSolicitudAgente.ACEPTADA);
                    return solicitudAgenteRepository.save(nueva);
                });


        solicitudAgente.setEstado(nuevoEstado);
        solicitudAgenteRepository.save(solicitudAgente);

        if (nuevoEstado == EstadoSolicitudAgente.ACEPTADA) {
            visita.setEstado(EstadoSolicitudVisita.ACEPTADA);
            visita.setAgente(agente);
            solicitudVisitaRepository.save(visita);
        }
    }

    public void cancelarSolicitudAgente(Long solicitudAgenteId, Long agenteId) {
        SolicitudAgente solicitudAgente = solicitudAgenteRepository.findById(solicitudAgenteId)
                .orElseThrow(() -> new RuntimeException("SolicitudAgente no encontrada"));

        if (!solicitudAgente.getAgente().getId().equals(agenteId)) {
            throw new RuntimeException("Este agente no tiene permiso para cancelar esta solicitud");
        }

        solicitudAgente.setEstado(EstadoSolicitudAgente.CANCELADA);
        solicitudAgenteRepository.save(solicitudAgente);

        SolicitudVisita solicitudVisita = solicitudAgente.getSolicitudVisita();
        solicitudVisita.setEstado(EstadoSolicitudVisita.PENDIENTE);
        solicitudVisita.setAgente(null); 
        solicitudVisitaRepository.save(solicitudVisita);
    }

}

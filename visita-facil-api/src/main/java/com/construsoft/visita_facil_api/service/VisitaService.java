package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.HorarioDisponibleDTO;
import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.enums.EstadoVisita;
import com.construsoft.visita_facil_api.enums.Rol;
import com.construsoft.visita_facil_api.model.*;
import com.construsoft.visita_facil_api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VisitaService {

    @Autowired
    private PropiedadRepository propiedadRepo;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private ClienteRepository clienteRepo;
    @Autowired
    private VisitaRepository visitaRepo;
    @Autowired
    private HorarioPropiedadRepository horarioPropiedadRepo;
    @Autowired
    private DisponibilidadAgenteRepository disponibilidadRepo;

    public List<HorarioDisponibleDTO> obtenerHorariosDisponibles(Long propiedadId, LocalDate fecha) {
        Propiedad propiedad = propiedadRepo.findById(propiedadId)
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));

        List<HorarioPropiedad> horariosPropiedad = horarioPropiedadRepo.findByPropiedadAndDia(propiedad, fecha.getDayOfWeek());

        List<Account> agentes = accountRepo.findAllByRol(Rol.AGENTE);

        List<HorarioDisponibleDTO> disponibles = new ArrayList<>();

        for (HorarioPropiedad hp : horariosPropiedad) {
            for (Account agente : agentes) {
                List<DisponibilidadAgente> dispAgente = disponibilidadRepo.findByAgenteAndDia(agente, fecha.getDayOfWeek());

                for (DisponibilidadAgente da : dispAgente) {
                    // Calcular intersección entre hp y da
                    LocalTime inicio = max(hp.getHoraInicio(), da.getHoraInicio());
                    LocalTime fin = min(hp.getHoraFin(), da.getHoraFin());

                    if (inicio.isBefore(fin)) {
                        // Buscar si ya existe ese rango en la lista
                        Optional<HorarioDisponibleDTO> existente = disponibles.stream()
                                .filter(d -> d.getHoraInicio().equals(inicio) && d.getHoraFin().equals(fin))
                                .findFirst();

                        if (existente.isPresent()) {
                            existente.get().getAgentesDisponibles().add(agente.getId());
                        } else {
                            List<Long> agentesList = new ArrayList<>();
                            agentesList.add(agente.getId());
                            disponibles.add(new HorarioDisponibleDTO(fecha, inicio, fin, agentesList));
                        }
                    }
                }
            }
        }

        return disponibles;
    }


    public Visita agendarVisita(SolicitudVisitaDTO dto) {
        Propiedad propiedad = propiedadRepo.findById(dto.getPropiedadId())
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));

        Account agente = null; // asignación automática???
        if (dto.getAgenteId() != null){
            agente = accountRepo.findById(dto.getAgenteId())
                    .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

            // Validar que agente no esté ocupado en ese horario
            boolean ocupado = visitaRepo.existsByAgenteAndFechaAndHora(agente, dto.getFecha(), dto.getHora());
            if (ocupado) throw new RuntimeException("Agente no disponible en ese horario");
        }

        // Guardar cliente
        Cliente cliente = new Cliente();
        cliente.setNombre(dto.getNombreCliente());
        cliente.setCorreo(dto.getCorreoCliente());
        cliente.setTelefono(dto.getTelefonoCliente());
        cliente = clienteRepo.save(cliente);

        // Crear visita
        Visita visita = new Visita();
        visita.setFecha(dto.getFecha());
        visita.setHora(dto.getHora());
        visita.setEstado(agente == null ? EstadoVisita.PENDIENTE : EstadoVisita.CONFIRMADA);
        visita.setPropiedad(propiedad);
        visita.setAgente(agente);
        visita.setClienteNombre(cliente.getNombre());
        visita.setClienteTelefono(cliente.getTelefono());
        visita.setClienteEmail(cliente.getCorreo());

        return visitaRepo.save(visita);
    }

    private LocalTime max(LocalTime a, LocalTime b) {
        return a.isAfter(b) ? a : b;
    }

    private LocalTime min(LocalTime a, LocalTime b) {
        return a.isBefore(b) ? a : b;
    }

}

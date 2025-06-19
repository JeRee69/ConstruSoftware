package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.ObtencionDisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.domain.RegistroDisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.repository.DisponibilidadPropiedadRepository;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import com.construsoft.visita_facil_api.repository.SolicitudVisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class DisponibilidadPropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepo;

    @Autowired
    private DisponibilidadPropiedadRepository disponibilidadRepo;

    @Autowired
    private SolicitudVisitaRepository solicitudVisitaRepo;

    public DisponibilidadPropiedad registrarDisponibilidad(RegistroDisponibilidadPropiedadDTO dto) {
        Optional<Propiedad> propiedadOpt = propiedadRepo.findById(dto.getIdPropiedad());
        if (propiedadOpt.isEmpty()) {
            throw new IllegalArgumentException("Propiedad no encontrada");
        }

        DisponibilidadPropiedad disponibilidad = new DisponibilidadPropiedad();
        disponibilidad.setPropiedad(propiedadOpt.get());
        disponibilidad.setDiaSemana(dto.getDia());
        disponibilidad.setHoraInicio(dto.getHoraInicio());
        disponibilidad.setHoraFin(dto.getHoraFin());

        return disponibilidadRepo.save(disponibilidad);
    }

    public List<DisponibilidadPropiedad> listarPorPropiedad(Long idPropiedad) {
        Propiedad propiedad = propiedadRepo.findById(Math.toIntExact(idPropiedad))
                .orElseThrow(() -> new IllegalArgumentException("Propiedad no encontrada"));

        return disponibilidadRepo.findByPropiedad(propiedad);
    }

    public void eliminar(Long id) {
        disponibilidadRepo.deleteById(id);
    }


    public List<ObtencionDisponibilidadPropiedadDTO> obtenerHorariosDisponibles(Long propiedadId, LocalDate fecha) {
        DayOfWeek dia = fecha.getDayOfWeek();

        Optional<Propiedad> propiedad = propiedadRepo.findById(Math.toIntExact(propiedadId));

        if (propiedad.isEmpty()) {
            throw new IllegalArgumentException("Propiedad no encontrada");
        }

        Propiedad propiedadAct = propiedad.get();

        // 1. Traer disponibilidad general
        List<DisponibilidadPropiedad> disponibilidades = disponibilidadRepo
                .findByPropiedadAndDiaSemana(propiedadAct, dia);

        // 2. Traer visitas agendadas para ese día
        List<SolicitudVisita> horariosOcupados = solicitudVisitaRepo
                .findByPropiedadIdAndFecha(Math.toIntExact(propiedadId), fecha);

        Set<LocalTime> horasNoDisponibles = new HashSet<>();

        for (SolicitudVisita visita : horariosOcupados) {
            LocalTime horaTruncada = visita.getHoraInicio();
            horasNoDisponibles.add(horaTruncada);
        }

        List<ObtencionDisponibilidadPropiedadDTO> resultado = new ArrayList<>();

        // 3. Dividir bloques y filtrar
        for (DisponibilidadPropiedad disp : disponibilidades) {
            LocalTime hora = disp.getHoraInicio();

            while (!hora.plusHours(1).isAfter(disp.getHoraFin())) {
                LocalTime bloque = hora.truncatedTo(ChronoUnit.HOURS);

                if (!horasNoDisponibles.contains(bloque)) {
                    ObtencionDisponibilidadPropiedadDTO dto = new ObtencionDisponibilidadPropiedadDTO();
                    dto.setIdPropiedad(propiedadId);
                    dto.setFecha(fecha);
                    dto.setHoraInicio(bloque);
                    dto.setHoraFin(bloque.plusHours(1));
                    resultado.add(dto);
                }

                hora = hora.plusHours(1);
            }
        }

        return resultado;
    }

}

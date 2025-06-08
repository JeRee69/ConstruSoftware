package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.DisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.repository.DisponibilidadPropiedadRepository;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DisponibilidadPropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepo;

    @Autowired
    private DisponibilidadPropiedadRepository disponibilidadRepo;

    public DisponibilidadPropiedad registrarDisponibilidad(DisponibilidadPropiedadDTO dto) {
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

    public List<DisponibilidadPropiedadDTO> obtenerHorariosDisponibles(Long propiedadId, LocalDate fecha) {
        Propiedad propiedad = propiedadRepo.findById(Math.toIntExact(propiedadId))
                .orElseThrow(() -> new IllegalArgumentException("Propiedad no encontrada"));
        DayOfWeek diaSemana = fecha.getDayOfWeek();

        List<DisponibilidadPropiedad> disponibilidades =
                disponibilidadRepo.findByPropiedadAndDiaSemana(propiedad, diaSemana);

        return disponibilidades.stream().map(dp -> new DisponibilidadPropiedadDTO(
                (long) propiedad.getId(),
                dp.getDiaSemana(),
                dp.getHoraInicio(),
                dp.getHoraFin())).collect(Collectors.toList());
    }

}

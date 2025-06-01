package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.DisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.repository.DisponibilidadPropiedadRepository;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DisponibilidadPropiedadService {

    @Autowired
    private DisponibilidadPropiedadRepository disponibilidadRepo;

    @Autowired
    private PropiedadRepository propiedadRepo;

    public DisponibilidadPropiedad registrarDisponibilidad(DisponibilidadPropiedadDTO dto) {
        Optional<Propiedad> propiedadOpt = propiedadRepo.findById(dto.getPropiedadId());
        if (propiedadOpt.isEmpty()) {
            throw new IllegalArgumentException("Propiedad no encontrada");
        }

        DisponibilidadPropiedad disponibilidad = new DisponibilidadPropiedad();
        disponibilidad.setPropiedad(propiedadOpt.get());
        disponibilidad.setFecha(dto.getFecha());
        disponibilidad.setHoraInicio(dto.getHoraInicio());
        disponibilidad.setHoraFin(dto.getHoraFin());

        return disponibilidadRepo.save(disponibilidad);
    }

}

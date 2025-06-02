package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import com.construsoft.visita_facil_api.repository.SolicitudVisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SolicitudVisitaService {

    @Autowired
    private SolicitudVisitaRepository solicitudRepo;

    @Autowired
    private PropiedadRepository propiedadRepo;

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

        return solicitudRepo.save(solicitud);
    }

}

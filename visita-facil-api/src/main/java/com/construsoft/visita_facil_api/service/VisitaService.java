package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.DisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.enums.EstadoVisita;
import com.construsoft.visita_facil_api.model.Cliente;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.Visita;
import com.construsoft.visita_facil_api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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
    private DisponibilidadPropiedadRepository horarioPropiedadRepo;
    @Autowired
    private DisponibilidadAgenteRepository disponibilidadRepo;

    public List<DisponibilidadPropiedadDTO> getHorariosDisponibles(Long propiedadId, LocalDate fecha) {
        return null;
    }


    public Visita agendarVisita(SolicitudVisitaDTO dto) {
        Propiedad propiedad = propiedadRepo.findById(dto.getPropiedadId().intValue())
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));

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
        visita.setEstado(EstadoVisita.CONFIRMADA);
        visita.setPropiedad(propiedad);
        visita.setAgente(null);
        visita.setClienteNombre(cliente.getNombre());
        visita.setClienteTelefono(cliente.getTelefono());
        visita.setClienteEmail(cliente.getCorreo());

        return visitaRepo.save(visita);
    }

}

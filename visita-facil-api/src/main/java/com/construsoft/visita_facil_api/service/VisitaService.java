package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.enums.EstadoVisita;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.Cliente;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.Visita;
import com.construsoft.visita_facil_api.repository.AccountRepository;
import com.construsoft.visita_facil_api.repository.ClienteRepository;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import com.construsoft.visita_facil_api.repository.VisitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}

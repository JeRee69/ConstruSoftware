package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.domain.BloqueHorarioDTO;
import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.enums.EstadoVisita;
import com.construsoft.visita_facil_api.model.*;
import com.construsoft.visita_facil_api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class VisitaService {

    @Autowired
    private PropiedadRepository propiedadRepo;
    @Autowired
    private DisponibilidadPropiedadRepository disponibilidadPropiedadRepo;
    @Autowired
    private DisponibilidadAgenteRepository disponibilidadAgenteRepo;
    @Autowired
    private ClienteRepository clienteRepo;
    @Autowired
    private VisitaRepository visitaRepo;

    public List<BloqueHorarioDTO> obtenerHorariosDisponibles(int propiedadId) {
        List<DisponibilidadAgente> agentesDisponibles = disponibilidadAgenteRepo.findAll();
        List<DisponibilidadPropiedad> propiedadesDisponibles = disponibilidadPropiedadRepo.findByPropiedadId(propiedadId);

        List<BloqueHorarioDTO> resultado = new ArrayList<>();

        for (DisponibilidadPropiedad dp : propiedadesDisponibles) {
            for (DisponibilidadAgente da : agentesDisponibles) {
                if (dp.getFecha().equals(da.getFecha())) {
                    // Calcular intersección
                    LocalTime inicio = dp.getHoraInicio().isAfter(da.getHoraInicio()) ? dp.getHoraInicio() : da.getHoraInicio();
                    LocalTime fin = dp.getHoraFin().isBefore(da.getHoraFin()) ? dp.getHoraFin() : da.getHoraFin();

                    if (inicio.isBefore(fin)) {
                        resultado.add(new BloqueHorarioDTO(dp.getFecha(), inicio, fin));
                    }
                }
            }
        }

        return resultado;
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

package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.repository.AccountRepository;
import com.construsoft.visita_facil_api.domain.DisponibilidadAgenteDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import com.construsoft.visita_facil_api.repository.DisponibilidadAgenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisponibilidadService {

    @Autowired
    private DisponibilidadAgenteRepository disponibilidadRepo;

    @Autowired
    private AccountRepository accountRepo;

    public void registrarDisponibilidad(DisponibilidadAgenteDTO dto){
        Account agente = accountRepo.findById(dto.getAccountId())
                .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

        DisponibilidadAgente disponibilidad = new DisponibilidadAgente();
        disponibilidad.setAgente(agente);
        disponibilidad.setDia(dto.getDia());
        disponibilidad.setHoraInicio(dto.getHoraInicio());
        disponibilidad.setHoraFin(dto.getHoraFin());

        disponibilidadRepo.save(disponibilidad);
    }

}

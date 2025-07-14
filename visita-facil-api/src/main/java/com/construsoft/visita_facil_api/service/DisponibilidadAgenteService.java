package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.repository.AccountRepository;
import com.construsoft.visita_facil_api.domain.DisponibilidadAgenteDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import com.construsoft.visita_facil_api.repository.DisponibilidadAgenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DisponibilidadAgenteService {

    @Autowired
    private DisponibilidadAgenteRepository disponibilidadRepo;

    @Autowired
    private AccountRepository accountRepo;

    public DisponibilidadAgente registrar(DisponibilidadAgenteDTO dto){
        Account agente = accountRepo.findById(dto.getAccountId())
                .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

        DisponibilidadAgente disponibilidad = new DisponibilidadAgente();
        disponibilidad.setAgente(agente);
        disponibilidad.setFecha(dto.getFecha());
        disponibilidad.setHoraInicio(dto.getHoraInicio());
        disponibilidad.setHoraFin(dto.getHoraFin());

        return disponibilidadRepo.save(disponibilidad);
    }

    public List<DisponibilidadAgente> obtenerPorAgente(Long accountId) {
        return disponibilidadRepo.findByAgenteIdAndFechaGreaterThanEqual(accountId, LocalDate.now());
    }


    public void eliminarPorId(Long id) {
        if (!disponibilidadRepo.existsById(id)) {
            throw new IllegalArgumentException("Disponibilidad no encontrada");
        }
        disponibilidadRepo.deleteById(id);
    }



}

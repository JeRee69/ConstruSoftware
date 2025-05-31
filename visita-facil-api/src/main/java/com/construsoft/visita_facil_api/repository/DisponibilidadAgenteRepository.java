package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;

public interface DisponibilidadAgenteRepository extends JpaRepository<DisponibilidadAgente, Long> {
    List<DisponibilidadAgente> findByAgenteAndDia(Account agente, DayOfWeek dia);
}

package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.Visita;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.enums.EstadoVisita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface VisitaRepository extends JpaRepository<Visita, Long> {
    List<Visita> findByAgente(Account agente);
    List<Visita> findByPropiedad(Propiedad propiedad);
    boolean existsByAgenteAndFechaAndHora(Account agente, LocalDate fecha, LocalTime hora);
    List<Visita> findByFechaAndHora(LocalDate fecha, LocalTime hora);
    Optional<Visita> findByIdAndEstado(Long id, EstadoVisita estado);
}

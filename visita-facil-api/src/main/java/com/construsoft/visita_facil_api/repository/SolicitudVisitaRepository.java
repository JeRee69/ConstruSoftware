package com.construsoft.visita_facil_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.construsoft.visita_facil_api.model.SolicitudVisita;

public interface SolicitudVisitaRepository extends JpaRepository<SolicitudVisita, Long> {

    List<SolicitudVisita> findByCorreoClienteAndEstado(String correoCliente, String estado);

}


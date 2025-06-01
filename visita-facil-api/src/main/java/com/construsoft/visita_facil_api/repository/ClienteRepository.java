package com.construsoft.visita_facil_api.repository;

import com.construsoft.visita_facil_api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {}

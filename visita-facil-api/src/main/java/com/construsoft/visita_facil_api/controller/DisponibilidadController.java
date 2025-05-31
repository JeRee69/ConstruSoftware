package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.DisponibilidadAgenteDTO;
import com.construsoft.visita_facil_api.service.DisponibilidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/disponibilidad")
public class DisponibilidadController {

    @Autowired
    private DisponibilidadService disponibilidadService;

    @PostMapping
    public ResponseEntity<Void> registrar(@RequestBody DisponibilidadAgenteDTO dto) {
        disponibilidadService.registrarDisponibilidad(dto);
        return ResponseEntity.ok().build();
    }

}

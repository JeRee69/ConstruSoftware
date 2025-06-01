package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.model.Visita;
import com.construsoft.visita_facil_api.service.VisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/visitas")
public class VisitaController {

    @Autowired
    private VisitaService visitaService;

    @PostMapping("/agendar")
    public ResponseEntity<?> agendarVisita(@RequestBody SolicitudVisitaDTO dto) {
        try {
            Visita visita = visitaService.agendarVisita(dto);
            return ResponseEntity.ok(visita);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

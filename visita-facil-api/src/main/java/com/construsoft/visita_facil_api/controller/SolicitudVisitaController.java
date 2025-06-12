package com.construsoft.visita_facil_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.service.SolicitudVisitaService;

@RestController
@RequestMapping("/visitas")
@CrossOrigin(origins = "*") // Puedes limitar esto si es necesario
public class SolicitudVisitaController {

    @Autowired
    private SolicitudVisitaService solicitudVisitaService;

    @PostMapping("/solicitar")
    public ResponseEntity<?> solicitar(@RequestBody SolicitudVisitaDTO dto) {
        try {
            SolicitudVisita visita = solicitudVisitaService.crearSolicitud(dto);
            return ResponseEntity.ok(visita);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error: " + e.getMessage());
        }
    }
}

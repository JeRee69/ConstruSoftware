package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.BloqueHorarioDTO;
import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.model.Visita;
import com.construsoft.visita_facil_api.service.VisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visitas")
public class VisitaController {

    @Autowired
    private VisitaService visitaService;

    @GetMapping("/horarios-disponibles")
    public ResponseEntity<List<BloqueHorarioDTO>> getHorariosDisponibles(@RequestParam int propiedadId) {
        List<BloqueHorarioDTO> disponibles = visitaService.obtenerHorariosDisponibles(propiedadId);
        return ResponseEntity.ok(disponibles);
    }

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

package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.DisponibilidadAgenteDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import com.construsoft.visita_facil_api.service.DisponibilidadAgenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/disponibilidad/agente")
@CrossOrigin(origins = "*")
public class DisponibilidadAgenteController {

    @Autowired
    private DisponibilidadAgenteService disponibilidadAgenteService;

    @PostMapping("/registrar")
    public ResponseEntity<DisponibilidadAgente> registrar(@RequestBody DisponibilidadAgenteDTO dto) {
        DisponibilidadAgente nuevaDisponibilidad = disponibilidadAgenteService.registrar(dto);
        return ResponseEntity.ok(nuevaDisponibilidad);
    }

}

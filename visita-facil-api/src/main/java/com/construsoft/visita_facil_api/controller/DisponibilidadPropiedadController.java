package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.DisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.service.DisponibilidadPropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/disponibilidad/propiedad")
@CrossOrigin(origins = "*")
public class DisponibilidadPropiedadController {

    @Autowired
    private DisponibilidadPropiedadService servicio;

    @PostMapping("/registrar")
    public ResponseEntity<DisponibilidadPropiedad> registrar(@RequestBody DisponibilidadPropiedadDTO dto) {
        DisponibilidadPropiedad nueva = servicio.registrarDisponibilidad(dto);
        return ResponseEntity.ok(nueva);
    }

}

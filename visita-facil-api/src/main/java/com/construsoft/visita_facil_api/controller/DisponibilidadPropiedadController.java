package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.DisponibilidadPropiedadDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadPropiedad;
import com.construsoft.visita_facil_api.service.DisponibilidadPropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/disponibilidad/propiedades")
@CrossOrigin(origins = "*")
public class DisponibilidadPropiedadController {

    @Autowired
    private DisponibilidadPropiedadService disponibilidadPropiedadService;

    @PostMapping("/registrar")
    public ResponseEntity<DisponibilidadPropiedad> registrar(@RequestBody DisponibilidadPropiedadDTO dto) {
        DisponibilidadPropiedad disponibilidadPropiedad = disponibilidadPropiedadService.registrarDisponibilidad(dto);
        return ResponseEntity.ok(disponibilidadPropiedad);
    }

    @GetMapping("/{idPropiedad}")
    public List<DisponibilidadPropiedadDTO> obtenerHorarios(
            @PathVariable Long idPropiedad,
            @RequestParam LocalDate fecha) {

        return disponibilidadPropiedadService.obtenerHorariosDisponibles(idPropiedad, fecha);
    }

}

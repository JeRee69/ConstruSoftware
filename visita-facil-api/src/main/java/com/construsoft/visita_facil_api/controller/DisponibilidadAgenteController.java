package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.DisponibilidadAgenteDTO;
import com.construsoft.visita_facil_api.model.DisponibilidadAgente;
import com.construsoft.visita_facil_api.service.DisponibilidadAgenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disponibilidad/agentes")
@CrossOrigin(origins = "*")
public class DisponibilidadAgenteController {

    @Autowired
    private DisponibilidadAgenteService disponibilidadAgenteService;

    @PostMapping("/registrar")
    public ResponseEntity<DisponibilidadAgente> registrar(@RequestBody DisponibilidadAgenteDTO dto) {
        System.out.println(dto.getFecha());
        DisponibilidadAgente disponibilidad = disponibilidadAgenteService.registrar(dto);
        System.out.println(disponibilidad.getFecha());
        return ResponseEntity.ok(disponibilidad);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<List<DisponibilidadAgente>> obtenerDisponibilidades(@PathVariable Long accountId) {
        List<DisponibilidadAgente> lista = disponibilidadAgenteService.obtenerPorAgente(accountId);
        for (DisponibilidadAgente disponibilidad : lista) {
            System.out.println(disponibilidad.getFecha());
        }
        return ResponseEntity.ok(lista);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDisponibilidad(@PathVariable Long id) {
        disponibilidadAgenteService.eliminarPorId(id);
        return ResponseEntity.noContent().build();
    }


}

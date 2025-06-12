package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.service.SolicitudVisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/visitas/solicitud")
@CrossOrigin(origins = "*")
public class SolicitudVisitaController {

    @Autowired
    private SolicitudVisitaService solicitudService;
    @Autowired
    private SolicitudVisitaService solicitudVisitaService;

    @PostMapping
    public ResponseEntity<SolicitudVisita> crearSolicitud(@RequestBody SolicitudVisitaDTO dto) {
        SolicitudVisita solicitud = solicitudService.crearSolicitud(dto);
        return ResponseEntity.ok(solicitud);
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<String> cancelarVisita(@PathVariable Long id) {
        boolean cancelada = solicitudVisitaService.cancelarVisita(id);
        if (cancelada) {
            return ResponseEntity.ok("Visita cancelada con éxito");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Visita no encontrada o no se puede cancelar");
        }
    }
    
    @GetMapping("/historial")
    public ResponseEntity<List<SolicitudVisita>> obtenerHistorialPorCorreo(@RequestParam String correo) {
        List<SolicitudVisita> historial = solicitudVisitaService.obtenerHistorialPorCorreo(correo);
        return ResponseEntity.ok(historial);
    }


}

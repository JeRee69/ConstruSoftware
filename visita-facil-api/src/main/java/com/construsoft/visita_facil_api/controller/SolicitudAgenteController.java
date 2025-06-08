package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.model.SolicitudAgente;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.model.SolicitudAgenteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solicitudes-agente")
public class SolicitudAgenteController {

    private final SolicitudAgenteService solicitudAgenteService;

    public SolicitudAgenteController(SolicitudAgenteService solicitudAgenteService) {
        this.solicitudAgenteService = solicitudAgenteService;
    }

    @GetMapping("/{agenteId}")
    public List<SolicitudAgente> obtenerSolicitudes(@PathVariable Long agenteId) {
        return solicitudAgenteService.obtenerSolicitudesPorAgente(agenteId);
    }

    @GetMapping("/{agenteId}/estado")
    public List<SolicitudAgente> obtenerSolicitudesPorEstado(
            @PathVariable Long agenteId,
            @RequestParam EstadoSolicitudAgente estado
    ) {
        return solicitudAgenteService.obtenerSolicitudesPorAgenteYEstado(agenteId, estado);
    }
    
}

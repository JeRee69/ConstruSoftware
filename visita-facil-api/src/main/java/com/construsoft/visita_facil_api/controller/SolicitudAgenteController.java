package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.CancelacionAgenteDTO;
import com.construsoft.visita_facil_api.domain.RespuestaSolicitudAgenteDTO;
import com.construsoft.visita_facil_api.domain.SolicitudAgenteDTO;
import com.construsoft.visita_facil_api.enums.EstadoSolicitudAgente;
import com.construsoft.visita_facil_api.model.SolicitudAgente;
import com.construsoft.visita_facil_api.service.SolicitudAgenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solicitudes-agente")
public class SolicitudAgenteController {

    @Autowired
    private SolicitudAgenteService solicitudAgenteService;

    @GetMapping("/{agenteId}")
    public List<SolicitudAgenteDTO> obtenerSolicitudes(@PathVariable Long agenteId) {
        return solicitudAgenteService.obtenerSolicitudesPorAgente(agenteId);
    }

    @GetMapping("/{agenteId}/estado")
    public List<SolicitudAgenteDTO> obtenerSolicitudesPorEstado(
            @PathVariable Long agenteId,
            @RequestParam EstadoSolicitudAgente estado
    ) {
        return solicitudAgenteService.obtenerSolicitudesPorAgenteYEstado(agenteId, estado);
    }

    @PutMapping("/cancelar")
    public ResponseEntity<String> cancelarSolicitud(@RequestBody CancelacionAgenteDTO dto) {
        solicitudAgenteService.cancelarSolicitudAgente(dto.getSolicitudVisitaId(), dto.getAgenteId());
        return ResponseEntity.ok("Solicitud cancelada correctamente");
    }



    @PutMapping("/accion")
    public ResponseEntity<String> procesarAccion(@RequestBody RespuestaSolicitudAgenteDTO dto) {
        solicitudAgenteService.procesarAccion(dto);
        return ResponseEntity.ok("Acción procesada con éxito");
    }

    @GetMapping("/{agenteId}/realizadas")
    public List<SolicitudAgenteDTO> obtenerRealizadas(@PathVariable Long agenteId) {
        return solicitudAgenteService.obtenerSolicitudesRealizadas(agenteId);
    }


}

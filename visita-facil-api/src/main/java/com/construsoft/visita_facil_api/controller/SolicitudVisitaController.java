package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.SolicitudVisitaDTO;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.service.SolicitudVisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/visitas/solicitud")
@CrossOrigin(origins = "*")
public class SolicitudVisitaController {

    @Autowired
    private SolicitudVisitaService solicitudService;

    @PostMapping
    public ResponseEntity<SolicitudVisita> crearSolicitud(@RequestBody SolicitudVisitaDTO dto) {
        SolicitudVisita solicitud = solicitudService.crearSolicitud(dto);
        return ResponseEntity.ok(solicitud);
    }

}

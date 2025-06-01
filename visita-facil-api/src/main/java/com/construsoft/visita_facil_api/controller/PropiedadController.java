package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.PropiedadDTO;
import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.service.PropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/propiedades")
public class PropiedadController {

    @Autowired
    private PropiedadService propiedadService;

    @GetMapping("/{id}")
    public ResponseEntity<Propiedad> getPropiedadById(@PathVariable int id) {
        Optional<Propiedad> propiedad = propiedadService.getById(id);
        return propiedad.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Propiedad>> getPropiedadesDisponibles() {
        List<Propiedad> propDisponibles = propiedadService.getPropiedadesDisponibles();
        return ResponseEntity.ok(propDisponibles); // Estatus 200
    }

    @PostMapping
    public ResponseEntity<Propiedad> addPropiedad(@RequestBody PropiedadDTO propiedadDTO) {
        Propiedad savedPropiedad = propiedadService.addPropiedad(
                propiedadDTO.getTitulo(),
                propiedadDTO.getDescripcion(),
                propiedadDTO.getPrecio(),
                propiedadDTO.getTipo(),
                propiedadDTO.getUbicacion(),
                propiedadDTO.isDisponible()
        );

        return ResponseEntity.status(201).body(savedPropiedad); // Estatus creado
    }

    @PostMapping("/{id}/imagenes")
    public ResponseEntity<List<String>> subirImagenes(
            @PathVariable int id,
            @RequestParam("imagenes") List<MultipartFile> imagenes) {
        try {
            List<String> urls = propiedadService.subirImagenes(id, imagenes);
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

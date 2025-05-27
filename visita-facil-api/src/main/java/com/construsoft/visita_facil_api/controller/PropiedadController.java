package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.service.PropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
public class PropiedadController {

    @Autowired
    private PropiedadService propiedadService;

    @GetMapping("/{id}")
    public ResponseEntity<Propiedad> getPropertyById(@PathVariable int id) {
        Optional<Propiedad> propiedad = propiedadService.getById(id);
        return propiedad.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Propiedad> createProperty(@RequestBody Propiedad propiedad) {
        Propiedad savedProperty = propiedadService.save(propiedad);
        System.out.println("Hola");
        return ResponseEntity.status(201).body(savedProperty);
    }

}

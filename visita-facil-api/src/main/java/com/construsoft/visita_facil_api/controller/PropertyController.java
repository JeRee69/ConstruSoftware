package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.PropertyDTO;
import com.construsoft.visita_facil_api.model.Property;
import com.construsoft.visita_facil_api.repository.PropertyRepository;
import com.construsoft.visita_facil_api.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    @Autowired
    private PropertyRepository propertyRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable int id) {
        Optional<Property> property = propertyService.getById(id);
        return property.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Property> addProperty(@RequestBody PropertyDTO propertyDTO) {
        Property savedProperty = propertyService.addProperty(
                propertyDTO.getTitle(),
                propertyDTO.getDescription(),
                propertyDTO.getPrice(),
                propertyDTO.getType(),
                propertyDTO.getLocation(),
                propertyDTO.getImageUrls(),
                propertyDTO.isAvailable()
        );

        return ResponseEntity.status(201).body(savedProperty);
    }

    @PostMapping("/properties/{id}/images")
    public ResponseEntity<String> uploadImages(
            @PathVariable int id,
            @RequestParam("files") List<MultipartFile> files) throws IOException, IOException {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        for (MultipartFile file : files) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.write(path, file.getBytes());
            property.getImageUrls().add("/images/" + fileName);
        }

        propertyRepository.save(property);
        return ResponseEntity.ok("Images uploaded");
    }

}

package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepository;

    public Optional<Propiedad> getById(int id) {
        return propiedadRepository.findById(id);
    }

    public Propiedad addPropiedad(String titulo, String descripcion, int precio, String tipo, String ubicacion, boolean disponible, List<String> urlsImagenes) {
        Propiedad propiedad = new Propiedad();
        propiedad.setTitulo(titulo);
        propiedad.setDescripcion(descripcion);
        propiedad.setPrecio(precio);
        propiedad.setTipo(tipo);
        propiedad.setUbicacion(ubicacion);
        propiedad.setDisponible(disponible);
        return propiedadRepository.save(propiedad);
    }

    public List<String> subirImagenes(int id, List<MultipartFile> imagenes) throws IOException {
        Propiedad propiedad = propiedadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));

        List<String> urls = new ArrayList<>();

        for (MultipartFile imagen : imagenes) {
            String nombreImagen = UUID.randomUUID() + "_" + imagen.getOriginalFilename();
            Path ruta = Paths.get("archivos/" + nombreImagen);
            Files.createDirectories(ruta.getParent());
            Files.write(ruta, imagen.getBytes());

            String urlRelativa = "/imagenes/" + nombreImagen;
            propiedad.getUrlsImagenes().add(urlRelativa);
            urls.add(urlRelativa);
        }

        propiedadRepository.save(propiedad);
        return urls;
    }

}

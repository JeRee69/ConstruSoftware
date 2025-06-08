package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropiedadService {

    @Autowired
    private PropiedadRepository propiedadRepository;
    @Autowired
    private ImgurService imgurService;

    public Optional<Propiedad> getById(int id) {
        return propiedadRepository.findById(id);
    }

    public List<Propiedad> getPropiedadesDisponibles() {
        return propiedadRepository.findByDisponibleTrue();
    }

    public Propiedad addPropiedad(String titulo, String descripcion, int precio, String tipo, String ubicacion,
            boolean disponible) {
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
            String url = imgurService.subirImagen(imagen);
            propiedad.getUrlsImagenes().add(url);
            urls.add(url);
        }

        propiedadRepository.save(propiedad);
        return urls;
    }

}

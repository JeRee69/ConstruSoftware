package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.model.SolicitudVisita;
import com.construsoft.visita_facil_api.repository.DisponibilidadPropiedadRepository;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import com.construsoft.visita_facil_api.repository.SolicitudAgenteRepository;
import com.construsoft.visita_facil_api.repository.SolicitudVisitaRepository;
import jakarta.transaction.Transactional;
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
    @Autowired
    private DisponibilidadPropiedadRepository disponibilidadRepo;
    @Autowired
    private SolicitudVisitaRepository solicitudVisitaRepo;
    @Autowired
    private SolicitudAgenteRepository solicitudAgenteRepo;

    public Optional<Propiedad> getById(int id) {
        return propiedadRepository.findById(id);
    }

    public List<Propiedad> getPropiedadesDisponibles() {
        return propiedadRepository.findByDisponibleTrue();
    }

    public Propiedad addPropiedad(String titulo, String descripcion, int precio, String tipo, String ubicacion, boolean disponible) {
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

    @Transactional
    public void eliminarPropiedad(Integer id) {
        Propiedad propiedad = propiedadRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Propiedad no encontrada"));

        // Borrar imágenes asociadas
        propiedad.getUrlsImagenes().clear();
        propiedadRepository.save(propiedad);

        // Eliminar solicitudes de agentes por cada visita asociada
        List<SolicitudVisita> visitas = solicitudVisitaRepo.findByPropiedad(propiedad);
        for (SolicitudVisita visita : visitas) {
            solicitudAgenteRepo.deleteBySolicitudVisita(visita);
        }

        // Luego eliminamos las visitas
        solicitudVisitaRepo.deleteAll(visitas);

        // Eliminar disponibilidades
        disponibilidadRepo.deleteByPropiedad(propiedad);

        // Finalmente eliminamos la propiedad
        propiedadRepository.delete(propiedad);
    }



    public Propiedad save(Propiedad propiedadExistente) {
        return propiedadRepository.save(propiedadExistente);
    }

    public void eliminarImagen(int id, String url) {
        Optional<Propiedad> optional = getById(id);
        if (optional.isEmpty()) return;

        Propiedad propiedad = optional.get();
        List<String> imagenes = propiedad.getUrlsImagenes();
        imagenes.removeIf(img -> img.equals(url));
        propiedad.setUrlsImagenes(imagenes);
        save(propiedad);
    }

}
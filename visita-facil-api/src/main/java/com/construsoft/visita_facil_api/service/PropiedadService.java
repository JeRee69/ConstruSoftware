package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PropiedadService {
    @Autowired
    private PropiedadRepository propiedadRepository;

    public Optional<Propiedad> getById(int id) {
        return propiedadRepository.findById(id);
    }

    public Propiedad save(Propiedad propiedad) {
        return propiedadRepository.save(propiedad);
    }

}

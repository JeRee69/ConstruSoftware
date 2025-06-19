package com.construsoft.visita_facil_api.config;

import java.util.List;

import com.construsoft.visita_facil_api.enums.Rol;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.construsoft.visita_facil_api.model.Propiedad;
import com.construsoft.visita_facil_api.repository.PropiedadRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final PropiedadRepository propiedadRepository;
    private final AccountService accountService;

    public DataLoader(PropiedadRepository propiedadRepository, AccountService accountService) {
        this.propiedadRepository = propiedadRepository;
        this.accountService = accountService;
    }

    @Override
    public void run(String... args) throws Exception {


        if (propiedadRepository.count() == 0) {

            Propiedad propiedad1 = new Propiedad();
            propiedad1.setTitulo("CASA PROVIDENCIA CENTRO");
            propiedad1.setDescripcion("AMPLIA CASA.");
            propiedad1.setPrecio(85000000);
            propiedad1.setTipo("Casa");
            propiedad1.setUbicacion("Providencia");
            propiedad1.setDisponible(true);
            propiedad1.setUrlsImagenes(List.of(
                    "https://i.imgur.com/rfLwsTP.png",
                    "https://i.imgur.com/jxYm0Mc.jpeg"
            ));
            propiedadRepository.save(propiedad1);

            Propiedad propiedad2 = new Propiedad();
            propiedad2.setTitulo("Departamento Moderno");
            propiedad2.setDescripcion("Departamento en el centro, con 2 habitaciones y vista panorámica.");
            propiedad2.setPrecio(65000000);
            propiedad2.setTipo("Departamento");
            propiedad2.setUbicacion("Santiago Centro");
            propiedad2.setDisponible(true);
            propiedad2.setUrlsImagenes(List.of(
                    "https://i.imgur.com/8Km9tLL.jpg",
                    "https://i.imgur.com/XYZ1234.jpg" // Cambia por URLs reales
            ));
            propiedadRepository.save(propiedad2);

            Propiedad propiedad3 = new Propiedad();
            propiedad3.setTitulo("Casa Familiar");
            propiedad3.setDescripcion("Amplia casa familiar con jardín y piscina.");
            propiedad3.setPrecio(120000000);
            propiedad3.setTipo("Casa");
            propiedad3.setUbicacion("La Reina");
            propiedad3.setDisponible(true);
            propiedad3.setUrlsImagenes(List.of(
                    "https://i.imgur.com/AbCdEfG.jpg" // Cambia por URLs reales
            ));
            propiedadRepository.save(propiedad3);

            System.out.println("✅ Propiedades demo precargadas exitosamente.");
        } else {
            System.out.println("⚠️ Las propiedades ya están precargadas.");
        }
    }
}

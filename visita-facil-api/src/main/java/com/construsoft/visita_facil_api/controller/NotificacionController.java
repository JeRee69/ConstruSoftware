package com.construsoft.visita_facil_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.construsoft.visita_facil_api.domain.NotificacionDTO;
import com.construsoft.visita_facil_api.service.CorreoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "http://localhost:3000/",
    "https://visitafacil.mooo.com/"
})
public class NotificacionController {

    @Autowired
    private CorreoService correoService;

    @PostMapping("/notificacion")
    public ResponseEntity<String> enviarCorreo(@RequestBody NotificacionDTO dto) {
        try {
            correoService.enviarCorreo(dto);
            return ResponseEntity.ok("Correo enviado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar correo: " + e.getMessage());
        }
    }
}

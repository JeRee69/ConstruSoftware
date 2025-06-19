package com.construsoft.visita_facil_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.construsoft.visita_facil_api.domain.NotificacionDTO;

@Service
public class CorreoService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreo(NotificacionDTO dto) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(dto.getDestinatario());
        mensaje.setSubject(dto.getAsunto());
        mensaje.setText(dto.getMensaje());

        mailSender.send(mensaje);
    }
}

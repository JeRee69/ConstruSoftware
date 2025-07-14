package com.construsoft.visita_facil_api.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.construsoft.visita_facil_api.domain.NotificacionDTO;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class CorreoService {

    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreo(NotificacionDTO dto) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            String[] destinatarios = Arrays.stream(dto.getDestinatario().split(","))
                    .map(String::trim)
                    .toArray(String[]::new);

            helper.setTo(destinatarios);
            helper.setSubject(dto.getAsunto());
            helper.setText(dto.getMensaje(), true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar correo: " + e.getMessage());
        }
    }

}

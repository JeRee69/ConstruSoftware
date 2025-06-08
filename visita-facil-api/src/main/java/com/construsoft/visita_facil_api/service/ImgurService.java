package com.construsoft.visita_facil_api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Map;

@Service
public class ImgurService {

    private static final String IMGUR_UPLOAD_URL = "https://api.imgur.com/3/image";
    @Value("${imgur.client-id}")
    private String clientId;

    public String subirImagen(MultipartFile imagen) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.set("Authorization", "Client-ID " + clientId);

            MultiValueMap<String, Object> cuerpo = new LinkedMultiValueMap<>();
            cuerpo.add("image", Base64.getEncoder().encodeToString(imagen.getBytes()));

            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(cuerpo, headers);
            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<Map> response = restTemplate.exchange(
                    IMGUR_UPLOAD_URL,
                    HttpMethod.POST,
                    request,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                Map data = (Map) response.getBody().get("data");
                return (String) data.get("link"); // URL pública
            } else {
                throw new RuntimeException("Error al subir imagen a Imgur: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al procesar imagen: " + e.getMessage(), e);
        }
    }

}

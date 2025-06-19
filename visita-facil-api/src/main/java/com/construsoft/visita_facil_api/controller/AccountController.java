package com.construsoft.visita_facil_api.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.construsoft.visita_facil_api.domain.AccountProfileDTO;
import com.construsoft.visita_facil_api.domain.RespuestaLoginDTO;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.Profile;
import com.construsoft.visita_facil_api.service.AccountService;
import com.construsoft.visita_facil_api.service.ProfileService;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private ProfileService profileService;

    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public ResponseEntity<Account> register(@RequestBody AccountProfileDTO accountProfileDTO) {
        Account savedAccount = accountService.register(
                accountProfileDTO.getEmail(),
                accountProfileDTO.getPassword(),
                accountProfileDTO.getName(),
                accountProfileDTO.getPhone(),
                accountProfileDTO.getRol());

        return ResponseEntity.ok(savedAccount);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<RespuestaLoginDTO> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Optional<Account> accountOpt = accountService.login(email, password);
        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();
            RespuestaLoginDTO respuestaLoginDTO = new RespuestaLoginDTO();
            respuestaLoginDTO.setAccountId(account.getId());
            respuestaLoginDTO.setRol(account.getRol());
            Optional<Profile> profile = profileService.getProfileByAccountId(account.getId());
            respuestaLoginDTO.setNombre(profile.get().getName());
            return ResponseEntity.ok(respuestaLoginDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}

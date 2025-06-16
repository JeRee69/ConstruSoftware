package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.domain.AccountProfileDTO;
import com.construsoft.visita_facil_api.domain.RespuestaLoginDTO;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

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
            return ResponseEntity.ok(new RespuestaLoginDTO(account.getId(), account.getRol()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}

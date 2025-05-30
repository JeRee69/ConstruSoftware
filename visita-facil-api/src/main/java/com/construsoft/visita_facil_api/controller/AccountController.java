package com.construsoft.visita_facil_api.controller;

import java.util.HashMap;
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

import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.domain.AccountProfileDTO;
import com.construsoft.visita_facil_api.service.AccountService;

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
                accountProfileDTO.getPhone());

        return ResponseEntity.ok(savedAccount);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Long>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        Optional<Account> accountOpt = accountService.login(email, password);
        if (accountOpt.isPresent()) {
            Map<String, Long> response = new HashMap<>();
            response.put("accountId", accountOpt.get().getId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}

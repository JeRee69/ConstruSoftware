package com.construsoft.visita_facil_api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.construsoft.visita_facil_api.enums.Rol;
import com.construsoft.visita_facil_api.model.Account;
import com.construsoft.visita_facil_api.model.Profile;
import com.construsoft.visita_facil_api.repository.AccountRepository;
import com.construsoft.visita_facil_api.repository.ProfileRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public Account register(String email, String password, String name, String phone, Rol rol) {
        Account account = new Account();
        account.setEmail(email);
        account.setPassword(passwordEncoder.encode(password));
        account.setRol(rol);
        account = accountRepository.save(account);

        Profile profile = new Profile();
        profile.setAccount(account);
        profile.setName(name);
        profile.setPhone(phone);
        profileRepository.save(profile);

        return account;
    }

    public Optional<Account> login(String email, String password) {
        Optional<Account> accountOpt = accountRepository.findByEmail(email);
        if (accountOpt.isPresent() && passwordEncoder.matches(password, accountOpt.get().getPassword())) {
            return accountOpt;
        }
        return Optional.empty();
    }

    public List<String> obtenerCorreosAgentes() {
        return accountRepository.findAllByRol(Rol.AGENTE)
                .stream()
                .map(Account::getEmail)
                .toList();
    }
}

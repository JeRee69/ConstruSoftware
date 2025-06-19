package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.enums.Rol;
import com.construsoft.visita_facil_api.model.Account;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ActiveProfiles("test")
@SpringBootTest
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @Test
    @Transactional
    public void testRegisterAndLogin() {
        String email = "prueba@correo.com";
        String password = "segura123";
        String name = "Nombre Prueba";
        String phone = "123456789";

        System.out.println("➡️ Registrando cuenta...");
        Account account = accountService.register(email, password, name, phone, Rol.CLIENTE);
        assertNotNull(account.getId(), "El ID no debería ser nulo");
        System.out.println("✅ Cuenta registrada con ID: " + account.getId());

        System.out.println("➡️ Probando login con credenciales correctas...");
        Optional<Account> loginOk = accountService.login(email, password);
        assertTrue(loginOk.isPresent(), "El login debería funcionar con credenciales correctas");
        System.out.println("✅ Login exitoso");

        System.out.println("➡️ Probando login con contraseña incorrecta...");
        Optional<Account> loginFail = accountService.login(email, "contraseñaIncorrecta");
        assertTrue(loginFail.isEmpty(), "El login no debería funcionar con contraseña incorrecta");
        System.out.println("✅ Login falló como se esperaba con contraseña incorrecta");
    }

}

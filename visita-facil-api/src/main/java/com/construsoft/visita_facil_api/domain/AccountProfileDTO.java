package com.construsoft.visita_facil_api.domain;

import com.construsoft.visita_facil_api.enums.Rol;

public class AccountProfileDTO {
    private String email;
    private String password;
    private String name;
    private String phone;
    private Rol rol;

    public AccountProfileDTO() {
    }

    public String getEmail() {
        return email;
    }

    public AccountProfileDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public AccountProfileDTO setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getName() {
        return name;
    }

    public AccountProfileDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public AccountProfileDTO setPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

}

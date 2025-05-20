package com.construsoft.visita_facil_api.domain;

public class AccountProfileDTO {
    private String email;
    private String password;
    private String name;
    private String city;
    private String address;
    private String phone;

    public AccountProfileDTO(){}

    public String getEmail() {
        return email;
    }

    public AccountProfileDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getCity() {
        return city;
    }

    public AccountProfileDTO setCity(String city) {
        this.city = city;
        return this;
    }

    public String getAddress() {
        return address;
    }

    public AccountProfileDTO setAddress(String adress) {
        this.address = adress;
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
}

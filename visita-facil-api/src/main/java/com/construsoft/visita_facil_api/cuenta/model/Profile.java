package com.construsoft.visita_facil_api.cuenta.model;

import jakarta.persistence.*;

@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;


    public Profile() {
    }

    public Profile(Long id, Account account, String name, String phone) {
        this.id = id;
        this.account = account;
        this.name = name;
        this.phone = phone;

    }

    public Long getId() {
        return id;
    }

    public Profile setId(Long id) {
        this.id = id;
        return this;
    }

    public Account getAccount() {
        return account;
    }

    public Profile setAccount(Account account) {
        this.account = account;
        return this;
    }

    public String getName() {
        return name;
    }

    public Profile setName(String name) {
        this.name = name;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public Profile setPhone(String phone) {
        this.phone = phone;
        return this;
    }

}

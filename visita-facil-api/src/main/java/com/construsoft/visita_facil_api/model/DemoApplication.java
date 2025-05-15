package com.construsoft.visita_facil_api.model;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.construsoft.login")
public class DemoApplication {

	public DemoApplication() {
		super();
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}

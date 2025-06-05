package com.construsoft.visita_facil_api.controller;

import com.construsoft.visita_facil_api.model.Profile;
import com.construsoft.visita_facil_api.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("")
    public ResponseEntity<Profile> getProfile(@RequestParam("accountId") Long accountId) {
        Optional<Profile> profileOpt = profileService.getProfileByAccountId(accountId);
        return profileOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

}

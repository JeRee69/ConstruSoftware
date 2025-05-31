package com.construsoft.visita_facil_api.cuenta.service;

import com.construsoft.visita_facil_api.cuenta.model.Profile;
import com.construsoft.visita_facil_api.cuenta.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public Optional<Profile> getProfileByAccountId(Long accountId) {
        return profileRepository.findByAccountId(accountId);
    }
}

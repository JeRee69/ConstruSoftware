package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Profile;
import com.construsoft.visita_facil_api.repository.ProfileRepository;
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

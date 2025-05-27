package com.construsoft.visita_facil_api.service;

import com.construsoft.visita_facil_api.model.Property;
import com.construsoft.visita_facil_api.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    public Optional<Property> getById(int id) {
        return propertyRepository.findById(id);
    }

    public Property addProperty(String title, String description, int price, String type, String location, List<String> imageUrls, boolean available) {
        Property property = new Property();
        property.setTitle(title);
        property.setDescription(description);
        property.setPrice(price);
        property.setType(type);
        property.setLocation(location);
        property.setAvailable(available);
        return propertyRepository.save(property);
    }

}

package com.construsoft.visita_facil_api.domain;

import java.util.List;

public class PropertyDTO {

    private String title;
    private String description;
    private int price;
    private String type;
    private String location;
    private List<String> imageUrls;
    private boolean available;

    public PropertyDTO() {}

    public PropertyDTO(String title, String description, int price, String type, String location, List<String> imageUrls, boolean available) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.type = type;
        this.location = location;
        this.imageUrls = imageUrls;
        this.available = available;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}

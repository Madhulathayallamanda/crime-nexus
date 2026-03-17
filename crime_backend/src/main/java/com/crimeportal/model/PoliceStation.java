package com.crimeportal.model;

public class PoliceStation {

    private String name;
    private double latitude;
    private double longitude;

    public PoliceStation(String name, double latitude, double longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getName() {
        return name;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }
}

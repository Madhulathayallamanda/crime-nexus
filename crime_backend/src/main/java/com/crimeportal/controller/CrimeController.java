package com.crimeportal.controller;

import com.crimeportal.model.CrimeReport;
import com.crimeportal.repository.CrimeRepository;
import com.crimeportal.service.StationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/crimes")
@CrossOrigin(origins = "*")
public class CrimeController {

    @Autowired
    private CrimeRepository crimeRepository;

    @Autowired
    private StationService stationService;

    // ✅ GET ALL CRIMES
    @GetMapping
    public List<CrimeReport> getAllCrimes() {
        return crimeRepository.findAll();
    }

    // ✅ CREATE CRIME (FIXED)
    @PostMapping
    public CrimeReport createCrime(@RequestBody CrimeReport crime) {

        System.out.println("===== NEW CRIME REQUEST =====");
        System.out.println("Latitude: " + crime.getLatitude());
        System.out.println("Longitude: " + crime.getLongitude());

        // 🔥 Always assign station if coords exist
        if (crime.getLatitude() != null && crime.getLongitude() != null) {

            Map<String, Object> result = stationService.findNearest(
                    crime.getLatitude(),
                    crime.getLongitude()
            );

            String station = (String) result.get("station");
            Double distance = (Double) result.get("distance");

            System.out.println("Nearest Station: " + station);
            System.out.println("Distance: " + distance);

            crime.setAssignedStation(station != null ? station : "Unknown Station");
            crime.setDistance(distance != null ? distance : 0.0);

        } else {
            System.out.println("❌ Latitude or Longitude is NULL");
            crime.setAssignedStation("Location Not Provided");
            crime.setDistance(0.0);
        }

        // Default status
        if (crime.getStatus() == null) {
            crime.setStatus("OPEN");
        }

        CrimeReport saved = crimeRepository.save(crime);

        System.out.println("Saved Station: " + saved.getAssignedStation());
        System.out.println("============================");

        return saved;
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public CrimeReport getCrimeById(@PathVariable Long id) {
        return crimeRepository.findById(id).orElse(null);
    }

    // ✅ UPDATE STATUS
    @PutMapping("/{id}/status")
    public CrimeReport updateStatus(@PathVariable Long id, @RequestParam String status) {

        CrimeReport crime = crimeRepository.findById(id).orElse(null);

        if (crime != null) {
            crime.setStatus(status);
            return crimeRepository.save(crime);
        }

        return null;
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteCrime(@PathVariable Long id) {
        crimeRepository.deleteById(id);
    }
}

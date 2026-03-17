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

    //  GET ALL CRIMES
    @GetMapping
    public List<CrimeReport> getAllCrimes() {
        return crimeRepository.findAll();
    }

    // CREATE CRIME (MAIN LOGIC)
    @PostMapping
    public CrimeReport createCrime(@RequestBody CrimeReport crime) {

        // 🔥 Assign nearest police station
        if (crime.getLatitude() != null && crime.getLongitude() != null) {

            Map<String, Object> result = stationService.findNearest(
                    crime.getLatitude(),
                    crime.getLongitude()
            );

            crime.setAssignedStation((String) result.get("station"));
            crime.setDistance((Double) result.get("distance"));
        }

        // Default status
        if (crime.getStatus() == null) {
            crime.setStatus("OPEN");
        }

        return crimeRepository.save(crime);
    }

    //  GET CRIME BY ID
    @GetMapping("/{id}")
    public CrimeReport getCrimeById(@PathVariable Long id) {
        return crimeRepository.findById(id).orElse(null);
    }

    // UPDATE STATUS (OFFICER USE)
    @PutMapping("/{id}/status")
    public CrimeReport updateStatus(@PathVariable Long id, @RequestParam String status) {

        CrimeReport crime = crimeRepository.findById(id).orElse(null);

        if (crime != null) {
            crime.setStatus(status);
            return crimeRepository.save(crime);
        }

        return null;
    }

    // DELETE CRIME
    @DeleteMapping("/{id}")
    public void deleteCrime(@PathVariable Long id) {
        crimeRepository.deleteById(id);
    }
}

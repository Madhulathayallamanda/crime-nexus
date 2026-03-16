
package com.crimeportal.controller;

import com.crimeportal.model.CrimeReport;
import com.crimeportal.service.CrimeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/crimes")
@CrossOrigin("*")
public class CrimeController {

 private final CrimeService service;

 public CrimeController(CrimeService service){
  this.service = service;
 }

 @PostMapping("/report")
 public CrimeReport report(@RequestBody CrimeReport crime){
  return service.reportCrime(crime);
 }

 @GetMapping
 public List<CrimeReport> getCrimes(){
  return service.getAllCrimes();
 }
}

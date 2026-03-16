
package com.crimeportal.service;

import com.crimeportal.model.CrimeReport;
import com.crimeportal.repository.CrimeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CrimeService {

 private final CrimeRepository repo;

 public CrimeService(CrimeRepository repo){
  this.repo = repo;
 }

 public CrimeReport reportCrime(CrimeReport crime){
  crime.setStatus("REPORTED");
  return repo.save(crime);
 }

 public List<CrimeReport> getAllCrimes(){
  return repo.findAll();
 }
}

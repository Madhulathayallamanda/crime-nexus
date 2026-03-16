
package com.crimeportal.service;

import com.crimeportal.model.CaseRecord;
import com.crimeportal.repository.CaseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CaseService {

 private final CaseRepository repo;

 public CaseService(CaseRepository repo){
  this.repo = repo;
 }

 public CaseRecord assignCase(CaseRecord record){
  return repo.save(record);
 }

 public List<CaseRecord> getCases(){
  return repo.findAll();
 }
}

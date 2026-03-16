
package com.crimeportal.controller;

import com.crimeportal.model.CaseRecord;
import com.crimeportal.service.CaseService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cases")
@CrossOrigin("*")
public class CaseController {

 private final CaseService service;

 public CaseController(CaseService service){
  this.service = service;
 }

 @PostMapping("/assign")
 public CaseRecord assign(@RequestBody CaseRecord record){
  return service.assignCase(record);
 }

 @GetMapping
 public List<CaseRecord> getCases(){
  return service.getCases();
 }
}

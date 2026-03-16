
package com.crimeportal.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

 @GetMapping("/stats")
 public String getStats(){
  return "Crime analytics data endpoint";
 }
}

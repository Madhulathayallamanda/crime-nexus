
package com.crimeportal.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class CrimeReport {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String title;
 private String description;
 private String location;
 private double latitude;
 private double longitude;
 private String evidenceFile;
 private String status;
 private LocalDate dateReported;

 public Long getId(){return id;}
 public void setId(Long id){this.id=id;}
 public String getTitle(){return title;}
 public void setTitle(String title){this.title=title;}
 public String getDescription(){return description;}
 public void setDescription(String description){this.description=description;}
 public String getLocation(){return location;}
 public void setLocation(String location){this.location=location;}
 public double getLatitude(){return latitude;}
 public void setLatitude(double latitude){this.latitude=latitude;}
 public double getLongitude(){return longitude;}
 public void setLongitude(double longitude){this.longitude=longitude;}
 public String getEvidenceFile(){return evidenceFile;}
 public void setEvidenceFile(String evidenceFile){this.evidenceFile=evidenceFile;}
 public String getStatus(){return status;}
 public void setStatus(String status){this.status=status;}
 public LocalDate getDateReported(){return dateReported;}
 public void setDateReported(LocalDate dateReported){this.dateReported=dateReported;}
}

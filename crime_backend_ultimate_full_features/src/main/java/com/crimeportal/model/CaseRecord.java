
package com.crimeportal.model;

import jakarta.persistence.*;

@Entity
public class CaseRecord {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private Long crimeId;
 private Long officerId;
 private String status;
 private String remarks;

 public Long getId(){return id;}
 public void setId(Long id){this.id=id;}
 public Long getCrimeId(){return crimeId;}
 public void setCrimeId(Long crimeId){this.crimeId=crimeId;}
 public Long getOfficerId(){return officerId;}
 public void setOfficerId(Long officerId){this.officerId=officerId;}
 public String getStatus(){return status;}
 public void setStatus(String status){this.status=status;}
 public String getRemarks(){return remarks;}
 public void setRemarks(String remarks){this.remarks=remarks;}
}

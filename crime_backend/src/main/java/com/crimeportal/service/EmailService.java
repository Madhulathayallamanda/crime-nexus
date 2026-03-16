
package com.crimeportal.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

 public void sendNotification(String email,String message){
  System.out.println("Sending email to "+email+" : "+message);
 }
}

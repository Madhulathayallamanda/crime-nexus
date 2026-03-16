
package com.crimeportal.controller;

import com.crimeportal.model.User;
import com.crimeportal.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

 private final UserRepository repo;

 public AuthController(UserRepository repo){
  this.repo = repo;
 }

 @PostMapping("/register")
 public User register(@RequestBody User user){
  user.setRole("CITIZEN");
  return repo.save(user);
 }
}

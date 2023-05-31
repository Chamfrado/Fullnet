package br.com.sacfullnet.sacfullnet.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.sacfullnet.sacfullnet.model.User;
import br.com.sacfullnet.sacfullnet.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> findAllUsers(){
        List<User> users = userService.find();

        if (users == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(users);
        
    }
}

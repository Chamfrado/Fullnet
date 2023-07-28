package br.com.sacfullnet.sacfullnet.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.sacfullnet.sacfullnet.model.User;
import br.com.sacfullnet.sacfullnet.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/user")
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

    @PostMapping("")
    public ResponseEntity<Integer> save(@RequestBody User user){

        int id = -1;

        id = userService.save(user);

        if( id == -1 ){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(id);


    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody User user){
        boolean ok = false;

        ok = userService.update(user);

        if(ok == true){
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        boolean ok = false;

        ok = userService.delete(id);

        if(ok == true){
            return ResponseEntity.ok("Deletado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }
}

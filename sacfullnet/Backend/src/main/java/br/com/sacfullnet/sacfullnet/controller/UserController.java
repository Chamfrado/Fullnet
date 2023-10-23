package br.com.sacfullnet.sacfullnet.controller;

import br.com.sacfullnet.sacfullnet.model.Equipment;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import br.com.sacfullnet.sacfullnet.model.User;
import br.com.sacfullnet.sacfullnet.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    
    @Autowired
    UserService userService;

    @GetMapping("")
    public ResponseEntity<List<User>> findAllUsers(@RequestParam(required = false) String search){

        if(StringUtils.hasText(search)){
            List<User> users = userService.search(search);

            if (users == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(users);
        }else{
            List<User> users = userService.find();

            if (users == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(users);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<User> authenticate(@RequestBody String username,@RequestBody String password){
        
        User user = userService.authenticate(username, password);
        System.out.println(user);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
        
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

        System.out.println(user.getUsername());
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

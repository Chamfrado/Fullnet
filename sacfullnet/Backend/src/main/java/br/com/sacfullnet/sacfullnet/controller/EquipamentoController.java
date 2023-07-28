package br.com.sacfullnet.sacfullnet.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.sacfullnet.sacfullnet.model.Equipamento;
import br.com.sacfullnet.sacfullnet.service.EquipamentoService;

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
@RequestMapping("/equipamento")
@CrossOrigin(origins = "*")
public class EquipamentoController {
    
    @Autowired
    EquipamentoService equipamentoService;

    @GetMapping("")
    public ResponseEntity<List<Equipamento>> findAllUsers(){
        List<Equipamento> users = equipamentoService.find();

        if (users == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(users);
        
    }

    @PostMapping("")
    public ResponseEntity<Integer> save(@RequestBody Equipamento equipamento){

        int id = -1;

        id = equipamentoService.save(equipamento);

        if( id == -1 ){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(id);


    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Equipamento equipamento){
        boolean ok = false;

        ok = equipamentoService.update(equipamento);

        if(ok == true){
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        boolean ok = false;

        ok = equipamentoService.delete(id);

        if(ok == true){
            return ResponseEntity.ok("Deletado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }
}

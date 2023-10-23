package br.com.sacfullnet.sacfullnet.controller;

import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import br.com.sacfullnet.sacfullnet.model.Equipment;
import br.com.sacfullnet.sacfullnet.service.EquipmentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/equipamento")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EquipamentoController {
    
    @Autowired
    EquipmentService equipmentService;

    @GetMapping("")
    public ResponseEntity<List<Equipment>> findAllEquipamentos(@RequestParam(required = false) String search){

        if(StringUtils.hasText(search)){
            List<Equipment> equipments = equipmentService.search(search);

            if (equipments == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(equipments);
        }else{
            List<Equipment> equipments = equipmentService.find();

            if (equipments == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(equipments);
        }



        
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> findById(@PathVariable int id){
        Equipment equipment = equipmentService.findById(id);

        if(equipment == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(equipment);
    }

    @PostMapping("")
    public ResponseEntity<Integer> save(@RequestBody Equipment equipment){

        int id = -1;

        id = equipmentService.save(equipment);

        if( id == -1 ){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(id);


    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody Equipment equipment){
        boolean ok = false;

        ok = equipmentService.update(equipment);

        if(ok){
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        boolean ok = false;

        ok = equipmentService.delete(id);

        if(ok){
            return ResponseEntity.ok("Deletado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }
}

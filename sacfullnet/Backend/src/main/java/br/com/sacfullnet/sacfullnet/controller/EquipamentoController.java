package br.com.sacfullnet.sacfullnet.controller;

import br.com.sacfullnet.sacfullnet.model.File;
import br.com.sacfullnet.sacfullnet.service.FileService;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import br.com.sacfullnet.sacfullnet.model.Equipment;
import br.com.sacfullnet.sacfullnet.service.EquipmentService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/equipamento")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EquipamentoController {
    
    @Autowired
    EquipmentService equipmentService;

    @Autowired
    FileService fileService;

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

    @GetMapping("/name/name")
    public ResponseEntity<Equipment> findByName(@RequestParam String name){
        Equipment equipment = equipmentService.findByName(name);

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

    private static String imageDirectory = System.getProperty("user.dir") + "/images/";
    @PostMapping("/imagem")
    public ResponseEntity<File> addImagem(@RequestParam("imagem") MultipartFile imagem) {
        if (imagem != null) {
            makeDirectoryIfNotExist(imageDirectory);
            Path fileNamePath = Paths.get(imageDirectory,imagem.getOriginalFilename());

            try{
                Files.write(fileNamePath, imagem.getBytes());
                return ResponseEntity.ok().build();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

        }

        return ResponseEntity.badRequest().build();
    }

    private void makeDirectoryIfNotExist(String imageDirectory){
        java.io.File directory = new java.io.File(imageDirectory);
        if(!directory.exists()){
            directory.mkdir();
        }
    }

    @GetMapping("/imagem/{id}")
    public ResponseEntity<String> getImagem(@PathVariable int id){
        File image = fileService.findImageById(id);
        if (image.getData() != null) {
            String base64Image = Base64.getEncoder().encodeToString(image.getData());
            return ResponseEntity.ok(base64Image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

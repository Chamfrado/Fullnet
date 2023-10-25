package br.com.sacfullnet.sacfullnet.controller;

import br.com.sacfullnet.sacfullnet.model.File;
import br.com.sacfullnet.sacfullnet.service.FileService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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

    private static final String imageDirectory = System.getProperty("user.dir") + "/images/";

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
        boolean imageOk = false;

        ok = equipmentService.delete(id);
        imageOk = fileService.deleteFile(id);

        if(imageOk){
            imageOk = deleteImage(id);
        }
        if(ok && imageOk){
            return ResponseEntity.ok("Deletado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/imagem/{id_equipamento}")
    public ResponseEntity<String> addOrUpdateImagem(
            @RequestParam("imagem") MultipartFile imagem,
            @PathVariable int id_equipamento
    ) {
        if (imagem != null) {
            makeDirectoryIfNotExist();
            Path fileNamePath = Paths.get(imageDirectory, String.valueOf(id_equipamento));

            java.io.File imageFile = fileNamePath.toFile();

            if (imageFile.exists()) {
                // If the file already exists, delete it before saving the new image
                if (imageFile.delete()) {
                    try {
                        Files.write(fileNamePath, imagem.getBytes());
                        fileService.update(imagem, id_equipamento, String.valueOf(fileNamePath));
                        return ResponseEntity.ok("Imagem atualizada com sucesso!");
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                } else {
                    return ResponseEntity.badRequest().body("Não foi possível atualizar a imagem.");
                }
            } else {
                try {
                    Files.write(fileNamePath, imagem.getBytes());
                    fileService.save(imagem, id_equipamento, String.valueOf(fileNamePath));
                    return ResponseEntity.ok("Imagem adicionada com sucesso!");
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        return ResponseEntity.badRequest().build();
    }

    private boolean deleteImage(int id_equipamento){
        Path imagePath = Paths.get(imageDirectory, String.valueOf(id_equipamento));

        java.io.File imageFile = imagePath.toFile();

        if (imageFile.exists()) {
            if (imageFile.delete()) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    private void makeDirectoryIfNotExist(){
        java.io.File directory = new java.io.File(imageDirectory);
        if(!directory.exists()){
            directory.mkdir();
        }
    }

    @GetMapping(path = "/download/{id}")
    public ResponseEntity<ByteArrayResource> download
            (@PathVariable("id") int id) throws IOException {

        String imageDirectory = System.getProperty("user.dir") + "/images/";



        // Load the image file as a Resource


        File image =  fileService.findImageById(id);
        Path imagePath = Path.of(image.getFilepath());
        java.io.File file = new java.io.File(imagePath.toUri());
        System.out.println(imagePath);
        ByteArrayResource resource =
                new ByteArrayResource(Files.readAllBytes(imagePath));

        return ResponseEntity.ok()
                .contentLength(file.length())
                .contentType(MediaType
                        .parseMediaType("application/octet-stream"))
                .body(resource);
    }

    private HttpHeaders headers(String name) {

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=" + name);
        header.add("Cache-Control",
                "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");
        return header;

    }
}

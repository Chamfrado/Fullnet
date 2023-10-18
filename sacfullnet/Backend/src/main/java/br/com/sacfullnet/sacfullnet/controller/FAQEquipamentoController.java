
package br.com.sacfullnet.sacfullnet.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.sacfullnet.sacfullnet.model.FAQEquipamento;
import br.com.sacfullnet.sacfullnet.service.FAQEquipamentoService;

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
@RequestMapping("/faq/equipamento")
@CrossOrigin(origins = "*")
public class FAQEquipamentoController {
    
    @Autowired
    FAQEquipamentoService faqEquipamentoService;

    @GetMapping("")
    public ResponseEntity<?> checkIfFAQHasEquipamento(@RequestBody FAQEquipamento faqEquipamento) {
        boolean result = faqEquipamentoService.faqHasEquipamento(faqEquipamento.getId_faq(), faqEquipamento.getId_equipamento());
    
        if (!result) {
            return ResponseEntity.ok("nao contem");
        }
    
        return ResponseEntity.ok("contem");
    }

    @PostMapping("")
    public ResponseEntity<Integer> add(@RequestBody FAQEquipamento faqEquipamento){

        int id = -1;

        id = faqEquipamentoService.addEquipamento(faqEquipamento.getId_faq(), faqEquipamento.getId_equipamento());

        if( id == -1 ){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(id);


    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteAll(@RequestBody FAQEquipamento faqEquipamento) {


        boolean ok = false;

        ok = faqEquipamentoService.deleteAll(faqEquipamento.getId_faq());

        if(ok == true){
            return ResponseEntity.ok("Deletado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }
}

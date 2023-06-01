package br.com.sacfullnet.sacfullnet.controller;

import org.springframework.web.bind.annotation.RestController;

import br.com.sacfullnet.sacfullnet.model.FAQ;
import br.com.sacfullnet.sacfullnet.service.FAQService;

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
@RequestMapping("/faq")
@CrossOrigin(origins = "*")
public class FAQController {
    
    @Autowired
    FAQService faqService;

    @GetMapping("")
    public ResponseEntity<List<FAQ>> findAllFAQs(){
        List<FAQ> faqs = faqService.find();

        if (faqs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(faqs);
        
    }

    @PostMapping("")
    public ResponseEntity<Integer> save(@RequestBody FAQ faq){

        int id = -1;

        id = faqService.save(faq);

        if( id == -1 ){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(id);


    }

    @PutMapping("")
    public ResponseEntity<String> update(@RequestBody FAQ faq){
        boolean ok = false;

        ok = faqService.update(faq);

        if(ok == true){
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){
        boolean ok = false;

        ok = faqService.delete(id);

        if(ok == true){
            return ResponseEntity.ok("Deletado com sucesso!");
        }

        return ResponseEntity.badRequest().build();
    }
}

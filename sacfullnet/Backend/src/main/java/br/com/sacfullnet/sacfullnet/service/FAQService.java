package br.com.sacfullnet.sacfullnet.service;

import java.util.List;

import br.com.sacfullnet.sacfullnet.model.FAQ;

public interface FAQService {
    List<FAQ> find();

    int save(FAQ faq);

    boolean update(FAQ faq);

    boolean delete(Integer id);

    
}

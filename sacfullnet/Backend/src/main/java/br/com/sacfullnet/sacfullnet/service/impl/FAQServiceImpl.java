package br.com.sacfullnet.sacfullnet.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sacfullnet.sacfullnet.repository.dao.FAQDao;
import br.com.sacfullnet.sacfullnet.service.FAQService;
import br.com.sacfullnet.sacfullnet.model.FAQ;
import java.util.List;

@Service
public class FAQServiceImpl implements FAQService{

    @Autowired
    FAQDao faqDao;

    @Override
    public List<FAQ> find(){
        return faqDao.find();
    }

    @Override
    public int save(FAQ faq){
        return faqDao.save(faq);
    }

    @Override
    public boolean update(FAQ faq){
        return faqDao.update(faq);
    }

    @Override
    public boolean delete(Integer id){
        return faqDao.delete(id);
    }
    
}

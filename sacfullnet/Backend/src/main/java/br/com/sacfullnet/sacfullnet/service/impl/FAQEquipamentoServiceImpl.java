package br.com.sacfullnet.sacfullnet.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.sacfullnet.sacfullnet.repository.dao.FAQEquipamentoDao;
import br.com.sacfullnet.sacfullnet.service.FAQEquipamentoService;

@Service
public class FAQEquipamentoServiceImpl implements FAQEquipamentoService {

    @Autowired
    FAQEquipamentoDao faqEquipamentoDao;

   
    @Override
    public boolean faqHasEquipamento(int id_faq, int id_equipamento) {
        return faqEquipamentoDao.faqHasEquipamento(id_faq, id_equipamento);
    }

    @Override
    public int addEquipamento(int id_faq, int id_equipamento){
        return faqEquipamentoDao.addEquipamento(id_faq, id_equipamento);
    }

    @Override
    public boolean deleteAll(int id_faq){
        return faqEquipamentoDao.deleteAll(id_faq);
    }
}

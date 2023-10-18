package br.com.sacfullnet.sacfullnet.service;

import java.util.List;


public interface FAQEquipamentoService {

    boolean faqHasEquipamento(int id_faq, int id_equipamento);

    boolean deleteAll(int id_faq);

    int addEquipamento(int id_faq, int id_equipamento);

}

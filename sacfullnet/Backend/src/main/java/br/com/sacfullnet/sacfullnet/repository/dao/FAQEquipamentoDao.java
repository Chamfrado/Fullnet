package br.com.sacfullnet.sacfullnet.repository.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;




public interface FAQEquipamentoDao {

    boolean faqHasEquipamento(int id_faq, int id_equipamento);

    boolean deleteAll(int id_faq);

    int addEquipamento(int id_faq, int id_equipamento);
}




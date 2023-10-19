package br.com.sacfullnet.sacfullnet.repository.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import br.com.sacfullnet.sacfullnet.model.FAQ;



public interface FAQDao {
    List<FAQ> find();

    List<FAQ> search(String search);

    int save(FAQ faq);

    boolean update(FAQ faq);

    boolean delete(int id);
   
}

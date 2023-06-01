package br.com.sacfullnet.sacfullnet.repository.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import br.com.sacfullnet.sacfullnet.model.FAQ;



public interface FAQDao {
    List<FAQ> find();

    int save(FAQ user);

    boolean update(FAQ user);

    boolean delete(int id);

    FAQ loadValues(ResultSet resultSet) throws SQLException;    
}

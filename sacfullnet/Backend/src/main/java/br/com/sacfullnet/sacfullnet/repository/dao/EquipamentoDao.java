package br.com.sacfullnet.sacfullnet.repository.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import br.com.sacfullnet.sacfullnet.model.Equipamento;



public interface EquipamentoDao {
    List<Equipamento> find();

    int save(Equipamento user);

    boolean update(Equipamento user);

    boolean delete(int id);

    Equipamento loadValues(ResultSet resultSet) throws SQLException;    
}

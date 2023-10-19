package br.com.sacfullnet.sacfullnet.repository.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import br.com.sacfullnet.sacfullnet.model.Equipment;



public interface EquipmentDao {

    List<Equipment> find();

    List<Equipment> search(String name);

    int save(Equipment user);

    boolean update(Equipment user);

    boolean delete(int id);

    Equipment loadValues(ResultSet resultSet) throws SQLException;

    Equipment findById(int id);

}
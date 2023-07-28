package br.com.sacfullnet.sacfullnet.repository.dao;

import br.com.sacfullnet.sacfullnet.model.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public interface UserDao{
    List<User> find();

    int save(User user);

    boolean update(User user);

    boolean delete(Integer id);

    User loadValues(ResultSet resultSet) throws SQLException;

    

}
package br.com.sacfullnet.sacfullnet.repository.dao;

import br.com.sacfullnet.sacfullnet.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public interface UserDao{
    List<User> find();

    List<User> search(String search);

    UserDetails findByLogin(String login);
    int save(User user);

    boolean update(User user);

    boolean delete(Integer id);

    User authenticate(String username, String password);


    User loadValues(ResultSet resultSet) throws SQLException;

    

}
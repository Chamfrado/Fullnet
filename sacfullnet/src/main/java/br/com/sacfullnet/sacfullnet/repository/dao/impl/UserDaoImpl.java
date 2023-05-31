package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.sacfullnet.sacfullnet.model.User;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.UserDao;

@Repository
public class UserDaoImpl implements UserDao{


    @Override
    public List<User> find(){
        List<User> users =  new ArrayList<>();

        final String sql = "SELECT * from usuario";

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try{
            connection = ConnectionFactory.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();

            while(resultSet.next()){
                User user = loadValues(resultSet);

                users.add(user);
            }
        }catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, preparedStatement, resultSet);
        }

        return users;
        
    }


    @Override
    public User loadValues(ResultSet resultSet) throws SQLException {
        User user = new User();
        
        user.setId(resultSet.getInt("id"));
        user.setEmail(resultSet.getString("email"));
        user.setSenha(resultSet.getString("senha"));
        user.setTipo(resultSet.getInt("tipo"));
        return user;
    }
}

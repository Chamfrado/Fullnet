package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
    public int save(User user){

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        int id = -1;

        try{
            final String sql = "INSERT INTO usuario (id, email, senha, tipo) VALUES (DEFAULT, ?, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getEmail());
            preparedStatement.setString(2, user.getSenha());
            preparedStatement.setInt(3, user.getTipo());

            preparedStatement.execute();

            resultSet = preparedStatement.getGeneratedKeys();

            if(resultSet.next()){
                id = resultSet.getInt(1);
            }
            connection.commit();
            return id;
        }catch (Exception e) {
            e.printStackTrace();

            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }

            return id;
        } finally {
            ConnectionFactory.close(connection, preparedStatement, resultSet);
        }
    }

    @Override
    public boolean update(User user){
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;


        try{
            final String sql = "UPDATE usuario set email=? ,senha=? ,tipo=?  WHERE id =?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, user.getEmail());
            preparedStatement.setString(2, user.getSenha());
            preparedStatement.setInt(3, user.getTipo());
            preparedStatement.setInt(4, user.getId());

            preparedStatement.executeUpdate();
            System.out.println(preparedStatement);
            connection.commit();
            return true;
        }catch (Exception e) {
            e.printStackTrace();

            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }

            return false;
        } finally {
            ConnectionFactory.close(connection, preparedStatement, resultSet);
        }
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

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
        PreparedStatement ps = null;
        ResultSet rs = null;

        try{
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            while(rs.next()){
                User user = loadValues(rs);

                users.add(user);
            }
        }catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }

        return users;
        
    }

    @Override
    public int save(User user){

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        int id = -1;

        try{
            final String sql = "INSERT INTO usuario (id, email, senha, tipo) VALUES (DEFAULT, ?, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getSenha());
            ps.setInt(3, user.getTipo());

            ps.execute();

            rs = ps.getGeneratedKeys();

            if(rs.next()){
                id = rs.getInt(1);
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
            ConnectionFactory.close(connection, ps, rs);
        }
    }

    @Override
    public boolean update(User user){
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;


        try{
            final String sql = "UPDATE usuario set email=? ,senha=? ,tipo=?  WHERE id =?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getSenha());
            ps.setInt(3, user.getTipo());
            ps.setInt(4, user.getId());

            ps.executeUpdate();
            System.out.println(ps);
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
            ConnectionFactory.close(connection, ps, rs);
        }
    }

    @Override
    public boolean delete(Integer id){
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try{
            final String sql = "Delete from usuario where id = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, id);
            ps.execute();

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
            ConnectionFactory.close(connection, ps, rs);
        }


    }

    @Override
    public User loadValues(ResultSet rs) throws SQLException {
        User user = new User();
        
        user.setId(rs.getInt("id"));
        user.setEmail(rs.getString("email"));
        user.setSenha(rs.getString("senha"));
        user.setTipo(rs.getInt("tipo"));
        return user;
    }
}

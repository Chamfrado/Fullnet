package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.sacfullnet.sacfullnet.model.UserRole;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import br.com.sacfullnet.sacfullnet.model.User;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.UserDao;

@Repository
public class UserDaoImpl implements UserDao {

    @Override
    public List<User> find() {
        List<User> users = new ArrayList<>();

        final String sql = "SELECT * from usuario order by login";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                User user = loadValues(rs);

                users.add(user);
            }
            System.out.println(sql);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }

        return users;

    }

    @Override
    public List<User> search(String search) {
        List<User> users = new ArrayList<>();
        final String sql = "SELECT * FROM usuario WHERE login ILIKE ? ORDER BY login";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setString(1, "%" + search + "%");  // Use the % wildcard for a partial match

            rs = ps.executeQuery();

            System.out.println(sql);
            while (rs.next()) {
                User user = loadValues(rs);
                users.add(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return users;
    }

    @Override
    public UserDetails findByLogin(String login) {
        User user = null;
        final String sql = "SELECT * FROM usuario WHERE login = ?";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setString(1, login );  // Use the % wildcard for a partial match

            rs = ps.executeQuery();

            System.out.println(sql);
            if (rs.next()) {
                user = loadValues(rs);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return user;
    }


    @Override
    public int save(User user) {

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        int id = -1;

        try {
            final String sql = "INSERT INTO usuario (id, login, password, role) VALUES (DEFAULT, ?, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getLogin());
            ps.setString(2, user.getPassword());
            ps.setString(3, String.valueOf(user.getRole()));

            ps.execute();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                id = rs.getInt(1);
            }
            connection.commit();
            System.out.println(sql);
            return id;
        } catch (Exception e) {
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
    public boolean update(User user) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "UPDATE usuario set login=? ,password=? ,role=?  WHERE id =?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getLogin());
            ps.setString(2, user.getPassword());
            ps.setString(3, String.valueOf(user.getRole()));
            ps.setInt(4, user.getId());

            ps.executeUpdate();
            System.out.println(ps);
            connection.commit();
            System.out.println(sql);
            return true;
        } catch (Exception e) {
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
    public boolean delete(Integer id) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "Delete from usuario where id = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, id);
            ps.execute();

            connection.commit();

            System.out.println(sql);

            return true;
        } catch (Exception e) {
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
public User authenticate(String username, String password) {

    Connection connection = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    User user = new User();

    try {
        final String sql = "SELECT * from usuario WHERE login=? AND password=?";

        connection = ConnectionFactory.getConnection();
        connection.setAutoCommit(false);

        ps = connection.prepareStatement(sql);
        
        ps.setString(1, username);
        ps.setString(2, password);

        rs = ps.executeQuery();
        
        if (rs.next()) {
            user = loadValues(rs);
        }

        // Commit a transação se um usuário válido foi encontrado
        if (user != null) {
            connection.commit();
        } else {
            // Caso contrário, faça o rollback da transação
            connection.rollback();
        }

        return user;
    } catch (Exception e) {
        e.printStackTrace();

        try {
            if (connection != null) {
                connection.rollback();
            }
        } catch (SQLException ex) {
            e.printStackTrace();
        }

        return null;
    } finally {
        ConnectionFactory.close(connection, ps, rs);
    }
}

    @Override
    public User loadValues(ResultSet rs) throws SQLException {
        User user = new User();

        user.setId(rs.getInt("id"));
        user.setLogin(rs.getString("login"));
        user.setPassword(rs.getString("password"));
        user.setRole(UserRole.valueOf(rs.getString("role")));
        return user;
    }
}



 
 
 
 
 

 

 
 

 
 

 
 
 

 

 

 
 
 
 
 
 
 
 

 
 
 
 
 

 
 
 
 
 
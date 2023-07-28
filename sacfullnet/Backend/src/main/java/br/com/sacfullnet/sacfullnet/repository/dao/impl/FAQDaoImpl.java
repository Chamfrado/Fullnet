package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.sacfullnet.sacfullnet.model.FAQ;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.FAQDao;

@Repository
public class FAQDaoImpl implements FAQDao {

    @Override
    public List<FAQ> find() {

        List<FAQ> faqs = new ArrayList<>();

        final String sql = "SELECT * from faq";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {

            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                FAQ faq = loadValues(rs);

                faqs.add(faq);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return faqs;

    }

    @Override
    public int save(FAQ faq) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        int id = -1;

        try {
            final String sql = "INSERT INTO faq (id, titulo, solucao) VALUES (DEFAULT, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, faq.getTitulo());
            ps.setString(2, faq.getSolucao());
           

            ps.execute();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                id = rs.getInt(1);
            }

            connection.commit();

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
    public boolean update(FAQ faq) {

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "UPDATE faq SET titulo = ?, solucao = ? WHERE id = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, faq.getTitulo());
            ps.setString(2, faq.getSolucao());
            ps.setInt(3, faq.getId());

            ps.execute();
            connection.commit();

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
    public boolean delete(int id) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final String sql = "Delete from faq where id = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, id);
            ps.execute();

            connection.commit();

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
    public FAQ loadValues(ResultSet rs) throws SQLException {
        FAQ faq = new FAQ();
        
        faq.setId(rs.getInt("id"));
        faq.setTitulo(rs.getString("titulo"));
        faq.setSolucao(rs.getString("solucao"));

        return faq;
    }

}

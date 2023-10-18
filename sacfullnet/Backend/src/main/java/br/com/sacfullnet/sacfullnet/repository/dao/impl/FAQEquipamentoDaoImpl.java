package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;
import java.sql.Array;

import org.springframework.stereotype.Repository;


import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;

import br.com.sacfullnet.sacfullnet.repository.dao.FAQEquipamentoDao;

@Repository
public class FAQEquipamentoDaoImpl implements FAQEquipamentoDao {

    @Override
    public boolean faqHasEquipamento(int id_faq, int id_equipamento) {
                

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        
        try {
            final String sql = "SELECT * FROM faq_has_equipamento WHERE id_faq = ? AND id_equipamento = ? ORDER BY id_faq ";
            System.out.println(sql);
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setInt(1, id_faq);
            ps.setInt(2, id_equipamento);
            rs = ps.executeQuery();

            if(rs.next()){
                return true;
            }else{
                return false;
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return false;
    }

    @Override
   public int addEquipamento(int id_faq, int id_equipamento){
       Connection connection = null;
       PreparedStatement ps = null;
       ResultSet rs = null;
       int id = -1;
       try {
           final String sql = "INSERT INTO faq_has_equipamento(id_faq, id_equipamento) VALUES (?, ?)";
           connection = ConnectionFactory.getConnection();
           connection.setAutoCommit(false);
           ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
           ps.setInt(1, id_faq);
           ps.setInt(2, id_equipamento);
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
    public boolean deleteAll(int id_faq){
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "DELETE FROM faq_has_equipamento WHERE id_faq = ?";
            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, id_faq);
            ps.execute();

            connection.commit();

            System.out.println(sql);

            return true;

        }  catch (Exception e) {
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


}

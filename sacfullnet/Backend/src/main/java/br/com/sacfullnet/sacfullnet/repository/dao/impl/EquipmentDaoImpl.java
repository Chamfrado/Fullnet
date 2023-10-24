package br.com.sacfullnet.sacfullnet.repository.dao.impl;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.sacfullnet.sacfullnet.model.Equipment;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.EquipmentDao;

@Repository
public class EquipmentDaoImpl implements EquipmentDao {

    @Override
    public List<Equipment> find() {

        List<Equipment> equipments = new ArrayList<>();

        final String sql = "SELECT * from equipamento order by nome";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {

            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            System.out.println(sql);
            while (rs.next()) {
                Equipment equipment = loadValues(rs);
               

                



                equipments.add(equipment);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return equipments;

    }

    @Override
    public List<Equipment> search(String name) {
        List<Equipment> equipments = new ArrayList<>();
        final String sql = "SELECT * FROM equipamento WHERE nome ILIKE ?";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setString(1, "%" + name + "%");  // Use the % wildcard for a partial match

            rs = ps.executeQuery();

            System.out.println(sql);
            while (rs.next()) {
                Equipment equipment = loadValues(rs);
                equipments.add(equipment);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return equipments;
    }


    @Override
    public Equipment findById(int id){
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        Equipment equipment = new Equipment();

        try {

            
            final String sql = "SELECT * from equipamento where id = ?";
            
            connection = ConnectionFactory.getConnection();

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, id);

            

            rs = ps.executeQuery();
            
            if (rs.next()) {
                equipment = loadValues(rs);
            }

            
            System.out.println(sql + " " + id);


        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return equipment;

    }

    @Override
    public Equipment findByName(String name){
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        Equipment equipment = new Equipment();

        try {


            final String sql = "SELECT * from equipamento where nome = ?";

            connection = ConnectionFactory.getConnection();

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, name);



            rs = ps.executeQuery();

            if (rs.next()) {
                equipment = loadValues(rs);
            }


            System.out.println(sql + " " + name);


        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return equipment;

    }



    @Override
    public int save(Equipment equipment) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        int id = -1;

        try {
            final String sql = "INSERT INTO equipamento (id, nome, ip_address , configuracao, descricao, imagem) VALUES (DEFAULT, ?,? , ?, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, equipment.getNome());
            ps.setString(2, equipment.getIp_address());
            ps.setString(3, equipment.getConfiguracao());
            ps.setString(4, equipment.getDescricao());
            ps.setString(5, equipment.getImagem());

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
    public boolean update(Equipment equipment) {

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "UPDATE equipamento set nome=?, ip_address=? ,configuracao=? ,descricao=?, imagem=?  WHERE id =?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, equipment.getNome());
            ps.setString(2, equipment.getIp_address());
            ps.setString(3, equipment.getConfiguracao());
            ps.setString(4, equipment.getDescricao());
            ps.setString(5, equipment.getImagem());
            ps.setInt(6, equipment.getId());

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
            final String sql = "Delete from equipamento where id = ?";

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
    public Equipment loadValues(ResultSet rs) throws SQLException {
        Equipment equipment = new Equipment();
        
        equipment.setId(rs.getInt("id"));
        equipment.setNome(rs.getString("nome"));
        equipment.setConfiguracao(rs.getString("configuracao"));
        equipment.setDescricao(rs.getString("descricao"));
        equipment.setImagem(rs.getString("imagem"));
        equipment.setIp_address(rs.getString("ip_address"));

        return equipment;
    }

}

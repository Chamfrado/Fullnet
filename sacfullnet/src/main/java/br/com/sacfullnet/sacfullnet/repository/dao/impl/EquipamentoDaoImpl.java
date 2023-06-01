package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.sacfullnet.sacfullnet.model.Equipamento;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.EquipamentoDao;

@Repository
public class EquipamentoDaoImpl implements EquipamentoDao {

    @Override
    public List<Equipamento> find() {

        List<Equipamento> equipamentos = new ArrayList<>();

        final String sql = "SELECT * from equipamento";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {

            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Equipamento equipamento = loadValues(rs);

                equipamentos.add(equipamento);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return equipamentos;

    }

    @Override
    public int save(Equipamento equipamento) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        int id = -1;

        try {
            final String sql = "INSERT INTO equipamento (id, nome, configuracao, descricao, imagem) VALUES (DEFAULT, ?, ?, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, equipamento.getNome());
            ps.setString(2, equipamento.getConfiguracao());
            ps.setString(3, equipamento.getDescricao());
            ps.setBytes(4, equipamento.getImagem());

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
    public boolean update(Equipamento equipamento) {

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "UPDATE equipamento set nome=? ,configuracao=? ,descricao=?, imagem=?  WHERE id =?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, equipamento.getNome());
            ps.setString(2, equipamento.getConfiguracao());
            ps.setString(3, equipamento.getDescricao());
            ps.setBytes(4, equipamento.getImagem());
            ps.setInt(5, equipamento.getId());

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
    public Equipamento loadValues(ResultSet rs) throws SQLException {
        Equipamento equipamento = new Equipamento();
        
        equipamento.setId(rs.getInt("id"));
        equipamento.setNome(rs.getString("nome"));
        equipamento.setConfiguracao(rs.getString("configuracao"));
        equipamento.setDescricao(rs.getString("descricao"));
        equipamento.setImagem(rs.getBytes("imagem"));

        return equipamento;
    }

}

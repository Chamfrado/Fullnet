package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import br.com.sacfullnet.sacfullnet.model.File;
import br.com.sacfullnet.sacfullnet.model.User;
import br.com.sacfullnet.sacfullnet.model.UserRole;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.FileDao;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.*;
@Repository
public class FileDaoImpl implements FileDao {
    @Override
    public File save(MultipartFile image, int id_equipamento, String filePath) {
        File imagem = new File();
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int id = -1;
        try {
            imagem.setFilepath(filePath);
            imagem.setFilename(image.getOriginalFilename());
            imagem.setType(image.getContentType());
            imagem.setId_equipamento(id_equipamento);

            final String sql = "INSERT INTO imagem (id, id_equipamento, filename, filepath, type) VALUES (DEFAULT, ?, ?, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, imagem.getId_equipamento());
            ps.setString(2, imagem.getFilename());
            ps.setString(3, imagem.getFilepath()); // Here, 'data' should be an array of bytes (byte[])
            ps.setString(4, imagem.getType());


            ps.execute();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                id = rs.getInt(1);
            }

            connection.commit();
            imagem.setId(id);
            return imagem;

        } catch (SQLException e) {
            e.printStackTrace();
            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }
            return imagem;
        }
    }

    @Override
    public File findImageById(int id) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        File image = new File();

        try {
            final String sql = "SELECT * FROM imagem WHERE id_equipamento = ?";

            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setInt(1, id);

            rs = ps.executeQuery();

            if (rs.next()) {
                image = loadValues(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return image;
    }

    @Override
    public  File update(MultipartFile image, int equipament_id, String filepath){
        File imagem = new File();
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int id = -1;
        try {
            imagem.setFilepath(filepath);
            imagem.setFilename(image.getOriginalFilename());
            imagem.setType(image.getContentType());
            imagem.setId_equipamento(equipament_id);

            final String sql = "UPDATE imagem SET filename=?, filepath=?, type=? WHERE id_equipamento = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, imagem.getFilename());
            ps.setString(2, imagem.getFilepath());
            ps.setString(3, imagem.getType());
            ps.setInt(4, imagem.getId_equipamento());


            ps.execute();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                id = rs.getInt(1);
            }

            connection.commit();
            imagem.setId(id);
            return imagem;

        } catch (SQLException e) {
            e.printStackTrace();
            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }
            return imagem;
        }
    }
    @Override
    public boolean deleteFile(int equipamento_id){
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "Delete from imagem where id_equipamento = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, equipamento_id);
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
    public File loadValues(ResultSet rs) throws SQLException {
        File file = new File();

        file.setId(rs.getInt("id"));
        file.setFilename(rs.getString("filename"));
        file.setFilepath(rs.getString("filepath"));
        file.setType(rs.getString("type"));
        file.setId_equipamento(rs.getInt("id_equipamento"));
        return file;
    }
}

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
    public File save(MultipartFile image, int id_equipamento) {
        File imagem = new File();
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int id = -1;
        try {
            imagem.setData(image.getBytes());
            imagem.setFilename(image.getOriginalFilename());
            imagem.setType(image.getContentType());
            imagem.setId_equipamento(id_equipamento);

            final String sql = "INSERT INTO imagem (id, id_equipamento, filename, data, type) VALUES (DEFAULT, ?, ?, ARRAY[?], ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, imagem.getId_equipamento());
            ps.setString(2, imagem.getFilename());
            ps.setBytes(3, imagem.getData()); // Here, 'data' should be an array of bytes (byte[])
            ps.setString(4, imagem.getType());


            ps.execute();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                id = rs.getInt(1);
            }

            connection.commit();
            imagem.setId(id);
            return imagem;

        } catch (IOException e) {
            throw new RuntimeException(e);
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
            final String sql = "SELECT * FROM imagem WHERE id = ?";

            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setInt(1, id);

            rs = ps.executeQuery();

            if (rs.next()) {
                // Retrieve the image data from the database
               // byte[] imageData = rs.getBytes("data");
               // int image_id = rs.get
               // int id_equipamento = rs.getInt("id_equipamento");
               // String filename = rs.getString("filename");
               // String type = rs.getString("type");

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
    public File loadValues(ResultSet rs) throws SQLException {
        File file = new File();

        file.setId(rs.getInt("id"));
        file.setFilename(rs.getString("filename"));
        file.setData(rs.getBytes("data"));
        file.setType(rs.getString("type"));
        file.setId_equipamento(rs.getInt("id_equipamento"));
        return file;
    }
}

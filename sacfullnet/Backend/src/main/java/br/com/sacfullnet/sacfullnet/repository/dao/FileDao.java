package br.com.sacfullnet.sacfullnet.repository.dao;

import br.com.sacfullnet.sacfullnet.model.File;
import br.com.sacfullnet.sacfullnet.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface FileDao {

    File save(MultipartFile image, int id_equipamento, String filePath);

    File update(MultipartFile image, int equipament_id, String filepath);

    File findImageById(int id);

    boolean deleteFile(int id);

    File loadValues(ResultSet resultSet) throws SQLException;
}

package br.com.sacfullnet.sacfullnet.service;

import br.com.sacfullnet.sacfullnet.model.File;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    File save(MultipartFile image, int equipament_id,String filepath);

    File update(MultipartFile image, int equipament_id, String filepath);

    File findImageById(int id);

    boolean deleteFile(int id);
}

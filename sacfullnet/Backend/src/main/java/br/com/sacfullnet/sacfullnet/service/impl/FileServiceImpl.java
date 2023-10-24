package br.com.sacfullnet.sacfullnet.service.impl;

import br.com.sacfullnet.sacfullnet.model.File;
import br.com.sacfullnet.sacfullnet.repository.dao.FileDao;
import br.com.sacfullnet.sacfullnet.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    FileDao fileDao;

    @Override
    public File save(MultipartFile image, int equipament_id) {
        return fileDao.save(image, equipament_id);
    }

    @Override
    public File findImageById(int id) {
        return fileDao.findImageById(id);
    }


}

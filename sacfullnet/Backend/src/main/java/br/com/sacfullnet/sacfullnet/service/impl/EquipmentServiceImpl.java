package br.com.sacfullnet.sacfullnet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sacfullnet.sacfullnet.model.Equipment;
import br.com.sacfullnet.sacfullnet.repository.dao.EquipmentDao;
import br.com.sacfullnet.sacfullnet.service.EquipmentService;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    EquipmentDao equipmentDao;

    @Override
    public List<Equipment> find(){
        return equipmentDao.find();
    }

    @Override
    public  List<Equipment> search(String name){ return equipmentDao.search(name);}

    @Override
    public Equipment findById(int id){
        return equipmentDao.findById(id);
    }

    @Override
    public int save(Equipment user){
        return equipmentDao.save(user);
    }

    @Override
    public boolean update(Equipment user){
        return equipmentDao.update(user);
    }

    @Override
    public boolean delete(int id){
        return equipmentDao.delete(id);
    }
    
}

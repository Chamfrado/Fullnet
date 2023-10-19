package br.com.sacfullnet.sacfullnet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sacfullnet.sacfullnet.model.Equipamento;
import br.com.sacfullnet.sacfullnet.repository.dao.EquipmentDao;
import br.com.sacfullnet.sacfullnet.service.EquipamentoService;

@Service
public class EquipamentoServiceImpl implements EquipamentoService {

    @Autowired
    EquipmentDao equipmentDao;

    @Override
    public List<Equipamento> find(){
        return equipmentDao.find();
    }

    @Override
    public Equipamento findById(int id){
        return equipmentDao.findById(id);
    }

    @Override
    public int save(Equipamento user){
        return equipmentDao.save(user);
    }

    @Override
    public boolean update(Equipamento user){
        return equipmentDao.update(user);
    }

    @Override
    public boolean delete(int id){
        return equipmentDao.delete(id);
    }
    
}

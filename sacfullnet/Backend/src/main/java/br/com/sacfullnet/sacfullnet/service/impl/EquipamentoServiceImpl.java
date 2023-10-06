package br.com.sacfullnet.sacfullnet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sacfullnet.sacfullnet.model.Equipamento;
import br.com.sacfullnet.sacfullnet.repository.dao.EquipamentoDao;
import br.com.sacfullnet.sacfullnet.service.EquipamentoService;

@Service
public class EquipamentoServiceImpl implements EquipamentoService {

    @Autowired
    EquipamentoDao equipamentoDao;

    @Override
    public List<Equipamento> find(){
        return equipamentoDao.find();
    }

    @Override
    public Equipamento findById(int id){
        return equipamentoDao.findById(id);
    }

    @Override
    public int save(Equipamento user){
        return equipamentoDao.save(user);
    }

    @Override
    public boolean update(Equipamento user){
        return equipamentoDao.update(user);
    }

    @Override
    public boolean delete(int id){
        return equipamentoDao.delete(id);
    }
    
}

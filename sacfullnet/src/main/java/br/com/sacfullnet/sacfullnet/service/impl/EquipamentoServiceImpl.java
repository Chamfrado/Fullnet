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
    EquipamentoDao userDao;

    @Override
    public List<Equipamento> find(){
        return userDao.find();
    }

    @Override
    public int save(Equipamento user){
        return userDao.save(user);
    }

    @Override
    public boolean update(Equipamento user){
        return userDao.update(user);
    }

    @Override
    public boolean delete(int id){
        return userDao.delete(id);
    }
    
}

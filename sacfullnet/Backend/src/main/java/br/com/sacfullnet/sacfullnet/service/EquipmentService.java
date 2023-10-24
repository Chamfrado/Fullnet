package br.com.sacfullnet.sacfullnet.service;

import java.util.List;

import br.com.sacfullnet.sacfullnet.model.Equipment;

public interface EquipmentService {
    
    List<Equipment> find();

    List<Equipment> search(String name);

    int save(Equipment equipment);

    boolean update(Equipment equipment);

    boolean delete(int id);

    Equipment findById(int id);

    Equipment findByName(String name);
    
}

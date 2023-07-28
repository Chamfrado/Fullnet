package br.com.sacfullnet.sacfullnet.service;

import java.util.List;

import br.com.sacfullnet.sacfullnet.model.Equipamento;

public interface EquipamentoService {
    
    List<Equipamento> find();

    int save(Equipamento equipamento);

    boolean update(Equipamento equipamento);

    boolean delete(int id);
    
}

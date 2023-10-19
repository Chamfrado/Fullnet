package br.com.sacfullnet.sacfullnet.model;

public class RelacionamentoEquipamento {


    private Integer id_equipamento;
    private String nome;
    public RelacionamentoEquipamento(String nome, Integer id_equipamento) {
        this.nome = nome;
        this.id_equipamento = id_equipamento;
    }

    public Integer getId_equipamento() {
        return id_equipamento;
    }

    public void setId_equipamento(Integer id_equipamento) {
        this.id_equipamento = id_equipamento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }



}


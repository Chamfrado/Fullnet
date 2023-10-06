package br.com.sacfullnet.sacfullnet.model;

import java.util.List;

public class FAQ {
    private Integer id;
    private String titulo;
    private String solucao;
    private List<Integer> equipamentosRelacionados;

    public FAQ() {
    }

    public FAQ(String titulo, String solucao, List<Integer> equipamentosRelacionados) {
        this.titulo = titulo;
        this.solucao = solucao;
        this.equipamentosRelacionados = equipamentosRelacionados;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getSolucao() {
        return solucao;
    }

    public void setSolucao(String solucao) {
        this.solucao = solucao;
    }

    public List<Integer> getEquipamentosRelacionados() {
        return equipamentosRelacionados;
    }

    public void setEquipamentosRelacionados(List<Integer> equipamentosRelacionados) {
        this.equipamentosRelacionados = equipamentosRelacionados;
    }
}

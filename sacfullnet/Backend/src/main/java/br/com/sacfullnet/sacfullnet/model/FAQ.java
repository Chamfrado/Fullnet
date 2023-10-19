package br.com.sacfullnet.sacfullnet.model;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public class FAQ {
    private Integer id;
    private String titulo;
    private String solucao;
    private List<JsonNode> equipamentosRelacionados;

    public FAQ() {
    }

    public FAQ(String titulo, String solucao, List<JsonNode> equipamentosRelacionados) {
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

    public List<JsonNode> getEquipamentosRelacionados() {
        return equipamentosRelacionados;
    }

    public void setEquipamentosRelacionados(List<JsonNode> equipamentosRelacionados) {
        this.equipamentosRelacionados = equipamentosRelacionados;
    }
}

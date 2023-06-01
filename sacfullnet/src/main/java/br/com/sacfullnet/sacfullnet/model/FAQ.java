package br.com.sacfullnet.sacfullnet.model;

public class FAQ {
    private Integer id;
    private String titulo;
    private String solucao;

    public FAQ() {
    }

    public FAQ(String titulo, String solucao) {
        this.titulo = titulo;
        this.solucao = solucao;
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
}

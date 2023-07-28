package br.com.sacfullnet.sacfullnet.model;

import java.util.Arrays;

public class Equipamento {
    private int id;
    private String nome;
    private String configuracao;
    private String descricao;
    private byte[] imagem;

    public Equipamento() {
    }

    public Equipamento(int id, String nome, String configuracao, String descricao, byte[] imagem) {
        this.id = id;
        this.nome = nome;
        this.configuracao = configuracao;
        this.descricao = descricao;
        this.imagem = imagem;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getConfiguracao() {
        return configuracao;
    }

    public void setConfiguracao(String configuracao) {
        this.configuracao = configuracao;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    @Override
    public String toString() {
        return "Equipamento{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", configuracao='" + configuracao + '\'' +
                ", descricao='" + descricao + '\'' +
                ", imagem=" + Arrays.toString(imagem) +
                '}';
    }
}
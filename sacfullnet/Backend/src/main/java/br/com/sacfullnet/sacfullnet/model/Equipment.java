package br.com.sacfullnet.sacfullnet.model;

public class Equipment {
    private int id;
    private int id_tipo_equipamento;
    private String ip_address;
    private String nome;
    private String configuracao;
    private String descricao;
    private String imagem;

    public Equipment() {
    }

    public Equipment(int id, int id_tipo_equipamento, String ip_address, String nome, String configuracao, String descricao,
                     String imagem) {
        this.id = id;
        this.id_tipo_equipamento = id_tipo_equipamento;
        this.ip_address = ip_address;
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

    public int getId_tipo_equipamento() {
        return id_tipo_equipamento;
    }

    public void setId_tipo_equipamento(int id_tipo_equipamento) {
        this.id_tipo_equipamento = id_tipo_equipamento;
    }

    public String getIp_Address() {
        return ip_address;
    }

    public void setIp_Address(String ip_address) {
        this.ip_address = ip_address;
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

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

}
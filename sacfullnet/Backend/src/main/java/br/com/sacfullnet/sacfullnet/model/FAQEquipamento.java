package br.com.sacfullnet.sacfullnet.model;

public class FAQEquipamento {
    int id_faq;
    int id_equipamento;

    public FAQEquipamento() {
    }

    public FAQEquipamento(int id_faq, int id_equipamento) {
        this.id_faq = id_faq;
        this.id_equipamento = id_equipamento;
    }

    public int getId_faq() {
        return id_faq;
    }

    public void setId_faq(int id_faq) {
        this.id_faq = id_faq;
    }

    public int getId_equipamento() {
        return id_equipamento;
    }

    public void setId_equipamento(int id_equipamento) {
        this.id_equipamento = id_equipamento;
    }
}

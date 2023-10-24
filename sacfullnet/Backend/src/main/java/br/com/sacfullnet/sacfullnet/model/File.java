package br.com.sacfullnet.sacfullnet.model;



public class File {

    private Integer id;
    private String filename;
    private byte[] data;
    private String type;

    private Integer id_equipamento;

    public File() {

    }

    public File(String filename, byte[] data, String type, Integer id_equipamento) {
        this.filename = filename;
        this.data = data;
        this.type = type;
        this.id_equipamento = id_equipamento;
    }

    public File(Integer id, String filename, byte[] data, String type, Integer id_equipamento) {
        this.id = id;
        this.filename = filename;
        this.data = data;
        this.type = type;
        this.id_equipamento = id_equipamento;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getId_equipamento() {
        return id_equipamento;
    }

    public void setId_equipamento(Integer id_equipamento) {
        this.id_equipamento = id_equipamento;
    }
}

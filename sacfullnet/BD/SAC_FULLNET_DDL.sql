CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo INT CHECK (tipo IN (1, 2))
    
);

CREATE TABLE tipo_Equipamento (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR
);

CREATE TABLE equipamento (
    id SERIAL PRIMARY KEY,
    id_tipo_equipamento INT,
    nome VARCHAR(255) NOT NULL,
    ip_address TEXT,
    configuracao TEXT,
    descricao TEXT,
    imagem TEXT,
    FOREIGN KEY (id_tipo_equipamento) REFERENCES Tipo_Equipamento(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    solucao TEXT
);

CREATE TABLE faq_has_equipamento (
    id_FAQ INT,
    id_equipamento INT,
    FOREIGN KEY (id_FAQ) REFERENCES FAQ(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_equipamento) REFERENCES Equipamento(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (id_FAQ, id_equipamento)
);

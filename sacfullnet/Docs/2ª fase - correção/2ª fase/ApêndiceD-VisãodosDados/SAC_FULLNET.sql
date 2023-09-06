CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo INT CHECK (tipo IN (1, 2)),
  situacao INT CHECK (situacao IN (1, 2)),
  data_usuario DATE
);

CREATE TABLE Tipo_Equipamento (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR
);

CREATE TABLE Equipamento (
  id SERIAL PRIMARY KEY,
  id_tipo_equipamento INT,
  nome VARCHAR(255) NOT NULL,
  ip TEXT,
  configuracao TEXT,
  descricao TEXT,
  imagem BYTEA,
  FOREIGN KEY (id_tipo_equipamento) REFERENCES Tipo_Equipamento(id)
);

CREATE TABLE FAQ (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  solucao TEXT
);

CREATE TABLE FAQ_has_equipamento (
  id_FAQ INT,
  id_equipamento INT,
  FOREIGN KEY (id_FAQ) REFERENCES FAQ(id),
  FOREIGN KEY (id_equipamento) REFERENCES Equipamento(id),
  PRIMARY KEY (id_FAQ, id_equipamento)
);

INSERT INTO usuario (email, senha, tipo, situacao, data_usuario)
VALUES
  ('usuario1@example.com', 'senha1', 1, 1, '2023-01-01'),
  ('usuario2@example.com', 'senha2', 1, 2, '2023-01-02'),
  ('usuario3@example.com', 'senha3', 2, 1, '2023-01-03'),
  ('usuario4@example.com', 'senha4', 1, 1, '2023-01-04'),
  ('usuario5@example.com', 'senha5', 2, 2, '2023-01-05'),
  ('usuario6@example.com', 'senha6', 1, 2, '2023-01-06'),
  ('usuario7@example.com', 'senha7', 2, 1, '2023-01-07'),
  ('usuario8@example.com', 'senha8', 1, 2, '2023-01-08'),
  ('usuario9@example.com', 'senha9', 2, 1, '2023-01-09'),
  ('usuario10@example.com', 'senha10', 1, 1, '2023-01-10');
  
  
INSERT INTO Tipo_Equipamento (descricao)
VALUES
  ('ONU'),
  ('Roteador');

INSERT INTO Equipamento (id_tipo_equipamento, nome, ip, configuracao, descricao, imagem)
VALUES
  (1, 'Equipamento 1', '192.168.0.1', 'Configuração 1', 'Descrição 1', NULL),
  (2, 'Equipamento 2', '192.168.0.2', 'Configuração 2', 'Descrição 2', NULL),
  (1, 'Equipamento 3', '192.168.0.3', 'Configuração 3', 'Descrição 3', NULL),
  (2, 'Equipamento 4', '192.168.0.4', 'Configuração 4', 'Descrição 4', NULL),
  (1, 'Equipamento 5', '192.168.0.5', 'Configuração 5', 'Descrição 5', NULL),
  (2, 'Equipamento 6', '192.168.0.6', 'Configuração 6', 'Descrição 6', NULL),
  (1, 'Equipamento 7', '192.168.0.7', 'Configuração 7', 'Descrição 7', NULL),
  (2, 'Equipamento 8', '192.168.0.8', 'Configuração 8', 'Descrição 8', NULL),
  (1, 'Equipamento 9', '192.168.0.9', 'Configuração 9', 'Descrição 9', NULL),
  (2, 'Equipamento 10', '192.168.0.10', 'Configuração 10', 'Descrição 10', NULL);

INSERT INTO FAQ (titulo, solucao)
VALUES
  ('Pergunta 1', 'Solução para a pergunta 1'),
  ('Pergunta 2', 'Solução para a pergunta 2'),
  ('Pergunta 3', 'Solução para a pergunta 3'),
  ('Pergunta 4', 'Solução para a pergunta 4'),
  ('Pergunta 5', 'Solução para a pergunta 5'),
  ('Pergunta 6', 'Solução para a pergunta 6'),
  ('Pergunta 7', 'Solução para a pergunta 7'),
  ('Pergunta 8', 'Solução para a pergunta 8'),
  ('Pergunta 9', 'Solução para a pergunta 9'),
  ('Pergunta 10', 'Solução para a pergunta 10');

INSERT INTO FAQ_has_equipamento (id_FAQ, id_equipamento)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (5, 9),
  (5, 10),
  (6, 1),
  (6, 3),
  (7, 5),
  (7, 7),
  (8, 9),
  (8, 2),
  (9, 4),
  (9, 6),
  (10, 8),
  (10, 10)






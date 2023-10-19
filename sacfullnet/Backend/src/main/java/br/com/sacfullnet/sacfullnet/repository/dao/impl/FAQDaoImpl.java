package br.com.sacfullnet.sacfullnet.repository.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;
import java.sql.Array;
import java.util.Map;

import br.com.sacfullnet.sacfullnet.model.RelacionamentoEquipamento;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.stereotype.Repository;

import br.com.sacfullnet.sacfullnet.model.FAQ;
import br.com.sacfullnet.sacfullnet.repository.connection.ConnectionFactory;
import br.com.sacfullnet.sacfullnet.repository.dao.FAQDao;

@Repository
public class FAQDaoImpl implements FAQDao {

    @Override
    public List<FAQ> find() {
        List<FAQ> faqs = new ArrayList<>();

        final String sql = "SELECT\n" +
                "    f.id AS faq_id,\n" +
                "    f.titulo AS faq_titulo,\n" +
                "    f.solucao AS faq_solucao,\n" +
                "    COALESCE(\n" +
                "        json_agg(jsonb_build_object('id_equipamento', fe.id_equipamento, 'nome', equipamento.nome) ORDER BY fe.id_equipamento),\n" +
                "        '[]'::json\n" +
                "    ) AS equipamentos_relacionados\n" +
                "FROM\n" +
                "    faq f\n" +
                "LEFT JOIN faq_has_equipamento fe ON f.id = fe.id_FAQ\n" +
                "LEFT JOIN equipamento ON equipamento.id = fe.id_equipamento\n" +
                "GROUP BY\n" +
                "    f.id, f.titulo, f.solucao\n" +
                "ORDER BY\n" +
                "    f.titulo;\n";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                FAQ faq = new FAQ();
                faq.setId(rs.getInt("faq_id"));
                faq.setTitulo(rs.getString("faq_titulo"));
                faq.setSolucao(rs.getString("faq_solucao"));

                String jsonArrayString = rs.getString("equipamentos_relacionados");

                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    ArrayNode jsonArray = objectMapper.readValue(jsonArrayString, ArrayNode.class);

                    List<JsonNode> equipamentosRelacionadosList = new ArrayList<>();
                    for (JsonNode equipment : jsonArray) {
                        equipamentosRelacionadosList.add(equipment);
                    }

                    faq.setEquipamentosRelacionados(equipamentosRelacionadosList);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                faqs.add(faq);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return faqs;
    }

    @Override
    public List<FAQ> search(String search) {
        List<FAQ> faqs = new ArrayList<>();

        final String sql = "SELECT\n" +
                "    f.id AS faq_id,\n" +
                "    f.titulo AS faq_titulo,\n" +
                "    f.solucao AS faq_solucao,\n" +
                "    COALESCE(\n" +
                "        json_agg(jsonb_build_object('id_equipamento', fe.id_equipamento, 'nome', equipamento.nome) ORDER BY fe.id_equipamento),\n" +
                "        '[]'::json\n" +
                "    ) AS equipamentos_relacionados\n" +
                "FROM\n" +
                "    faq f\n" +
                "LEFT JOIN faq_has_equipamento fe ON f.id = fe.id_FAQ\n" +
                "LEFT JOIN equipamento ON equipamento.id = fe.id_equipamento\n" +
                "WHERE  f.titulo ILIKE ?\n" +
                "GROUP BY\n" +
                "    f.id, f.titulo, f.solucao\n" +
                "ORDER BY\n" +
                "    f.titulo;";

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            connection = ConnectionFactory.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setString(1, "%" + search + "%");  // Use the % wildcard for a partial match

            rs = ps.executeQuery();

            System.out.println(sql);

            while (rs.next()) {
                FAQ faq = new FAQ();
                faq.setId(rs.getInt("faq_id"));
                faq.setTitulo(rs.getString("faq_titulo"));
                faq.setSolucao(rs.getString("faq_solucao"));

                String jsonArrayString = rs.getString("equipamentos_relacionados");

                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    ArrayNode jsonArray = objectMapper.readValue(jsonArrayString, ArrayNode.class);

                    List<JsonNode> equipamentosRelacionadosList = new ArrayList<>();
                    for (JsonNode equipment : jsonArray) {
                        equipamentosRelacionadosList.add(equipment);
                    }

                    faq.setEquipamentosRelacionados(equipamentosRelacionadosList);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                faqs.add(faq);
            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
        return faqs;
    }

    @Override
    public int save(FAQ faq) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        int id = -1;

        try {
            final String sql = "INSERT INTO faq (id, titulo, solucao) VALUES (DEFAULT, ?, ?)";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, faq.getTitulo());
            ps.setString(2, faq.getSolucao());

            ps.execute();

            rs = ps.getGeneratedKeys();

            if (rs.next()) {
                id = rs.getInt(1);
            }
            connection.commit();
            System.out.println(sql);
            return id;
        } catch (Exception e) {
            e.printStackTrace();

            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }

            return id;
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
    }

    @Override
    public boolean update(FAQ faq) {

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            final String sql = "UPDATE faq SET titulo = ?, solucao = ? WHERE id = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, faq.getTitulo());
            ps.setString(2, faq.getSolucao());
            ps.setInt(3, faq.getId());

            ps.execute();
            connection.commit();

            return true;

        } catch (Exception e) {
            e.printStackTrace();

            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }
            return false;
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
    }

    @Override
    public boolean delete(int id) {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            final String sql = "Delete from faq where id = ?";

            connection = ConnectionFactory.getConnection();
            connection.setAutoCommit(false);

            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, id);
            ps.execute();

            connection.commit();

            return true;
        } catch (Exception e) {
            e.printStackTrace();

            try {
                connection.rollback();
            } catch (SQLException ex) {
                e.printStackTrace();
            }

            return false;
        } finally {
            ConnectionFactory.close(connection, ps, rs);
        }
    }

}

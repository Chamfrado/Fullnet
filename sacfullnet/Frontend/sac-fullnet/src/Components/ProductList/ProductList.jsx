/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, InputGroup, Label, Row, Spinner, Table } from "reactstrap";

import SacfullnetAPI from "../../Services/SacfullnetApi";
import ProductCard from "../ProductCard/ProductCard";
import { BsArrowDownUp, BsRouter, BsSearch } from "react-icons/bs";
import ProductAddCard from "../ProductCard/ProductAddCard";

const ProductList = ({ onSaveSucess, onDeleteSucess, onAddSucess, props }) => {
  const [error, setError] = useState();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);

  const toggleAddModal = () => setAddModal(!addModal);

  //Cuidando da pesquisa 
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };


  const fetchTableData = () => {

    const url = "equipamento?search=" + searchQuery;
    SacfullnetAPI.get(url,"Authorization", 'Bearer '+ props)
      .then(({ data }) => {
        setTableData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const saveSucess = () => {
    onSaveSucess();
    fetchTableData();
  }

  const deleteSucess = () => {

    onDeleteSucess();
    fetchTableData();
  }

  const addSucess = () => {
    onAddSucess();
    fetchTableData();
  }

  useEffect(() => {
    fetchTableData();
  }, [searchQuery]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Create rows with three cards each
  const rows = [];
  for (let i = 0; i < tableData.length; i += 3) {
    const cards = [];
    for (let j = 0; j < 3; j++) {
      const dataIndex = i + j;
      if (dataIndex < tableData.length) {
        cards.push(
          <Col key={tableData[dataIndex].id} md={4}>
            <Container>
              <ProductCard Deleted={deleteSucess} Saved={saveSucess} item={tableData[dataIndex]} />
            </Container>
          </Col>
        );
      }
    }
    rows.push(
      <Row key={i}>
        {cards}
      </Row>
    );
  }

  return (
    <Container id="TableProduct">
      <Row  style={{ paddingTop: 30, paddingLeft: 50 }}>
        <Col xs="5">
          <InputGroup>
            <Input
              id="search"
              name="searchQuery"
              placeholder="Digite o nome do equipamento para pesquisar"
              onChange={handleSearchChange}
              type="search"
            />

            <Button color="primary">
              <BsSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col xs="2">
          <Button onClick={toggleAddModal} color="primary" ><BsRouter /> Adicionar Equipamento</Button>
        </Col>
        <Col>
          <Button color="primary" onClick={fetchTableData}> Atualizar dados <BsArrowDownUp /></Button>
        </Col>
      </Row>
      <Row style={{ paddingTop: 10, flex: 1, justifyContent: "center", alignItems: "center" }}>
        {isLoading ? (
          <Label>Carregando Dados <Spinner color="primary" style={{ alignSelf: "center" }} /></Label>
        ) : (
          rows.map((row, index) => (
            <Table key={index} hover>
              <tbody>{row}</tbody>
            </Table>
          ))
        )}

      </Row>
      {addModal && <ProductAddCard onAddSucess={addSucess} open={addModal} />}
    </Container>
  );
};

export default ProductList;

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, InputGroup, Row, Spinner, Table } from "reactstrap";

import SacfullnetAPI from "../../Services/SacfullnetApi";
import ProductCard from "../ProductCard/ProductCard";
import {  BsArrowDownUp, BsRouter, BsSearch } from "react-icons/bs";
import ProductAddCard from "../ProductCard/ProductAddCard";

const ProductList = ({onSaveSucess, onDeleteSucess, onAddSucess}) => {
  const [error, setError] = useState();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);


  const toggleAddModal = () => setAddModal(!addModal);

  
  const fetchTableData = () => {
    const url = "equipamento";
    SacfullnetAPI.get(url)
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
  }, []);

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
      <Row style={{ paddingTop: 30, paddingLeft:50 }}>
        <Col xs="5">
          <InputGroup>
            <Input
              id="search"
              name="search"
              placeholder="Pesquise Aqui"
              type="search"
            />
            
            <Button color="primary">
              <BsSearch/>
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
      <Row style={{paddingTop: 10}}>
        {isLoading ? (
          <Spinner color="primary" style={{ alignSelf: "center" }} />
        ) : (
          rows.map((row, index) => (
            <Table key={index} hover>
              <tbody>{row}</tbody>
            </Table>
          ))
        )}

      </Row>
          {addModal && <ProductAddCard onAddSucess={addSucess} open={addModal}/>}
    </Container>
  );
};

export default ProductList;

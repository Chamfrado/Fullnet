import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Table } from "reactstrap";

import SacfullnetAPI from "../../Services/SacfullnetApi";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = () => {
  const [error, setError] = useState();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
              <ProductCard item={tableData[dataIndex]} />
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
      {isLoading ? (
        <Spinner color="primary" style={{ alignSelf: "center" }} />
      ) : (
        rows.map((row, index) => (
          <Table key={index} hover>
            <tbody>{row}</tbody>
          </Table>
        ))
      )}
    </Container>
  );
};

export default ProductList;

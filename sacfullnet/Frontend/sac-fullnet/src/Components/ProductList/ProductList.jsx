import React, { useEffect, useState } from "react"
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

    //Inicialização da tabela e Promover pesquisa
    useEffect(() => {
        fetchTableData();
    }, []);



    if (error) {
        return <p>Error: {error}</p>;
    }


    // Create rows with two cards each
    const rows = [];
    for (let i = 0; i < tableData.length; i += 2) {
        const card1 = tableData[i] ? (
            <Col key={tableData[i].id} md={6}>
                <Container>
                    <ProductCard item={tableData[i]} />
                </Container>

            </Col>
        ) : null;

        const card2 = tableData[i + 1] ? (
            <Col key={tableData[i + 1].id} md={6}>
                <Container>
                    <ProductCard item={tableData[i + 1]} />
                </Container>


            </Col>
        ) : null;

        rows.push(
            <Row key={i}>
                {card1}
                {card2}
            </Row>
        );
    }



    return (
        <Container id="TableProduct">
            {isLoading ? (
                <Spinner color="primary" style={{ alignSelf: "center" }} />
            ) : (
                rows.map((row, index) => (
                    <Table key={index} hover >
                        <tbody>{row}</tbody>
                    </Table>
                ))
            )}
        </Container>
    )
}

export default ProductList;
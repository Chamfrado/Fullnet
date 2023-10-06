/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Badge, Button, Col, Container, Input, InputGroup, Row, Table } from "reactstrap"
import { BsSearch } from "react-icons/bs";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import FaqDetail from "../FaqDetail/FaqDetail";

const FaqTable = () => {
    const [error, setError] = useState();
    const [tableData, setTableData] = useState([]);
    const [productNames, setProductNames] = useState({
        id: -1
    }); // Store product names
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFaq, setSelectedFaq] = useState({

    });
    const [toggleModal, setToggleModal] = useState(false);

    const toggle = () => {
        setToggleModal(!toggleModal);

    }
    const dismiss = () => {
        setToggleModal(false);
        setSelectedFaq({id: -1});
    }
    // Function to fetch product names
    async function fetchEquipament(productId) {
        try {
            const url = "equipamento/" + productId;
            const response = await SacfullnetAPI.get(url);
            return response.data.nome;
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
            return ""; // Return an empty string on error
        }
    }


    useEffect
    const fetchTableData = () => {
        const url = "faq";
        SacfullnetAPI.get(url)
            .then(({ data }) => {
                // Fetch product names for all products and store them in productNames state
                const promises = data.map(async (item) => {
                    const name = await fetchEquipament(item.id);
                    return { id: item.id, titulo: item.titulo, solucao: item.solucao, equipamentosRelacionados: item.equipamentosRelacionados, productName: name };
                });
                Promise.all(promises)
                    .then((faqData) => {
                        const productNamesObj = {};
                        faqData.forEach((item) => {
                            productNamesObj[item.id] = item.productName;
                        });
                        setProductNames(productNamesObj);
                        setTableData(faqData);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        setError(error.message);
                        setIsLoading(false);
                    });
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    useEffect(() => {

       if(selectedFaq.id !== -1 ){
        toggle();
       }
            
    }, [selectedFaq])

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container fluid>
            <Row style={{ paddingTop: 30 }}>
                <Col xs="5">
                    <InputGroup>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Pesquise Aqui"
                            type="search"
                        />
                        <Button color="primary">
                            <BsSearch />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row style={{ padding: 20 }}>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Equipamentos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(item => (
                            <tr style={{ cursor: "pointer" }} onClick={() => setSelectedFaq(item)} key={item.id}>
                                <td>{item.titulo}</td>
                                <td>
                                    {item.equipamentosRelacionados.map((produtoId) => (
                                        <Badge key={produtoId} style={{ margin: 2 }} color="primary">
                                            {productNames[produtoId]} {/* Display product name from state */}
                                        </Badge>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <FaqDetail selectedFaq={selectedFaq} productNames={productNames} isOpen={toggleModal} onDismiss={dismiss} />
        </Container>
    );
}

export default FaqTable;

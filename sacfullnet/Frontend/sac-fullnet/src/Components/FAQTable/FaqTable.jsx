/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Badge, Button, Col, Container, Input, InputGroup, Label, Row, Spinner, Table, UncontrolledTooltip } from "reactstrap"
import { BsFillPatchPlusFill, BsFillTrashFill, BsPencilSquare, BsPersonPlus, BsSearch } from "react-icons/bs";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import FaqDetail from "../FaqDetail/FaqDetail";
import FaqAddCard from "../FAQCard/FaqAddCard";

const FaqTable = ({ onSaveSucess, onDeleteSucess, onAddSucess }) => {
    const [error, setError] = useState();
    const [tableData, setTableData] = useState([]);
    const [productNames, setProductNames] = useState({
        id: -1
    });
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFaq, setSelectedFaq] = useState({

        id: -1

    });
    const [toggleModal, setToggleModal] = useState(false);
    



    const [addModal, setAddModal] = useState(false);
    const toggleAddModal = () => setAddModal(!addModal);


    const toggle = () => {
        setToggleModal(!toggleModal);

    }
    const dismiss = () => {
        setToggleModal(false);
        setSelectedFaq({ id: -1 });
    }
    const addSucess = () => {
        onAddSucess();
        fetchTableData();
        setAddModal(false);
    }

    const saveSucess = () => {
        onSaveSucess();
        fetchTableData();
      }
    
      const deleteSucess = () => {
        
        onDeleteSucess();
        fetchTableData();
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

        if (selectedFaq.id !== -1 && selectedFaq !== null) {
            toggle();
        }

    }, [selectedFaq])

    if (error) {
        return <p>Error: {error}</p>;
    }

    //CONTROLE DE USUARIO
    const user = 1;
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
                <Col>
                    <Button color="primary" onClick={toggleAddModal}><BsFillPatchPlusFill /> Adicionar FAQ</Button>
                </Col>
            </Row>
            <Row style={{ paddingTop: 20 }}>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Equipamentos</th>
                            {user == 1? <th>Ações</th> : null}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                          <Label> Carregando Informações <Spinner color="primary" style={{ alignSelf: "center" }} /> </Label>
                        ) : (
                            tableData.map(item => (
                                <tr style={{ cursor: "pointer" }}  key={item.id}>
                                    <td onClick={() => setSelectedFaq(item)}>{item.titulo}</td>
                                    <td onClick={() => setSelectedFaq(item)}>
                                        {item.equipamentosRelacionados.map((produtoId) => (
                                            <Badge key={produtoId} style={{ margin: 2 }} color="primary">
                                                {productNames[produtoId]} {/* Display product name from state */}
                                            </Badge>
                                        ))}
                                    </td>
                                    {user ==1?<td>
                                    <Button id="updateButton" onClick={() => alert("oi")} color="primary"> <BsPencilSquare /></Button>
                                    {'   '}
                                    <Button id="deleteButton" onClick={() => alert("oi")} color="primary" > <BsFillTrashFill /></Button>
                                </td> : null }
                                    
                                </tr>
                            ))
                        )}
                        
                    </tbody>
                </Table>
            </Row>
            {selectedFaq !== -1 ? <FaqDetail selectedFaq={selectedFaq} productNames={productNames} isOpen={toggleModal} onDismiss={dismiss} /> : <></>}
            {addModal && <FaqAddCard onAddSucess={addSucess} open={addModal} />}
            <UncontrolledTooltip target="updateButton"> Atualizar</UncontrolledTooltip>
            <UncontrolledTooltip target="deleteButton"> Deletar</UncontrolledTooltip>
        </Container>
    );
}

export default FaqTable;

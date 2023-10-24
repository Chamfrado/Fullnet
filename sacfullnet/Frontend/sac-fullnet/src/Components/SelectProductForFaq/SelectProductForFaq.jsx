/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { Button, Card, Col, Container, Input, Label, Row, Table, UncontrolledTooltip } from "reactstrap"
import SacfullnetAPI from "../../Services/SacfullnetApi";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const SelectProductForFaq = ({ updateList, initialSelectedProducts, op, isEmpty }) => {

    const [productData, setProductData] = useState([{
        id: "",
        name: "",
    }]);

    const [productList, setProductList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    //Cuidando da pesquisa 
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
    };



    const [selectedProductAdd, setSelectedProductAdd] = useState({
        "id": -1,
        "id_tipo_equipamento": -1,
        "nome": "",
        "configuracao": "",
        "descricao": "",
        "imagem": "",
        "ip_Address": null
    });

    const [selectedProductRemove, setSelectedProductRemove] = useState({
        "id": -1,
        "id_tipo_equipamento": -1,
        "nome": "",
        "configuracao": "",
        "descricao": "",
        "imagem": "",
        "ip_Address": null
    });

    const fetchProductData = () => {
        const url = "equipamento?search=" + searchQuery;
        SacfullnetAPI.get(url)
            .then(async ({ data }) => {
                if (op === "update") {
                    let newData = [...data];
                    let updatedProductList = [...productList]; // Create a new array to hold the products to be added

                    await initialSelectedProducts.map(product => {
                        const productIndex = newData.findIndex((p) => p.id === product.id_equipamento);
                        if (productIndex !== -1) {
                            const productToAdd = newData[productIndex];

                            // Add the product to the updatedProductList
                            updatedProductList.push(productToAdd);

                            // Remove the product from newData
                            newData.splice(productIndex, 1);
                        }
                    });

                    // Update both productData and productList
                    setProductData(newData);
                    setProductList(updatedProductList);
                } else if (op == "add") {
                    setProductData(data);
                    setIsLoading(false);
                }

            })
            .catch((error) => {
                setIsLoading(false);
                alert(error);
            });
    }



    useEffect(() => {
        fetchProductData();
    }, [searchQuery]);

    useEffect(() => {
        updateList(productList);
    }, [productList])

    const addProduct = (product) => {
        // Check if the product is not already in the productList
        if (!productList.some((p) => p.id === product.id)) {
            // Find the index of the product in productData
            const productIndex = productData.findIndex((p) => p.id === product.id);

            if (productIndex !== -1) {
                // Create a new list with the product removed from productData
                const updatedProductData = [...productData];
                updatedProductData.splice(productIndex, 1);

                // Create a new list with the product added to productList
                const updatedProductList = [...productList, product];

                // Update the state for both productData and productList
                setProductData(updatedProductData);
                setProductList(updatedProductList);

                setSelectedProductAdd({});
                setSelectedProductRemove({});
            }
        }
    }

    const removeProduct = (product) => {
        // Check if the product is in the productList
        if (productList.some((p) => p.id === product.id)) {
            // Find the index of the product in productList
            const productIndex = productList.findIndex((p) => p.id === product.id);

            if (productIndex !== -1) {
                // Create a new list with the product removed from productList
                const updatedProductList = [...productList];
                updatedProductList.splice(productIndex, 1);

                // Create a new list with the product added back to productData
                const updatedProductData = [...productData, product];

                // Update the state for both productList and productData
                setProductList(updatedProductList);
                setProductData(updatedProductData);
                setSelectedProductAdd({});
                setSelectedProductRemove({});
            }
        }
    };






    return (
        <Container >
            <Row>
                <Col >
                    <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <Table responsive bordered hover>
                            <thead>
                                <tr>
                                    <th>Lista de Equipamentos</th>
                                </tr>
                                <tr>
                                    <th>
                                        <Input
                                            id="search"
                                            name="searchQuery"
                                            placeholder="Pesquise Aqui"
                                            onChange={handleSearchChange}
                                            type="search"
                                        />
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {productData.map(product => (
                                    <tr key={product.id} style={{ cursor: "pointer" }} onClick={() => setSelectedProductAdd(product)}>
                                        <td className={selectedProductAdd.id == product.id ? "bg-primary" : ""}>{product.nome}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col xs="1" >
                    <Row>

                        <Button color="primary" id="add" onClick={() => addProduct(selectedProductAdd)}><BsFillArrowRightCircleFill /> </Button>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>

                        <Button color="primary" id="remove" onClick={() => removeProduct(selectedProductRemove)}><BsFillArrowLeftCircleFill /> </Button>
                    </Row>
                    
                </Col>

                <Col>
                    <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <Table responsive bordered hover>
                            <thead>
                                <tr>
                                    <th>Equipamentos Selecionados</th>
                                </tr>
                                {isEmpty && 
                                <tr>
                                    <th style={{color: "red"}}>lista não pode ser vazia</th>
                                </tr> }
                                

                            </thead>
                            <tbody>
                                {productList.map(product => (
                                    <tr key={product.id} style={{ cursor: "pointer" }} onClick={() => setSelectedProductRemove(product)}>
                                        <td className={selectedProductRemove.id == product.id ? "bg-danger" : ""}>{product.nome}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                </Col>

            </Row>
            <UncontrolledTooltip target="add">Adicionar Produto</UncontrolledTooltip>
            <UncontrolledTooltip target="remove" placement="bottom" >Retirar Produto</UncontrolledTooltip>
        </Container >
    )
}

export default SelectProductForFaq
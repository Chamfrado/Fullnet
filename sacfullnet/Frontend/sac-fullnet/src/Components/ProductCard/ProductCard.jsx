/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import ProductUpdateCard from "./ProductUpdateCard";

const ProductCard = ({ item }) => {
    const [modal, setModal] = useState(false);

    const [updateModal, setUpdateModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    const toggleModal = () => setModal(!modal);


    const [image, setImage] = useState(null);

    useEffect(() => {
        // Dynamically load the image when the component mounts ${item.imagem}
        import(`../../../public/equipament_img/${item.imagem}.jpeg`)
            .then((module) => {
                setImage(module.default);
            })
            .catch((error) => {
                console.error("Error loading image:", error);
            });
    }, [item.imagem]);

    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
            <Card onClick={toggleModal} className="bg-primary" style={{ cursor: "pointer" }}>
                {image && (
                    <img
                        id="equip1"
                        style={{ width: "50vh", cursor: "pointer", padding: 10 }}
                        src={image}
                        alt="logo"
                    />
                )}
                <CardBody>
                    <CardTitle tag="h5">{item.nome}</CardTitle>
                </CardBody>
            </Card>


            <Modal isOpen={modal} toggle={toggleModal} size="lg">
                <ModalHeader toggle={toggleModal}>

                    {item.nome}


                </ModalHeader>
                <ModalBody>

                    <Row style={{ padding: 10 }}>
                        <Label tag="h5">Descrição: </Label>

                        <Label>{item.descricao}</Label>


                    </Row>
                    <Row style={{ padding: 10 }}>
                        <Label tag="h5">Configuração: </Label>
                        <Label>{item.configuracao}</Label>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                        <DropdownToggle caret >
                            Opções
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setUpdateModal(!updateModal)}>Atualizar</DropdownItem>
                            <DropdownItem>Deletar</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" onClick={toggleModal}>
                        Voltar
                    </Button>


                </ModalFooter>
            </Modal>
            {updateModal && <ProductUpdateCard item={item} open={updateModal} />}
        </Container>

        

    );
};

export default ProductCard;

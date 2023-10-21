/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardTitle, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import ProductUpdateCard from "./ProductUpdateCard";
import ProductDeleteCard from "./ProductDeleteCard";

const ProductCard = ({ item , Saved, Deleted }) => {
    const [modal, setModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    const toggleModal = () => setModal(!modal);


    const [image, setImage] = useState(null);


    const onSaveSucessfull = () => {
        
        Saved();
        toggleModal();
    }

    const onDeleteSucessfull = () => {
        Deleted();
        toggleModal();
    }

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
            
            <Card onClick={toggleModal} className="bg-primary" style={{ cursor: "pointer", width: "100%" }}>
                {image && (
                    <img
                        id="equip1"
                        style={{ width: "100%", height: "35vh", cursor: "pointer", padding: 10 }}
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
                            <DropdownItem onClick={() => setDeleteModal(!deleteModal)}>Deletar</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" onClick={toggleModal}>
                        Voltar
                    </Button>


                </ModalFooter>
            </Modal>
            {updateModal && <ProductUpdateCard item={item} onSaveSucess={onSaveSucessfull} open={updateModal} />}
            {deleteModal && <ProductDeleteCard item={item} onDeleteSucess={onDeleteSucessfull} open={deleteModal} />}
        </Container>

        

    );
};

export default ProductCard;

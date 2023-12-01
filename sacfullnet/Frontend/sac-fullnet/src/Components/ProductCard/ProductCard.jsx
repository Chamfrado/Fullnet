/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import ProductUpdateCard from "./ProductUpdateCard";
import ProductDeleteCard from "./ProductDeleteCard";
import { getUserRole } from "../../Services/TokenService";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import image from "../../Resources/image.jpeg"

const ProductCard = ({ item, Saved, Deleted }) => {
    const [modal, setModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    const toggleModal = () => setModal(!modal);


    const [isImageRendering, setIsImageRendering] = useState(true);

    const onSaveSucessfull = () => {

        Saved();
        toggleModal();
    }

    const onDeleteSucessfull = () => {
        Deleted();
        toggleModal();
    }

    useEffect(() => {
        fetchImage();
    }, [item])

    const [imageData, setImageData] = useState(image);

    const fetchImage = () => {
        setIsImageRendering(true);

        SacfullnetAPI.get("equipamento/download/" + item.id, { responseType: 'arraybuffer' })
            .then((response) => {
                const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageData(imageUrl);
                setIsImageRendering(false);
            })
            .catch((error) => {
                console.log(error);
                setIsImageRendering(false);
            });
    };

    return (
        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

            <Card onClick={toggleModal} className="bg-primary" style={{ cursor: "pointer", width: "100%" }}>
                {isImageRendering ? 
                   
                        <Spinner style={{justifyContent: "center", alignSelf: "center" , padding: 50}} size="lg" color="light"/>

                     :
                    <img
                        id="equip1"
                        style={{ width: "100%", height: "35vh", cursor: "pointer", padding: 10 }}
                        src={imageData}
                        alt="logo"
                    />

                }

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
                        <Label tag="h5">IP: </Label>

                        <Label>{item.ip_address}</Label>


                    </Row>
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
                    {getUserRole() == "ADMIN" ?
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle caret >
                                Opções
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setUpdateModal(!updateModal)}>Atualizar</DropdownItem>
                                <DropdownItem onClick={() => setDeleteModal(!deleteModal)}>Excluir</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> : null}

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

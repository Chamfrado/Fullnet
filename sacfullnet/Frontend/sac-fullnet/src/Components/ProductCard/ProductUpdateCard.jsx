/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const ProductUpdateCard = ({ item, open }) => {
    const [modal, setModal] = useState(false);

    const [productForm, setProductForm] = useState({
        nome: item.nome,
        ip: item.ipAddress,
        config: item.configuracao,
        desc: item.descricao,
        imagem: item.imagem,
        id: item.id,
        tipo: item.id_tipo_equipamento
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(imageFile);
    };

    const toggle = () => setModal(!modal);


    useEffect(() => {
        setModal(open);
    }, [open])

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
        <Modal fullscreen isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Atualizar Equipamento</ModalHeader>
            <ModalBody>
                <Row >
                    <Col style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Card>
                            <CardBody>
                                {image && (
                                    <img
                                        id="equip1"
                                        style={{ width: "50vh", cursor: "pointer", padding: 10 }}
                                        src={image}
                                        alt="logo"
                                    />
                                )}
                            </CardBody>

                        </Card>
                        <div>
                    <Input type="file" onChange={handleImageUpload} />
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            width="200"
                            height="200"
                        />
                    )}
                </div>

                    </Col>

                    <Col xs="6" >
                        <FormGroup>
                            <Label for="nome">
                                Nome do Equipamento
                            </Label>
                            <Input
                                id="nome"
                                name="nome"
                                placeholder="Insira o nome do equipamento"
                                value={productForm.nome}
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="ip">
                                Faixa de IP
                            </Label>
                            <Input
                                id="ip"
                                name="ip"
                                placeholder="Digite o IP"
                                type="text"
                                value={productForm.ip}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="config">
                                Configuração
                            </Label>
                            <Input
                                id="config"
                                name="config"
                                value={productForm.config}
                                placeholder="Digite a Configuração"
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="desc">
                                Descrição
                            </Label>
                            <Input
                                id="desc"
                                name="desc"
                                placeholder="Digite a Digite a Descrição"
                                value={productForm.desc}
                                type="textarea"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="imagem">
                                imagem
                            </Label>
                            <Input
                                id="imagem"
                                name="imagem"

                                placeholder="Digite a Digite a Descrição"
                                type="image"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                    </Col>


                </Row>
                

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => alert(item.id)}>
                    Salvar
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>

    );
};

export default ProductUpdateCard;

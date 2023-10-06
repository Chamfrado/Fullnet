/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import image from "../../Resources/image.jpeg"

const ProductAddCard = ({ open, onAddSucess }) => {
    const [modal, setModal] = useState(false);

    
    const [productForm, setProductForm] = useState({
        nome: "",
        ip: "",
        config: "",
        desc: "",
        imagem: ""
    });


    const handleChange = (event) => {
        const { name, value } = event.target;


        setProductForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


    };






    const add = () => {
        try {
            SacfullnetAPI.post("equipamento", {
                
                id_tipo_equipamento: 1,
                nome: productForm.nome,
                ip_address: productForm.ip,
                configuracao: productForm.config,
                descricao: productForm.desc,
                imagem: "image"
            });
            onAddSucess();
            toggle();

        } catch (error) {
            alert(error);
        }

    }



    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(imageFile);
    };

    const toggle = () => setModal(!modal);


    useEffect(() => {
        setModal(open);
    }, [open])





    return (
        <Modal fullscreen isOpen={modal} toggle={toggle} >
            <ModalHeader className="bg-primary" toggle={toggle}>Adicionar Equipamento</ModalHeader>
            <ModalBody>
                <Row >
                    <Col style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Card>
                            <CardBody>
                               
                                    <img
                                        id="equip1"
                                        style={{ width: "50vh", cursor: "pointer", padding: 10 }}
                                        src={image}
                                        alt="logo"
                                    />

                            </CardBody>

                        </Card>
                        <div style={{ padding: 10 }}>
                            <Input type="file" onChange={handleImageUpload} />
                            {selectedImage && (
                                <><img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    width="200"
                                    height="200" /><Label>IMAGEM DE UPLOAD - TESTE</Label></>
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />
                        </FormGroup>

                    </Col>
                    <Col>
                    </Col>


                </Row>


            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={add}>
                    Salvar
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>

    );
};

export default ProductAddCard;

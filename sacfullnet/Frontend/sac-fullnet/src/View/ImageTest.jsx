/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, Container, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from "reactstrap";
import SacfullnetAPI from "../Services/SacfullnetApi";
import image from "../Resources/image.jpeg"

const ImageTest = ({ open, onAddSucess, onCancel }) => {
    const [modal, setModal] = useState(false);


    const [productForm, setProductForm] = useState({
        nome: "",
        ip: "",
        config: "",
        desc: "",
        imagem: ""
    });


    //Configuração do Form de Erro
    const [errorForm, setErrorForm] = useState({
        nome: "",
        ip: "",
        config: "",
        desc: "",
    });


    const handleChange = (event) => {
        const { name, value } = event.target;


        setProductForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


    };

    const fetchImagem = () => {
        const formData = new FormData();
        formData.append('imagem', selectedImage);

        SacfullnetAPI.post("equipamento/imagem", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                alert("Adicionado com sucesso");
            })
            .catch(error => alert(error));
    };

    const [saveLoading, setSaveLoading] = useState(false);

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
            setSaveLoading(false)
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



    function isValidIP(ip) {
        // Expressão regular para validar um IP no formato xxx.xxx.xxx.xxx
        const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

        if (ipPattern.test(ip)) {
            // O formato está correto, agora vamos verificar os valores
            const parts = ip.split('.'); // Dividir o IP em partes

            // Verificar se cada parte está dentro do intervalo correto (0-255)
            for (let i = 0; i < 4; i++) {
                const part = parseInt(parts[i], 10);
                if (part < 0 || part > 255) {
                    return false; // Parte fora do intervalo
                }
            }

            // Se todas as partes estiverem corretas, é um IP válido
            return true;
        }

        // Se não corresponde ao formato xxx.xxx.xxx.xxx, é inválido
        return false;
    }

    const [imageData, setImageData] = useState(null);

    const fetchTeste = () => {
        SacfullnetAPI.get("auth/to/take", {imageName: "teste"}).then((image) => {
            alert(image);
        }).catch(error => alert(error))
        
    }



    return (
        <Container fullscreen isOpen={modal} onClosed={onCancel} toggle={toggle} >
            <ModalHeader className="bg-primary" toggle={toggle}>Adicionar Equipamento</ModalHeader>
            <ModalBody>
                <Row >
                    <Col style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Card>
                            <CardBody>
                                {selectedImage ?
                                    <img
                                        id="equip1"
                                        style={{ width: "50vh", cursor: "pointer", padding: 10 }}
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="logo"
                                    />
                                    :
                                    <img
                                        id="equip1"
                                        style={{ width: "50vh", cursor: "pointer", padding: 10 }}
                                        src={image}
                                        alt="logo"
                                    />}



                                {imageData && (
                                    <img src={imageData} alt="Your Image"  />
                                )}






                            </CardBody>

                        </Card>
                        <div style={{ padding: 10 }}>
                            <Input type="file" onChange={handleImageUpload} />
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
                                className={errorForm.nome ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.nome && (
                                <FormFeedback>{errorForm.nome}</FormFeedback>
                            )}
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
                                className={errorForm.ip ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.ip && (
                                <FormFeedback>{errorForm.ip}</FormFeedback>
                            )}
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
                                className={errorForm.config ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.config && (
                                <FormFeedback>{errorForm.config}</FormFeedback>
                            )}
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
                                className={errorForm.desc ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.desc && (
                                <FormFeedback>{errorForm.desc}</FormFeedback>
                            )}
                        </FormGroup>

                    </Col>
                    <Col>
                    </Col>


                </Row>


            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={fetchTeste}>
                    {saveLoading ? <Spinner color="light" /> : "Salvar"}
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Container>

    );
};

export default ImageTest;

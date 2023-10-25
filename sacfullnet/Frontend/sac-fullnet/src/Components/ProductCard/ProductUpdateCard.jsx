/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import image from "../../Resources/image.jpeg"

const ProductUpdateCard = ({ item, open, onSaveSucess }) => {
    const [modal, setModal] = useState(false);

    const [productForm, setProductForm] = useState({
        nome: item.nome,
        ip: item.ip_address,
        config: item.configuracao,
        desc: item.descricao,
        imagem: item.imagem
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "cnpj" || name === "telefone") {
            setProductForm((prevFormData) => ({
                ...prevFormData,
                [name]: value.replace(/\D/g, "")
            }));
        } else {
            setProductForm((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }

    };


    //Configuração do Form de Erro
    const [errorForm, setErrorForm] = useState({
        nome: "",
        ip: "",
        config: "",
        desc: "",
    });

    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        let isNomeValid = false;
        let isIpValid = false;
        let isConfigValid = false;
        let isDescValid = false;

        if (productForm.nome === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                nome: "Preencher o nome é obrigatório!"
            }));
            isNomeValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                nome: ""
            }));
            isNomeValid = true;
        }

        if (productForm.ip === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                ip: "Preencher o IP é obrigatório!"
            }));
            isIpValid = false;
        } else if (!isValidIP(productForm.ip)) {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                ip: "Coloque um IP válido!"
            }));
            isIpValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                ip: ""
            }));
            isIpValid = true;
        }

        if (productForm.config === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                config: "Preencher a configuração é obrigatório!"
            }));
            isConfigValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                config: ""
            }));
            isConfigValid = true;
        }

        if (productForm.desc === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                desc: "Preencher a descrição é obrigatório!"
            }));
            isConfigValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                desc: ""
            }));
            isDescValid = true;
        }
        setIsFormValid(isConfigValid && isDescValid && isIpValid && isNomeValid);
    }, [productForm])


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

    const [saveLoading, setSaveLoading] = useState(false);
    const handleSubmit = async (event) => {
        setSaveLoading(true);
        event.preventDefault();
        if (!isFormValid) {
            setSaveLoading(false)
            return;
        }

        save()

    };

    const save = () => {
        const formData = new FormData();
        formData.append('imagem', selectedImage);

        try {
            SacfullnetAPI.put("equipamento", {
                id: item.id,
                id_tipo_equipamento: item.id_tipo_equipamento,
                nome: productForm.nome,
                ip_address: productForm.ip,
                configuracao: productForm.config,
                descricao: productForm.desc,
                imagem: productForm.imagem
            }).then(() => {
                SacfullnetAPI.post("equipamento/imagem/" + item.id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(() => {
                        setSaveLoading(false)
                        onSaveSucess();
                        toggle();
                    })
                    .catch(error => console.log("ErroNaImagem " + error));
            }).catch(error => console.log(error))


        } catch (error) {
            console.log(error);
        }

    }

    const [imageData, setImageData] = useState(image);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchImage();
    }, []) 

    
    const fetchImage = () => {

        SacfullnetAPI.get("equipamento/download/" + item.id, { responseType: 'arraybuffer' })
            .then((response) => {
                const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageData(imageUrl);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        setSelectedImage(imageFile);
    };

    const toggle = () => setModal(!modal);


    useEffect(() => {
        setModal(open);
    }, [open])
;


    return (
        <Modal fullscreen isOpen={modal} toggle={toggle} >
            <ModalHeader className="bg-primary" toggle={toggle}>Atualizar Equipamento</ModalHeader>
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
                                        src={imageData}
                                        alt="logo"
                                    />}
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
                <Button color="primary" className={isFormValid ? "" : "disabled"} onClick={handleSubmit}>
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

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import SelectProductForFaq from "../SelectProductForFaq/SelectProductForFaq";



const FaqAddCard = ({ open, onAddSucess, onCancel }) => {
    const [modal, setModal] = useState(false);
    const [listProduct, setListProduct] = useState([]);

    const [faqForm, setProductForm] = useState({
        titulo: "",
        solucao: ""
    });


    const handleChange = (event) => {
        const { name, value } = event.target;


        setProductForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


    };

    const updateProduct = async (list) => {
        if (list != null) {
            let listArray = [];
            await list.map(equipamento => {
                listArray.push({ id: equipamento.id, nome: equipamento.nome });
            })

            setListProduct(listArray);
        }


    }


    //Configuração do Form de Erro
    const [errorForm, setErrorForm] = useState({
        titulo: "",
        solucao: ""
    });

    const [isEmpty, setIsEmpty] = useState(true)

    //Validator do formulario
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        let isTituloValid = false;
        let isSolucaoValid = false;
        let isListValid = false;

        if (faqForm.titulo === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                titulo: "Preencher o titulo é obrigatório!"
            }));
            isTituloValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                titulo: ""
            }));
            isTituloValid = true;
        }

        if (faqForm.solucao === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                solucao: "Preencher a solução é obrigatório!"
            }));
            isSolucaoValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                solucao: ""
            }));
            isSolucaoValid = true;
        }

        if (!Array.isArray(listProduct) || listProduct.length === 0) {
            isListValid = false;
            setIsEmpty(true);
        } else {
            isListValid = true;
            setIsEmpty(false);
        }


        setIsFormValid(isListValid && isSolucaoValid && isTituloValid);
    }, [faqForm, listProduct])


    const add = () => {
        try {
            SacfullnetAPI.post("faq", {

                titulo: faqForm.titulo,
                solucao: faqForm.solucao,
                equipamentosRelacionados: listProduct
            });
            onAddSucess();
            toggle();

        } catch (error) {
            console.log(error);
        }

    }

    const toggle = () => setModal(!modal);


    useEffect(() => {
        setModal(open);
    }, [open])

    return (
        <Modal isOpen={modal} size="lg" onClosed={onCancel} toggle={toggle}>
            <ModalHeader className="bg-primary" toggle={toggle}>Adicionar Nova FAQ</ModalHeader>
            <ModalBody>
                <Row >

                    <Col>
                        <FormGroup>
                            <Label for="titulo">
                                Titulo
                            </Label>
                            <Input
                                id="titulo"
                                name="titulo"
                                placeholder="Insira o titulo da FAQ"
                                value={faqForm.titulo}
                                type="text"
                                onChange={handleChange}
                                className={errorForm.titulo ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.titulo && (
                                <FormFeedback>{errorForm.titulo}</FormFeedback>
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="solucao">
                                Solução
                            </Label>
                            <Input
                                id="solucao"
                                name="solucao"
                                placeholder="Digite a Solução"
                                type="textarea"
                                value={faqForm.solucao}
                                onChange={handleChange}
                                className={errorForm.solucao ? "is-invalid" : "is-valid"}
                                />
                                {errorForm.solucao && (
                                    <FormFeedback>{errorForm.solucao}</FormFeedback>
                                )}
                        </FormGroup>

                    </Col>


                </Row>
                <Row>
                    <SelectProductForFaq updateList={updateProduct} op={"add"} isEmpty={isEmpty} />
                </Row>


            </ModalBody>
            <ModalFooter>
                <Button color="primary" className={isFormValid ? "" : "disabled"} onClick={add}>
                    Salvar
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default FaqAddCard
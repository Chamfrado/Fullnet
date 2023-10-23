/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import SelectProductForFaq from "../SelectProductForFaq/SelectProductForFaq";



const FaqUpdateCard = ({ open, onUpdateSucess, faq }) => {
    const [modal, setModal] = useState(false);
    const [listProduct, setListProduct] = useState([]);

    const [faqForm, setProductForm] = useState({
        titulo: faq.titulo,
        solucao: faq.solucao
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


    const add = () => {
        try {
            SacfullnetAPI.put("faq", {

                id: faq.id,
                titulo: faqForm.titulo,
                solucao: faqForm.solucao,
                equipamentosRelacionados: listProduct
            });
            onUpdateSucess();
            toggle();

        } catch (error) {
            alert(error);
        }

    }

    const toggle = () => setModal(!modal);


    useEffect(() => {
        setModal(open);
    }, [open])

    return (
        <Modal isOpen={modal} size="lg" toggle={toggle}>
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
                            />
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
                            />
                        </FormGroup>

                    </Col>


                </Row>
                <Row>
                    <SelectProductForFaq updateList={updateProduct} initialSelectedProducts={faq.equipamentosRelacionados} op={"update"} />
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
}

export default FaqUpdateCard
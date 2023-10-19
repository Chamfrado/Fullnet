/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import SelectProductForFaq from "../SelectProductForFaq/SelectProductForFaq";



const FaqDeleteCard = ({ open, onDeleteSucess, faq }) => {
    const [modal, setModal] = useState(false);





    const deleteProduct = () => {
        try {
            const url = "faq/" + faq.id;
            SacfullnetAPI.delete(url)
            onDeleteSucess();
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
        <Modal isOpen={modal} size="l" toggle={toggle}>
            <ModalHeader className="bg-danger" toggle={toggle}>Deletar FAQ</ModalHeader>
            <ModalBody>
                <Row>
                    <Label>Deseja excluir a FAQ com o título de:</Label>
                </Row>
                <Row>
                    <Label>{faq.titulo}</Label>
                </Row>
                <Row>
                    <Label>Você Confirma esta Operação?</Label>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteProduct}>
                    Confirmar
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default FaqDeleteCard
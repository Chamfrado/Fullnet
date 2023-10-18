/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";



const UserAddCard = ({ open, onAddSucess }) => {
    const [modal, setModal] = useState(false);

    
    const [userForm, setProductForm] = useState({
        email: "",
        senha: "",
        tipo: ""
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
            SacfullnetAPI.post("user", {
                
                email: userForm.email,
                senha: userForm.senha,
                tipo: userForm.tipo == "Administrador" ? 1 : 2,
            });
            onAddSucess();
            toggle();

        } catch (error) {
            alert(error);
        }

    }

    const toggle = () => setModal(!modal);


    useEffect(() => {
        setModal(open);
    }, [open])

    return(
        <Modal  isOpen={modal} toggle={toggle}>
            <ModalHeader className="bg-primary" toggle={toggle}>Adicionar Usuário</ModalHeader>
            <ModalBody>
                <Row >

                    <Col>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Insira o email do usuario"
                                value={userForm.email}
                                type="email"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="senha">
                                Senha
                            </Label>
                            <Input
                                id="senha"
                                name="senha"
                                placeholder="Digite a senha do usuario"
                                type="password"
                                value={userForm.senha}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tipo">
                                tipo
                            </Label>
                            <Input
                                id="tipo"
                                name="tipo"
                                value={userForm.tipo}
                                placeholder="Selecione o Tipo"
                                type="select"
                                onChange={handleChange}
                            >
                                <option>
                                    Administrador
                                </option>
                                <option>
                                    Usuário
                                </option>
                            </Input>
                        </FormGroup>

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
}

export default UserAddCard
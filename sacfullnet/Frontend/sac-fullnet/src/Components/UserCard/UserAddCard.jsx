/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";



const UserAddCard = ({ open, onAddSucess }) => {
    const [modal, setModal] = useState(false);

    
    const [userForm, setProductForm] = useState({
        login: "",
        password: "",
        role: "ADMIN"
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
            SacfullnetAPI.post("auth/register", {
                
                login: userForm.login,
                password: userForm.password,
                role: userForm.role
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
                            <Label for="login">
                                Login
                            </Label>
                            <Input
                                id="login"
                                name="login"
                                placeholder="Insira o login do usuario"
                                value={userForm.login}
                                type="login"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Digite a password do usuario"
                                type="password"
                                value={userForm.password}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">
                                role
                            </Label>
                            <Input
                                id="role"
                                name="role"
                                value={userForm.role}
                                placeholder="Selecione o Tipo de Usuario"
                                type="select"
                                onChange={handleChange}
                            >
                                <option>
                                    ADMIN
                                </option>
                                <option>
                                    USER
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
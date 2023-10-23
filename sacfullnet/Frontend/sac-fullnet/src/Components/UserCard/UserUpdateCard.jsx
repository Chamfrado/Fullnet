/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";



const UserUpdateCard = ({ open, onSaveSucess, User }) => {
    const [modal, setModal] = useState(false);

    
    const [userForm, setProductForm] = useState({
        id: User.id,
        login: User.login,
        password: User.password,
        role: User.role
    });


    const handleChange = (event) => {
        const { name, value } = event.target;


        setProductForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


    };






    const save = () => {
        try {
            SacfullnetAPI.put("user", {
                id: userForm.id,
                login: userForm.login,
                password: userForm.password,
                role: userForm.role
            });
            onSaveSucess();
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
                                Senha
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
                                placeholder="Selecione o Tipo"
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
                <Button color="primary" onClick={save}>
                    Salvar
                </Button>{' '}
                <Button color="secondary" onClick={() => alert(JSON.stringify(userForm))}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UserUpdateCard
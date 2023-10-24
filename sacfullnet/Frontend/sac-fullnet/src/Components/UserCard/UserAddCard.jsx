/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";



const UserAddCard = ({ open, onAddSucess, onCancel }) => {
    const [modal, setModal] = useState(false);


    const [userForm, setProductForm] = useState({
        login: "",
        password: "",
        role: ""
    });


    const handleChange = (event) => {
        const { name, value } = event.target;


        setProductForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


    };


    //Configuração do Form de Erro
    const [errorForm, setErrorForm] = useState({
        login: "",
        role: "",
        password: ""
    });


    //Validator do formulario
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(() => {
        let isLoginValid = false;
        let isPasswordValid = false;
        let isTypeValid = false;

        if (userForm.login === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                login: "Preencher o login é obrigatório!"
            }));
            isLoginValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                login: ""
            }));
            isLoginValid = true;
        }

        if (userForm.password === "") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                password: "Preencher a senha é obrigatório!"
            }));
            isPasswordValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                password: ""
            }));
            isPasswordValid = true;
        }
        if (userForm.role !== "ADMIN" && userForm.role !== "USER") {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                role: "Preencher a descrição é obrigatório!"
            }));
            isTypeValid = false;
        } else {
            setErrorForm((prevErrorForm) => ({
                ...prevErrorForm,
                role: ""
            }));
            isTypeValid = true;
        }

        setIsFormValid(isTypeValid && isPasswordValid && isLoginValid);
    }, [userForm])





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
    const [saveLoading, setSaveLoading] = useState(false);
    const handleSubmit = () => {
        setSaveLoading(true);
        if (!isFormValid) {
            setSaveLoading(false)
            return;
        }

        add();
    };


    useEffect(() => {
        setModal(open);
    }, [open])

    return (
        <Modal onClosed={onCancel} isOpen={modal} toggle={toggle}>
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
                                className={errorForm.login ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.login && (
                                <FormFeedback>{errorForm.login}</FormFeedback>
                            )}
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
                                className={errorForm.password ? "is-invalid" : "is-valid"}
                            />
                            {errorForm.password && (
                                <FormFeedback>{errorForm.password}</FormFeedback>
                            )}
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
                                className={errorForm.role ? "is-invalid" : "is-valid"}
                            >
                                <option selected>
                                    Selecione o tipo de Usuario!
                                </option>
                                <option>
                                    ADMIN
                                </option>
                                <option>
                                    USER
                                </option>
                            </Input>
                            {errorForm.role && (
                                <FormFeedback>{errorForm.role}</FormFeedback>
                            )}
                        </FormGroup>

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
}

export default UserAddCard
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import SacfullnetAPI from "../../Services/SacfullnetApi";
import { getUser, getUserRole, logout } from "../../Services/TokenService";
import { useNavigate } from "react-router-dom";



const SelfUserCard = ({ open, onCancel }) => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);


    const [userForm, setUserForm] = useState({
        id: "",
        login: "",
        role: "",
        password: ""
    });

    const [user, setUser] = useState();

    

    const [confirmModal, setConfirmModal] = useState(false);
    const toggleConfirmModal = () => setConfirmModal(!confirmModal);

    const handleChange = (event) => {
        const { name, value } = event.target;


        setUserForm((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


    };

    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (confirmed) {
            handleSubmit();
        }
    })
    



    const handleConfirm = () => {
        setConfirmed(true);
    }


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



    const [saveLoading, setSaveLoading] = useState(false);
    const handleSubmit = () => {
        setSaveLoading(true);
        if (!isFormValid) {
            setSaveLoading(false)
            return;
        }

        save();
    };
    
    const save = () => {
        try {
            SacfullnetAPI.put("auth/update", {
                id: userForm.id,
                login: userForm.login,
                password: userForm.password,
                role: userForm.role
            }).then(() => {
                logout();
                navigate("/login");
            })


        } catch (error) {
            alert(error);
        }

    }

    const toggle = () => setModal(!modal);


    useEffect(() => {
        SacfullnetAPI.post("auth/user", { login: getUser() }).then(({ data }) => setUserForm(data)).catch(error => console.log(error));
        setModal(open);

    }, [open])

    return (
        <Modal onClosed={onCancel} isOpen={modal} toggle={toggle}>
            <ModalHeader className="bg-primary" toggle={toggle}>Gerenciar Usuário</ModalHeader>
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
                        {getUserRole() == "ADMIN" ? <FormGroup>
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
                                 <option>
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
                        </FormGroup> : null}
                        

                    </Col>


                </Row>


            </ModalBody>
            <ModalFooter>
                <Button color="primary" className={isFormValid? "": "disabled"} onClick={toggleConfirmModal}>
                    Salvar
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancelar
                </Button>
            </ModalFooter>
            <Modal isOpen={confirmModal} toggle={toggleConfirmModal}>
                <ModalHeader className="bg-danger">Atenção!</ModalHeader>
                <ModalBody>Depois da alteração dos dados , você precisará fazer login novamente!</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleConfirm}>
                        Confirmar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleConfirmModal}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </Modal>
    );
}

export default SelfUserCard
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Header from "../Components/Header/Header"
import { Alert, Card, CardBody, CardTitle, Label, Row } from "reactstrap"
import UserTable from "../Components/UserTable/UserTable"
const UserView = ({ handleLogin, user }) => {

    const [saveAlert, setSaveAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [addAlert, setAddAlert] = useState(false);


    const handleExit = () => {
        handleLogin();
    };

    const onSaveSucessfull = () => {
        setSaveAlert(true);
    }
    const onDismissSave = () => setSaveAlert(false);

    const onDeleteSucessfull = () => {
        setDeleteAlert(true);
    }
    const onDismissDelete = () => setDeleteAlert(false);

    const onAddSucessfull = () => {
        setAddAlert(true);
    }
    const onDismissAdd = () => setAddAlert(false);


    return (
        <div>
                <Header handleLogout={handleExit} user={user} />

                <Row>
                    <Card>
                        <CardBody>
                            <CardTitle>
                                {saveAlert && <Alert isOpen={saveAlert} toggle={onDismissSave}>Usuário Atualizado com Sucesso!</Alert>}
                                {deleteAlert && <Alert isOpen={deleteAlert} toggle={onDismissDelete}>Usuário Deletado com Sucesso!</Alert>}
                                {addAlert && <Alert isOpen={addAlert} toggle={onDismissAdd}>Usuário Adicionado com Sucesso!</Alert>}
                                <Label className='h1' style={{ display: 'flex', alignSelf: 'start', justifyContent: 'start' }}> Controle de Usuarios</Label>
                            </CardTitle>

                            <Row>
                                <UserTable onSaveSucess={onSaveSucessfull} onDeleteSucess={onDeleteSucessfull} onAddSucess={onAddSucessfull} />
                            </Row>

                        </CardBody>
                    </Card>
                </Row>



        </div>
    )
}

export default UserView
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Header from "../Components/Header/Header"
import { Alert, Card, CardBody, CardTitle, Label, Row, UncontrolledTooltip } from "reactstrap"
import UserTable from "../Components/UserTable/UserTable"
import { BsArrowRepeat } from "react-icons/bs"
const UserView = ({ handleLogin }) => {

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


    const [refresh, setRefresh] = useState(false);
    const toggleRefresh = () => setRefresh(!refresh)

    return (
        <div>
            <Header />

            <Row>
                <Card>
                    <CardBody>
                        <CardTitle>
                            {saveAlert && <Alert isOpen={saveAlert} toggle={onDismissSave}>Usuário Atualizado com Sucesso!</Alert>}
                            {deleteAlert && <Alert isOpen={deleteAlert} toggle={onDismissDelete}>Usuário Deletado com Sucesso!</Alert>}
                            {addAlert && <Alert isOpen={addAlert} toggle={onDismissAdd}>Usuário Adicionado com Sucesso!</Alert>}
                            <Label className='h1' > Controle de Usuarios <BsArrowRepeat size=".50em" id='refresh' onClick={toggleRefresh} style={{ color: "#0d6efd", cursor: "pointer" }} /></Label>
                        </CardTitle>

                        <Row>
                            <UserTable onRefresh={refresh} onSaveSucess={onSaveSucessfull} onDeleteSucess={onDeleteSucessfull} onAddSucess={onAddSucessfull} />
                        </Row>
                        <UncontrolledTooltip target="refresh" placement='bottom'  >Atualizar Dados</UncontrolledTooltip>
                    </CardBody>
                </Card>
            </Row>



        </div>
    )
}

export default UserView
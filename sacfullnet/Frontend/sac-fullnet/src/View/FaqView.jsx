/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Header from "../Components/Header/Header";
import { Alert, Card, CardBody, CardTitle, Label, Row, UncontrolledTooltip } from "reactstrap";
import FaqTable from "../Components/FAQTable/FaqTable";
import { BsArrowRepeat } from "react-icons/bs";


const FaqView = () => {

  

    const [saveAlert, setSaveAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [addAlert, setAddAlert] = useState(false);


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
                            {saveAlert && <Alert isOpen={saveAlert} toggle={onDismissSave}>FAQ Atualizada com Sucesso!</Alert>}
                            {deleteAlert && <Alert isOpen={deleteAlert} toggle={onDismissDelete}>FAQ Deletada com Sucesso!</Alert>}
                            {addAlert && <Alert isOpen={addAlert} toggle={onDismissAdd}>FAQ Adicionada com Sucesso!</Alert>}
                            <Label className='h1'> Central de Perguntas e Respostas <BsArrowRepeat size=".50em" id='refresh' onClick={toggleRefresh} style={{color: "#0d6efd", cursor: "pointer"}}/></Label>
                        </CardTitle>

                        <Row>
                            <FaqTable onRefresh={refresh} onSaveSucess={onSaveSucessfull} onDeleteSucess={onDeleteSucessfull} onAddSucess={onAddSucessfull} />
                        </Row>
                        <UncontrolledTooltip target="refresh" placement='bottom'  >Atualizar Dados</UncontrolledTooltip>
                    </CardBody>
                </Card>
            </Row>
        </div>
    )
}

export default FaqView;
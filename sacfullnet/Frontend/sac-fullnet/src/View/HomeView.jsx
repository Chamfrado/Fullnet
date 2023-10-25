/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import { Alert,Card, CardBody, CardTitle,  Label, Row, UncontrolledTooltip } from 'reactstrap';
import ProductList from '../Components/ProductList/ProductList';
import { BsArrowRepeat } from 'react-icons/bs';


const HomeView = () => {


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
            <Card>
                <CardBody>
                    <CardTitle style={{paddingLeft: 30}}>
                    {saveAlert && <Alert  isOpen={saveAlert} toggle={onDismissSave}>Produto Atualizado com Sucesso!</Alert>}
                    {deleteAlert && <Alert  isOpen={deleteAlert} toggle={onDismissDelete}>Produto Deletado com Sucesso!</Alert>}
                    {addAlert && <Alert  isOpen={addAlert} toggle={onDismissAdd}>Produto Adicionado com Sucesso!</Alert>}
                    <Label className='h1' > Equipamentos <BsArrowRepeat size=".50em" id='refresh' onClick={toggleRefresh} style={{color: "#0d6efd", cursor: "pointer"}} /></Label>
                    </CardTitle>
                    <Row >
                      <ProductList onRefresh={refresh}  onAddSucess={onAddSucessfull} onDeleteSucess={onDeleteSucessfull} onSaveSucess={onSaveSucessfull}/>
                    </Row>
                    
                </CardBody>
                <UncontrolledTooltip target="refresh" placement='bottom'  >Atualizar Dados</UncontrolledTooltip>
            </Card>
        </div>
    )
}

export default HomeView;
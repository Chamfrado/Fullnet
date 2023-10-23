/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import { Alert,  Card, CardBody, CardTitle,  Label, Row } from 'reactstrap';
import ProductList from '../Components/ProductList/ProductList';


const HomeView = ({ props }) => {

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
        setDeleteAlert(true);
    }
    const onDismissAdd = () => setAddAlert(false);

    return (
        <div>
            <Header />
            
            
            <Card>
                <CardBody>
                    <CardTitle>
                    {saveAlert && <Alert  isOpen={saveAlert} toggle={onDismissSave}>Produto Atualizado com Sucesso!</Alert>}
                    {deleteAlert && <Alert  isOpen={deleteAlert} toggle={onDismissDelete}>Produto Deletado com Sucesso!</Alert>}
                    {addAlert && <Alert  isOpen={addAlert} toggle={onDismissAdd}>Produto Adicionado com Sucesso!</Alert>}
                    <Label className='h1' style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}> Equipamentos</Label>
                    </CardTitle>
                    <Row >
                      <ProductList props={props} onAddSucess={onAddSucessfull} onDeleteSucess={onDeleteSucessfull} onSaveSucess={onSaveSucessfull}/>
                    </Row>
                    
                </CardBody>
            </Card>
        </div>
    )
}

export default HomeView;
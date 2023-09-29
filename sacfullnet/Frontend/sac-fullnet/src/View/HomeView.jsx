/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../Components/Header/Header';
import { Card, CardBody, CardTitle,  Label, Row } from 'reactstrap';
import ProductList from '../Components/ProductList/ProductList';


const HomeView = ({ handleLogin }) => {

    const handleExit = () => {
        handleLogin();
    };

    return (
        <div>
            <Header handleLogout={handleExit} />
            <Card>
                <CardBody>
                    <CardTitle>
                    <Label className='h1' style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}> Equipamentos</Label>
                    </CardTitle>
                    <Row >
                        
                      <ProductList>

                      </ProductList>
                        
                       
                    </Row>
                    
                </CardBody>
            </Card>
        </div>
    )
}

export default HomeView;
/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../Components/Header/Header';
import { Card, CardBody, CardTitle, Col, Label, Row } from 'reactstrap';
import ProductCard from '../Components/ProductCard/ProductCard';


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
                        
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        
                       
                    </Row>
                    <Row >
                        
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        
                       
                    </Row>
                    <Row >
                        
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        <Col style={{marginTop: 20}}>
                        <ProductCard></ProductCard>
                        </Col>
                        
                       
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default HomeView;
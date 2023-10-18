import React from "react";
import Header from "../Components/Header/Header";
import { Card, CardBody, CardTitle, Label, Row } from "reactstrap";
import FaqTable from "../Components/FAQTable/FaqTable";


const FaqView = (handleLogin) => {

    const handleExit = () => {
        handleLogin();
    };



    return (
        <div>
            <Header handleLogout={handleExit} />

            <Row>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Label className='h1' style={{ display: 'flex', alignSelf: 'start', justifyContent: 'start' }}> Central de Perguntas e Respostas</Label>
                        </CardTitle>

                        <Row>
                            <FaqTable />
                        </Row>

                    </CardBody>
                </Card>
            </Row>
        </div>
    )
}

export default FaqView;
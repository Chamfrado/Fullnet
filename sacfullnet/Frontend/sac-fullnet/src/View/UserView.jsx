/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Header from "../Components/Header/Header"
import { Card, CardBody, CardTitle, Label, Row } from "reactstrap"
import UserTable from "../Components/UserTable/UserTable"
const UserView = ({handleExit}) =>{

  
    
    return(
        <div>
            <div>
            <Header  />

            <Row>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <Label className='h1' style={{ display: 'flex', alignSelf: 'start', justifyContent: 'start' }}> Controle de Usuarios</Label>
                        </CardTitle>

                        <Row>
                            <UserTable/>
                        </Row>

                    </CardBody>
                </Card>
            </Row>
        </div>


            
        </div>
    )
}

export default UserView
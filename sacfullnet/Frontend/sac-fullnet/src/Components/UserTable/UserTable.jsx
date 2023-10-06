/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { BsFillTrashFill, BsPencilSquare, BsPersonPlus, BsSearch } from "react-icons/bs"
import { Button, Col, Container, Input, InputGroup, Row, Table } from "reactstrap"
import SacfullnetAPI from "../../Services/SacfullnetApi";



const UserTable = () => {

    const [tableData, setTableData] = useState([]);
    const fetchTableData = () => {
        SacfullnetAPI.get("user")
            .then(({ data }) => {
                setTableData(data);
            }).catch((error) => {
                alert(error)
            })
    }

    function dict_type(typeId) {
        if (typeId === 1) {
            return "Administrador"
        } else if (typeId === 2) {
            return "Usuario"
        }
    }

    useEffect(() => {
        fetchTableData();
    }, []);


    return (
        <Container>
            <Row style={{ paddingTop: 30 }}>
                <Col xs="5">
                    <InputGroup>
                        <Input
                            id="search"
                            name="search"
                            placeholder="Pesquise Aqui"
                            type="search"
                        />
                        <Button color="primary">
                            <BsSearch />
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                    <Button color="primary" onClick={() => alert("Add Event")}><BsPersonPlus/> Adicionar Usuario</Button>
                </Col>
            </Row>
            <Row style={{ paddingTop: 10 }}>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(user => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{dict_type(user.tipo)}</td>
                                <td>
                                    <Row>
                                        <Col xs="1">
                                        <Button onClick={() => alert("Update Event!")} color="primary"> <BsPencilSquare /></Button>
                                        </Col>
                                        <Col xs="1">
                                        <Button onClick={() => alert("Delete Event!")} color="primary" > <BsFillTrashFill /></Button>
                                        </Col>
                                        
                                        
                                    </Row>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </Container>

    )
}
export default UserTable
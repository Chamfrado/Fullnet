/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { BsFillTrashFill, BsPencilSquare, BsPersonPlus, BsSearch } from "react-icons/bs"
import { Button, Col, Container, Input, InputGroup, Row, Table } from "reactstrap"
import SacfullnetAPI from "../../Services/SacfullnetApi";
import UserAddCard from "../UserCard/UserAddCard";
import UserUpdateCard from "../UserCard/UserUpdateCard";
import UserDeleteCard from "../UserCard/UserDeleteCard";
import { getUser } from "../../Services/TokenService";



const UserTable = ({ onSaveSucess, onDeleteSucess, onAddSucess, onRefresh }) => {

    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState();

    //Cuidando da pesquisa 
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
    };


    const toggleAddModal = () => setAddModal(!addModal);
    const toggleUpdateModal = (user) => {
        setUpdateModal(!updateModal);
        setSelectedUser(user)
    }

    const toggleDeleteModal = (user) => {
        setDeleteModal(!deleteModal);
        setSelectedUser(user)
    }

    const addSucess = () => {
        onAddSucess();
        fetchTableData();
        setAddModal(false);
    }

    const saveSucess = () => {
        onSaveSucess();
        fetchTableData();
        setUpdateModal(false);
    }

    const deleteSucess = () => {

        onDeleteSucess();
        fetchTableData();
        setDeleteModal(false);
    }


    const [tableData, setTableData] = useState([]);

    const fetchTableData = async () => {
        SacfullnetAPI.get("user?search=" + searchQuery)
            .then(({ data }) => {
                let newData = [...data];
                const productIndex = newData.findIndex((p) => p.login === getUser());
                if (productIndex !== -1) {
                    // Remove the product from newData
                    newData.splice(productIndex, 1);
                }
                setTableData(newData);

            }).catch((error) => {
                alert(error)

            })
    }

    useEffect(() => {
        fetchTableData();
    }, [searchQuery, onRefresh, addModal, deleteModal, updateModal]);

    const onCancel = () => {
        setAddModal(false);
        setDeleteModal(false);
        setUpdateModal(false);
    }

    return (
        <Container>
            <Row style={{ paddingTop: 30 }}>
                <Col xs="5">
                    <InputGroup>
                        <Input
                            id="search"
                            name="searchQuery"
                            placeholder="Digite o email desejado!"
                            onChange={handleSearchChange}
                            type="search"
                        />
                        <Button color="primary">
                            <BsSearch />
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                    <Button onClick={toggleAddModal} color="primary"><BsPersonPlus /> Adicionar Usuario</Button>
                </Col>
            </Row>
            <Row style={{ paddingTop: 10 }}>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Login</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(user => (
                            <tr key={user.id}>
                                <td>{user.login}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button onClick={() => toggleUpdateModal(user)} color="primary"> <BsPencilSquare /></Button>
                                    {'   '}
                                    <Button onClick={() => toggleDeleteModal(user)} color="primary" > <BsFillTrashFill /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {addModal && <UserAddCard onAddSucess={addSucess} open={addModal} onCancel={onCancel} />}
                {updateModal && <UserUpdateCard onSaveSucess={saveSucess} open={updateModal} onCancel={onCancel} User={selectedUser} />}
                {deleteModal && <UserDeleteCard onDeleteSucess={deleteSucess} onCancel={onCancel} open={deleteModal} user={selectedUser} />}
            </Row>
        </Container>

    )
}
export default UserTable
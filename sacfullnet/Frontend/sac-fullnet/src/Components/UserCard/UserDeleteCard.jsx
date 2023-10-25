/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import React, { useEffect, useState } from "react"
import SacfullnetAPI from "../../Services/SacfullnetApi";
const UserDeleteCard = ({user, open, onDeleteSucess, onCancel}) => {

    
        const [modal, setModal] = useState(false)
    
    
        const toggle = () => setModal(!modal);
    
    
        useEffect(() => {
            setModal(open);
        }, [open])

        const deleteUser = () => {
            const url = "user/" + user.id;

            SacfullnetAPI.delete(url)
            .then(() => {
                onDeleteSucess();
                toggle();
            }).catch((error) => {
                console.log(error)
            })
        }
   
        
    
    
        return (
            <Modal onClosed={onCancel} isOpen={modal} toggle={toggle} >
                <ModalHeader className="bg-danger" toggle={toggle}>Deletar Usuário</ModalHeader>
                <ModalBody>
                    
                <Label>Você está prestes a deletar o usuário: {user.login}</Label>
                <Label> Confirma essa Operação?</Label>
            
    
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteUser} >
                        Confirmar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
    
        );
}

export default UserDeleteCard
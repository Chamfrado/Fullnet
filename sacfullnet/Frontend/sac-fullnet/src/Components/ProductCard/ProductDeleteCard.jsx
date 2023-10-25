/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import React, { useEffect, useState } from "react"
import SacfullnetAPI from "../../Services/SacfullnetApi";
const ProductDeleteCard = ({item, open, onDeleteSucess}) => {

    
        const [modal, setModal] = useState(false)
    
    
        const toggle = () => setModal(!modal);
    
    
        useEffect(() => {
            setModal(open);
        }, [open])

        const deleteProduct = () => {
            const url = "equipamento/" + item.id;

            SacfullnetAPI.delete(url)
            .then(() => {
                onDeleteSucess();
                toggle();
            }).catch((error) => {
                console.log(error)
            })
        }
   
        
    
    
        return (
            <Modal  isOpen={modal} toggle={toggle} >
                <ModalHeader className="bg-danger" toggle={toggle}>Deletar Equipamento</ModalHeader>
                <ModalBody>
                    
                <Label>Você está prestes a deletar o equipamento {item.nome}</Label>
                <Label> Confirma essa Operação?</Label>
            
    
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteProduct} >
                        Confirmar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
    
        );
}

export default ProductDeleteCard
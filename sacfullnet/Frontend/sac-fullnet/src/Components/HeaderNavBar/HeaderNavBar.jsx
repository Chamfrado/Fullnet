/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccordionBody, AccordionHeader, AccordionItem, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, UncontrolledAccordion } from "reactstrap";
import { getUserRole } from "../../Services/TokenService";
import ProductAddCard from "../ProductCard/ProductAddCard"
import FaqAddCard from "../FAQCard/FaqAddCard";
import SelfUserCard from "../UserCard/SelfUserCard";

const HeaderNavBar = ({ open, handleClose }) => {


    const [OffCanvas, setOffcanvas] = useState(false);

    useEffect(() => {
        setOffcanvas(open);
    }, [open]);

    const toggle = () => {
        setOffcanvas(!OffCanvas);
        handleClose(OffCanvas);
    };


    const [addProductModal, setAddProductModal] = useState(false);
    const toggleAddProductModal = () => setAddProductModal(true);


    const onAddSucess = () => {
        setAddProductModal(false);
        alert("Produto Adicionado com Sucesso!")
        
    }

    const [addFaqModal, setAddFaqModal] = useState(false);
    const toggleAddFaqModal = () => setAddFaqModal(true);


    const onAddFaqSucess = () => {
        setAddFaqModal(false);
        alert("FAQ Adicionada com Sucesso!")
        
    }

    const [configModal, setConfigModal] = useState(false);
    const toggleConfigModal = () => setConfigModal(true);


    const onCancel = () => {
        setAddProductModal(false);
        setAddFaqModal(false);
        setConfigModal(false);
    }


    return (
        <Offcanvas id="menuHeaderCanvas" isOpen={Offcanvas} color="primary" toggle={toggle} className="bg-primary" style={{ color: "white" }}>
            <OffcanvasHeader toggle={toggle}>Menu Principal</OffcanvasHeader>
            <OffcanvasBody>
                <Row style={{ marginBottom: 30 }}>
                    <UncontrolledAccordion stayOpen>
                        <AccordionItem>
                            <AccordionHeader targetId="1">Gestão de Equipamentos</AccordionHeader>
                            <AccordionBody accordionId="1">
                                <Nav fill pills vertical>
                                    <NavItem style={{ marginBottom: 30 }}>
                                        <Link
                                            className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/home">Lista de Equipamentos</Link>
                                    </NavItem>
                                    {getUserRole() == "ADMIN" ? <NavItem >
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} onClick={toggleAddProductModal} >
                                            Cadastrar Equipamento
                                        </Link>
                                    </NavItem> : null}

                                </Nav>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </Row>
                <Row style={{ marginBottom: 30 }}>
                    {getUserRole() == "ADMIN" ? <UncontrolledAccordion stayOpen>
                        <AccordionItem>
                            <AccordionHeader targetId="2">Gestão de Usuarios</AccordionHeader>
                            <AccordionBody accordionId="2">
                                <Nav fill pills vertical>
                                    <NavItem style={{ marginBottom: 30 }}>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/users">Lista de Usuários</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} onClick={toggleConfigModal}  >
                                            Gerenciar Usuário Atual
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion> : null}

                </Row>
                <Row style={{ marginBottom: 30 }}>
                    <UncontrolledAccordion stayOpen>
                        <AccordionItem>
                            <AccordionHeader targetId="3">FAQ</AccordionHeader>
                            <AccordionBody accordionId="3">
                                <Nav fill pills vertical>
                                    <NavItem style={{ marginBottom: 30 }}>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/faqs">Lista de FAQs</Link>
                                    </NavItem>
                                    {getUserRole() == "ADMIN" ? <NavItem>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} onClick={toggleAddFaqModal} >Cadastrar FAQs</Link>
                                    </NavItem> : null}
                                    
                                </Nav>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </Row>
            </OffcanvasBody>
            {addProductModal && <ProductAddCard onAddSucess={onAddSucess} open={addProductModal} onCancel={onCancel} />}
            {addFaqModal && <FaqAddCard onAddSucess={onAddFaqSucess} open={addFaqModal} onCancel={onCancel} /> }
            {configModal && <SelfUserCard open={configModal} onCancel={onCancel}/>}
        </Offcanvas>
    )
}

export default HeaderNavBar

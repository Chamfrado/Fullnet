/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccordionBody, AccordionHeader, AccordionItem, Nav, NavItem, Offcanvas, OffcanvasBody, OffcanvasHeader, Row, UncontrolledAccordion } from "reactstrap";


const HeaderNavBar = ({ open, handleClose }) => {


    const [OffCanvas, setOffcanvas] = useState(false);

    useEffect(() => {
        setOffcanvas(open);
    }, [open]);

    const toggle = () => {
        setOffcanvas(!OffCanvas);
        handleClose(OffCanvas);
    };


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
                                            className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/clientes">Lista de Equipamentos</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} >
                                            Cadastrar Equipamento
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </Row>
                <Row style={{ marginBottom: 30 }}>
                    <UncontrolledAccordion stayOpen>
                        <AccordionItem>
                            <AccordionHeader targetId="2">Gestão de Usuarios</AccordionHeader>
                            <AccordionBody accordionId="2">
                                <Nav fill pills vertical>
                                    <NavItem style={{ marginBottom: 30 }}>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/vendas">Lista de Usuários</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} >
                                            Gerenciar Usuário Atual
                                        </Link>
                                    </NavItem>
                                </Nav>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </Row>
                <Row style={{ marginBottom: 30 }}>
                    <UncontrolledAccordion stayOpen>
                        <AccordionItem>
                            <AccordionHeader targetId="3">FAQ</AccordionHeader>
                            <AccordionBody accordionId="3">
                                <Nav fill pills vertical>
                                    <NavItem style={{ marginBottom: 30 }}>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/relatorio">Lista de FAQs</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link nav-link-active bg-primary" style={{ color: "white" }} to="/relatorio">Cadastrar FAQs</Link>
                                    </NavItem>
                                </Nav>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </Row>
                </OffcanvasBody>
        </Offcanvas>
    )
}

export default HeaderNavBar

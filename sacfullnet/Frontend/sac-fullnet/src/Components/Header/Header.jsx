import React from "react";
import {
	Row, Col, 
	Container,
	Alert,
	Button,
} from "reactstrap";
import {  BiExit } from "react-icons/bi";
import logoImage from "../../Resources/image.png";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";

// eslint-disable-next-line react/prop-types
const Header = ({ handleLogout} ) => {
	const navigate = useNavigate();


	const handleExit = () => {
		// Call the handleLogin function to update authentication status
		handleLogout();

		// Redirect to the protected route (e.g., dashboard) after successful login
		navigate("/protected");
	};

	const [isOpen, setIsOpen] = useState(false);

	const toggleOffcanvas = () => {
		setIsOpen((prevState) => !prevState);
	};
	
	const[ sucessCliente, setSucessCliente] = useState(false);
	const onDismissSaveCliente = () => { setSucessCliente(!setSucessCliente); };

	const[ sucessVenda, setSucessVenda] = useState(false);
	const onDismissSaveVenda = () => { setSucessVenda(!setSucessVenda); };


	

	return (
		<Container style={{ height: "13vh" }} fluid id="header" className="bg-primary">
			<Row style={{ height: "100%" }}>
				<Col style={{ height: "100%" }}>
					<Button style={{height: "75%", marginTop: 10}} id="togCanvas"  onClick={toggleOffcanvas} color="primary"> 
						<img
							id="menu"
							style={{ height: "60%",cursor: "pointer" }}
							src={logoImage}
							alt="Logo"
						/>
					</Button>
					
				</Col>
				<Col className="d-flex justify-content-end align-content-end">
					<Button id="exit" color="primary" style={{height: "75%", marginTop: 10}} onClick={handleExit}>
						<BiExit color="white" size={40}   />
					</Button>
				</Col>
					
			</Row>
			{isOpen && <HeaderNavBar handleClose={toggleOffcanvas} open={isOpen}/>}
			{sucessCliente && <Alert id="sucessCliente" isOpen={sucessCliente} style={{margin: 10}} toggle={onDismissSaveCliente}>
                        Cliente cadastrado com sucesso!
			</Alert>}
			{sucessVenda && <Alert id="sucessVenda" isOpen={sucessVenda} style={{margin: 10}} toggle={onDismissSaveVenda}>
                        Venda cadastrada com sucesso!
			</Alert>}
		</Container>
	);
};


Header.propTypes ={
	height: PropTypes.string.isRequired
};

export default Header;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import {
	Row, Col,
	Container,
	Alert,
	Button,
	Label,
	Dropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
} from "reactstrap";
import { BiDownArrowAlt, BiUpArrowAlt, BiUser } from "react-icons/bi";
import logoImage from "../../Resources/logo.jpeg";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";
import {  getUser, getUserRole, logout } from "../../Services/TokenService";
import { BsBoxArrowRight, BsGear } from "react-icons/bs";
import SacfullnetAPI from "../../Services/SacfullnetApi";

// eslint-disable-next-line react/prop-types
const Header = () => {

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [user, setUser] = useState({
		login: "",
		role: ""
	});
	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const navigate = useNavigate();

	const handleExit = () => {
		// Call the handleLogin function to update authentication status
		logout();

		// Redirect to the protected route (e.g., dashboard) after successful login
		navigate("/login");
	};

	const fetchUser = () => {
		SacfullnetAPI.post("auth/user", {
			login: getUser()
		}).then((data) => {
			setUser(data.data);

		}).catch(error => alert(error))

	}


	useEffect(() => {
		fetchUser();
	}, [user])



	const [isOpen, setIsOpen] = useState(false);

	const toggleOffcanvas = () => {
		setIsOpen((prevState) => !prevState);
	};

	const [sucessCliente, setSucessCliente] = useState(false);
	const onDismissSaveCliente = () => { setSucessCliente(!setSucessCliente); };

	const [sucessVenda, setSucessVenda] = useState(false);
	const onDismissSaveVenda = () => { setSucessVenda(!setSucessVenda); };




	return (
		<Container style={{ height: "13vh" }} fluid id="header" className="bg-primary">
			<Row style={{ height: "100%" }}>
				<Col style={{ height: "100%" }}>
					<Button style={{ height: "75%", marginTop: 10 }} id="togCanvas" onClick={toggleOffcanvas} color="primary">
						<img
							id="menu"
							style={{ height: "60%", cursor: "pointer" }}
							src={logoImage}
							alt="Logo"
						/>
					</Button>
				</Col>
				<Col className="d-flex justify-content-end align-content-center">
					<Dropdown style={{ alignSelf: "center" }} isOpen={dropdownOpen} toggle={toggle} direction="down">
						<DropdownToggle color="primary">

							<Label tag="h5"><BiUser /> {user.login} {dropdownOpen ? <BiUpArrowAlt /> : <BiDownArrowAlt />}</Label>

						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem header>Conta {user.role} </DropdownItem>
							<DropdownItem divider />
							<DropdownItem header>Opções</DropdownItem>
							<DropdownItem ><BsGear /> Configurações De Usuario</DropdownItem>
							<DropdownItem divider />
							<DropdownItem style={{ color: "red" }} onClick={handleExit} ><BsBoxArrowRight /> Sair</DropdownItem>

						</DropdownMenu>



					</Dropdown>
				</Col>




			</Row>
			{isOpen && <HeaderNavBar handleClose={toggleOffcanvas} open={isOpen} />}
			{sucessCliente && <Alert id="sucessCliente" isOpen={sucessCliente} style={{ margin: 10 }} toggle={onDismissSaveCliente}>
				Cliente cadastrado com sucesso!
			</Alert>}
			{sucessVenda && <Alert id="sucessVenda" isOpen={sucessVenda} style={{ margin: 10 }} toggle={onDismissSaveVenda}>
				Venda cadastrada com sucesso!
			</Alert>}
		</Container>
	);
};


Header.propTypes = {
	height: PropTypes.string.isRequired
};

export default Header;
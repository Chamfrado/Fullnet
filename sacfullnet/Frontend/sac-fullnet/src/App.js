/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './View/LoginView';
import HomeView from './View/HomeView';
import FaqView from './View/FaqView';
import UserView from './View/UserView';
import { login, logout } from './Services/TokenService';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);


	const handleLogin = (user, token) => {		 
		login(token);
		console.log(token);
		setUser(user);
		setIsAuthenticated(!isAuthenticated);
	};


	const handleLogout = () => {
		logout();
		setIsAuthenticated(!isAuthenticated);
	}
	

	const ProtectedRoute = ({ element: Element }) => {
		if (!isAuthenticated) {
			// If not authenticated, redirect to login
			return <Navigate to="/login" />;
		}

		// Render the protected component
		return <Element handleLogin={handleLogin} handleLogout={handleLogout} user={user} />;
	};

	return (
		<div>
      <Router>
			<Routes>
				<Route path="/login" element={<Login handleLogin={handleLogin} handleLogout={handleLogout} />} />
				<Route
					path="/"
					element={
						isAuthenticated ? (
							<Navigate to="/home" />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route path="/home" element={<ProtectedRoute element={HomeView} />} />
				<Route path="/faqs" element={<ProtectedRoute element={FaqView}/>} />
				<Route path="/users" element={ <ProtectedRoute element={UserView}/>} />
			</Routes>
      </Router>
		</div>
	);
}


export default App;

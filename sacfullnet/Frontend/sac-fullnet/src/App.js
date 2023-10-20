/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './View/LoginView';
import HomeView from './View/HomeView';
import FaqView from './View/FaqView';
import UserView from './View/UserView';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const handleLogin = (user, token) => {
		setToken(token);
		setUser(user);
		setIsAuthenticated(!isAuthenticated);
	};

	

	const ProtectedRoute = ({ element: Element }) => {
		if (!isAuthenticated) {
			// If not authenticated, redirect to login
			return <Navigate to="/login" />;
		}

		// Render the protected component
		return <Element handleLogin={handleLogin} props={token} user={user} />;
	};

	return (
		<div>
      <Router>
			<Routes>
				<Route path="/login" element={<Login handleLogin={handleLogin} />} />
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

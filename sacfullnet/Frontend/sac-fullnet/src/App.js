/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './View/LoginView';
import HomeView from './View/HomeView';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const handleLogin = () => {
		// Perform authentication logic here (e.g., check credentials)
		// Set isAuthenticated state accordingly
		setIsAuthenticated(!isAuthenticated);
	};

	const ProtectedRoute = ({ element: Element }) => {
		if (!isAuthenticated) {
			// If not authenticated, redirect to login
			return <Navigate to="/login" />;
		}

		// Render the protected component
		return <Element handleLogin={handleLogin} />;
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
							<Navigate to="/protected" />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route path="/protected" element={<ProtectedRoute element={HomeView} />} />
			</Routes>
      </Router>
		</div>
	);
}


export default App;

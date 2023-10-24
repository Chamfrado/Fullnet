/* eslint-disable react/prop-types */
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './View/LoginView';
import HomeView from './View/HomeView';
import FaqView from './View/FaqView';
import UserView from './View/UserView';
import { isAuthenticated, login, setUser, setUserRole } from './Services/TokenService';
import ImageTest from './View/ImageTest';

function App() {




	const handleLogin =  (user, token, role) => {		 
		login(token);
		setUser(user.login);
		setUserRole(role);
		console.log(user);
		
	};

	

	const ProtectedRoute = ({ element: Element }) => {
		if (!isAuthenticated) {
			return <Navigate to="/login" />;
		}

		// Render the protected component
		return <Element handleLogin={handleLogin}  />;
	};

	return (
		<div>
      <Router>
			<Routes>
				<Route path="/login" element={<Login handleLogin={handleLogin}  />} />
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
				<Route path="/test" element={ <ProtectedRoute element={ImageTest}/>} />
			</Routes>
      </Router>
		</div>
	);
}


export default App;

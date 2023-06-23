import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import CastingsScreen from './screens/CastingsScreen';
import Footer from './components/Footer';
import Home from './screens/Home.jsx';
import { extendTheme } from '@chakra-ui/react';
import CastingScreen from './screens/CastingScreen';
import LoginScreen from './screens/LoginScreen';
import RegistationScreen from './screens/RegistationScreen';
import ProfileScreen from './screens/ProfileScreen';
import YourCastingsScreen from './screens/YourCastingsScreen';
import ContactScreen from './screens/ContactScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AdminConsole from './screens/AdminConsole';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import CookieConsent from './components/CookieConsent';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import TestDisclaimer from './components/TestDisclaimer';
const breakpoints = {
	sml: '580px',
};

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme({
	breakpoints,
	config,
});

function App() {
	const [cookies] = useCookies(['cookieConsent']);
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Navbar />
				<TestDisclaimer/>
				<main>
					<Routes>
						<Route path='/' element={<Home></Home>} />
						<Route path='/castings' element={<CastingsScreen />} />
						<Route path='/casting/:id' element={<CastingScreen />} />
						<Route path='/login' element={<LoginScreen />} />
						<Route path='/register' element={<RegistationScreen />} />
						<Route path='/profile' element={<ProfileScreen />} />
						<Route path='/your-castings' element={<YourCastingsScreen />} />
						<Route path='/contact' element={<ContactScreen />} />
						<Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
						<Route path='/resetpassword/:resetToken' element={<ResetPasswordScreen />} />
						<Route path='/admin-console' element={<AdminConsole />} />
						<Route path='/verify/:token' element={<ConfirmEmailScreen />} />
					</Routes>
				</main>
				<Footer />
				{!cookies.cookieConsent && <CookieConsent />}
			</Router>
		</ChakraProvider>
	);
}

export default App;

import { ChakraProvider, Switch } from '@chakra-ui/react';
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
import { useCookies } from 'react-cookie';
import TestDisclaimer from './components/TestDisclaimer';
import NotFound from './screens/NotFound';
import { Helmet } from 'react-helmet';
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
			<Helmet></Helmet>
			<Router>
				<Navbar />
				<TestDisclaimer />
				<main>
					<Routes>
						
							<Route path='/' element={<Home></Home>} />
							<Route path='/castingi' element={<CastingsScreen />} />
							<Route path='/casting/:id' element={<CastingScreen />} />
							<Route path='/login' element={<LoginScreen />} />
							<Route path='/rejestracja' element={<RegistationScreen />} />
							<Route path='/profile' element={<ProfileScreen />} />
							<Route path='/twoje-castingi' element={<YourCastingsScreen />} />
							<Route path='/kontakt' element={<ContactScreen />} />
							<Route path='/forgotpassword' element={<ForgotPasswordScreen />} />
							<Route path='/resetpassword/:resetToken' element={<ResetPasswordScreen />} />
							<Route path='/admin-console' element={<AdminConsole />} />
							<Route path='/verify/:token' element={<ConfirmEmailScreen />} />
							{/* <Route path="/not-found" element={<NotFound key="not-found" />} /> */}
							<Route path='/*' element={<NotFound />} /> 
						
					</Routes>
				</main>
				<Footer />
				{!cookies.cookieConsent && <CookieConsent />}
			</Router>
		</ChakraProvider>
	);
}

export default App;

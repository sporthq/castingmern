import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/NavMobile';
import CastingsScreen from './screens/CastingsScreen';
import NavMobile from './components/NavMobile';
import Footer from './components/Footer';
import Home from './screens/Home.jsx'

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

const breakpoints = {
	sml: '580px',
};
const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
  }
const theme = extendTheme({
	breakpoints,
	config
});

function App() {
	return (
		<ChakraProvider theme={theme}>
			<Router>
				<Navbar />

				<main>
					<Routes>
						<Route path='/' element={<Home></Home>}></Route>
						<Route path='/castings' element={<CastingsScreen />}></Route>
						<Route path='/casting/:id' element={<CastingScreen />}></Route>
						<Route path='/login' element={<LoginScreen />}></Route>
						<Route path='/register' element={<RegistationScreen />}></Route>
						<Route path='/profile' element={ <ProfileScreen />}></Route>
						<Route path='/your-castings' element={ <YourCastingsScreen />}></Route>
						<Route path='/contact' element={ <ContactScreen />}></Route>
						<Route path='/forgotpassword' element={ <ForgotPasswordScreen />}></Route>
						<Route path='/resetpassword/:resetToken' element={ <ResetPasswordScreen />}></Route>
						<Route path='/admin-console' element={ <AdminConsole />}></Route>
						<Route path='/verify/:token' element={ <ConfirmEmailScreen />}></Route>

					</Routes>
				</main>

				<Footer />
			</Router>
		</ChakraProvider>
	);
}

export default App;
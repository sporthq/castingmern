import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/NavMobile';
import CastingsScreen from './screens/CastingsScreen';
import NavMobile from './components/NavMobile';
import Footer from './components/Footer';
import Home from './components/Home';

import { extendTheme } from '@chakra-ui/react';

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
					</Routes>
				</main>

				<Footer />
			</Router>
		</ChakraProvider>
	);
}

export default App;

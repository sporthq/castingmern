import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/NavMobile';
function App() {
	return (
		<ChakraProvider>
			<Router>
				<Navbar />

				<main>{/* <Routes></Routes> */}</main>
			</Router>
		</ChakraProvider>
	);
}

export default App;

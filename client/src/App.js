import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/NavMobile';
import CastingsScreen from './screens/CastingsScreen';
import NavMobile from './components/NavMobile';
import Home from './components/Home';


function App() {
	return (
		<ChakraProvider >
			<Router>
				<Navbar />

				<main>
					<Routes>
						<Route path='/' element={<Home></Home>}></Route>
						<Route path='/castings' element={<CastingsScreen />}></Route>
					</Routes>
				</main>
			</Router>
		</ChakraProvider>
	);
}

export default App;

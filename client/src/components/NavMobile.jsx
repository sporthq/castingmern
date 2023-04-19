import { Button, useColorModeValue, useColorMode, Box } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { GiFilmSpool } from 'react-icons/gi';
import { TiContacts } from 'react-icons/ti';
import { MdOutlineLogin } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { BsFillArrowRightSquareFill } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const NavMobile = ({ links }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const bgGradient = useColorModeValue('linear(to-b, gray.100, gray.900)', 'linear(to-b, gray.900, gray.100)');

	return (
		<MotionBox
			key={'box'}
			initial={{ y: -800 }}
			animate={{ y: 0 }}
			exit={{ y: -800, transition: { duration: .2 } }}
			transition={{ duration: 0.3 }}
			bg={useColorModeValue('gray.100', 'gray.900')}
			h={'100vh'}
			overflowY={'hidden'}
			className={'flex items-start justify-center '}
			display={{ md: 'none' }}
			position={'fixed'}
			top={0}
			left={0}
			right={0}
		>
			<nav className=''>
				<ul className='mt-16'>
					{links.map(({ linkName, path }, index) => (
						<li className='text-center py-12 font-semibold  text-2xl hover:underline ' key={index}>
							<a href={path}>{linkName}</a>
						</li>
					))}
					<li className='text-center py-12 font-semibold    text-2xl hover:underline'>
						<a href='/login'>Zaloguj</a>
					</li>
					{/* <li className='text-center py-12 font-semibold   text-2xl hover:underline'>
						<a href='/register'>Dołącz do nas</a>
					</li> */}
					<Button className='mt-16 uppercase' colorScheme='orange' leftIcon={<FaUser />}>
							Dołącz do nas!
						</Button>
					{/* <Box className='mt-8 flex items-center justify-between'>
						<Button colorScheme='orange' leftIcon={<MdOutlineLogin />}>
							Zaloguj
						</Button>
						<Button className='ml-4' colorScheme='orange' leftIcon={<FaUser />}>
							Dołącz do nas!
						</Button>
					</Box> */}
				</ul>
			</nav>
		</MotionBox>
	);
};

export default NavMobile;

import { Button, useColorModeValue, useColorMode, Link, Box, useMediaQuery } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';

// icons:
// import { GiFilmSpool } from 'react-icons/gi';
// import { TiContacts } from 'react-icons/ti';
// import { MdOutlineLogin } from 'react-icons/md';
// import { BsFillArrowRightSquareFill } from 'react-icons/bs';

const MotionBox = motion(Box);

const NavMobile = ({ links, onClose }) => {
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	return (
		<MotionBox
			key={'box'}
			initial={{ y: -800 }}
			animate={{ y: 0 }}
			exit={{ y: -800, transition: { duration: 0.2 } }}
			transition={{ duration: 0.3 }}
			bg={useColorModeValue('gray.100', 'gray.900')}
			h='100vh'
			className={'flex items-start justify-center '}
			display={{ md: 'none' }}
			position='fixed'
			top={0}
			right={0}
			left={0}
			bottom={0}
			zIndex={5}
			overflowY='hidden'
		>
			<nav className=''>
				<ul className='mt-16 flex flex-col'>
					{links.map(({ linkName, path }, index) => (
						// <li className='text-center py-12 font-semibold  text-2xl hover:underline ' key={index}>
						// 	<a href={path}>{linkName}</a>
						// </li>
						<Link
							as={ReactLink}
							onClick={onClose}
							to={path}
							className='text-center py-9 font-semibold  text-2xl hover:underline '
							key={index}
						>
							{linkName}
						</Link>
					))}

					{/* <li className='text-center py-12 font-semibold    text-2xl hover:underline'>
						<a href='/login'>Zaloguj</a>
					</li>
				 */}
					{userInfo ? (
						<>
							<Link
								as={ReactLink}
								onClick={onClose}
								to='profile'
								className='text-center py-12 font-semibold    text-2xl hover:underline'
							>
								Profil
							</Link>
							<Button
								onClick={() => {
									dispatch(logout());
								}}
								className='mt-16 uppercase'
								colorScheme='orange'
								leftIcon={<FaUser />}
							>
								Wyloguj
							</Button>
						</>
					) : (
						<>
							<Link
								as={ReactLink}
								onClick={onClose}
								to='login'
								className='text-center py-12 font-semibold    text-2xl hover:underline'
							>
								Zaloguj
							</Link>

							<Button as={ReactLink} to='register' onClick={onClose} className='mt-16 uppercase' colorScheme='orange' leftIcon={<FaUser />}>
								Dołącz do nas!
							</Button>
						</>
					)}

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

import {
	Box,
	Flex,
	HStack,
	Link,
	IconButton,
	Icon,
	Text,
	useDisclosure,
	Button,
	Stack,
	useColorModeValue,
	useColorMode,
	Center,
	textDecoration,
	Image,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { FaCameraRetro } from 'react-icons/fa';
import NavMobile from './NavMobile';
import MovieSvg from '../assets/images/movie-clapperboard-svgrepo-com.svg';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
	{
		linkName: 'Home',
		path: '/',
	},
	{
		linkName: 'Castingi',
		path: '/castings',
	},
	{
		linkName: 'Kontakt',
		path: '/contact',
	},
];

const Navbar = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	const NavLink = ({ path, children }) => {
		return (
			<Link
				as={ReactLink}
				to={path}
				px={2}
				py={2}
				rounded='md'
				_hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}
			>
				{children}
			</Link>
		);
	};

	return (
		<>
			{/* <Flex direction={'column'} position={"relative"} > */}
			<Box
				overflow={'hidden'}
				zIndex={1}
				// position={'relative'}
				w='full'
				// maxH={'full'}
				bg={useColorModeValue('gray.100', 'gray.900')}
				px={4}
			>
				<Flex h={16} alignItems='center' justify='space-between'>
					<Box
						as='div'
						position='absolute'
						top='50%'
						left='50%'
						transform='translate(-50%, -50%)'
						bg={useColorModeValue('gray.100', 'gray.900')}
						w='200px'
						h={{ base: 0, md: '200px' }}
						rounded={{ base: 'none', md: 'full' }}
						zIndex={-1}
					></Box>
					<HStack>
						<Link as={ReactLink} to='/'>
							<Flex alignItems='center'>
								<Icon
									p={2}
									boxSize={8}
									color={useColorModeValue('black.600', 'orange.200')}
									as={colorMode === 'light' ? MoonIcon : SunIcon}
									alignSelf='center'
									onClick={() => toggleColorMode()}
									display={{ base: 'inline-flex', md: 'none' }}
								/>
								<Icon
									display={{ base: 'none', md: 'inline-flex' }}
									as={FaCameraRetro}
									h={6}
									w={6}
									color={useColorModeValue('teal.600', 'teal.200')}
								/>
								<Text display={{ base: 'none', md: 'inline-flex' }} className='ml-1' fontWeight='extrabold'>
									Casting
									<Text color={useColorModeValue('teal.600', 'teal.200')} as='span'>
										&
									</Text>
								</Text>
							</Flex>
						</Link>
						<HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
							{links.map(({ linkName, path }, index) => {
								console.log(index);
								return <NavLink key={index} children={linkName} path={path}></NavLink>;
							})}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<NavLink>
							<Icon
								display={{ base: 'inline-flex', md: 'none' }}
								as={FaCameraRetro}
								h={6}
								w={6}
								color={useColorModeValue('teal.600', 'teal.200')}
							/>
							<Text display={{ base: 'inline-flex', md: 'none' }} className='ml-1' fontWeight='extrabold'>
								Casting
								<Text color={useColorModeValue('teal.600', 'teal.200')} as='span'>
									&
								</Text>
							</Text>
							<Icon
								display={{ base: 'none', md: 'inline-flex' }}
								p={2}
								boxSize={8}
								color={useColorModeValue('black.600', 'orange.200')}
								as={colorMode === 'light' ? MoonIcon : SunIcon}
								alignSelf='center'
								onClick={() => toggleColorMode()}
							/>
						</NavLink>
						<Button
							color={colorMode === 'light' ? 'black.800' : 'white'}
							_hover={{ textDecoration: 'underline' }}
							as={ReactLink}
							to={'/login'}
							p={2}
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							fontWeight={500}
							variant={'link'}
						>
							Zaloguj
						</Button>
						<Button
							color='white'
							_hover={{ bg: 'orange.300' }}
							bg={'orange.400'}
							as={ReactLink}
							to={'/register'}
							m={2}
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							fontWeight={700}
						>
							Załóż Konto
						</Button>
					</Flex>

					<IconButton
						position={'relative'}
						zIndex={333}
						size='md'
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
				</Flex>
			</Box>
			<AnimatePresence>
				{isOpen ? <NavMobile  links={links} /> : null}
			</AnimatePresence>
		</>
	);
};

export default Navbar;

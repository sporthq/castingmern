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
	Toast,
	useToast,
	MenuButton,
	Menu,
	MenuList,
	MenuIcon,
	MenuItem,
	MenuDivider,
	Badge,
} from '@chakra-ui/react';
import { Navigate, Link as ReactLink, redirect, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ArrowDownIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { FaCameraRetro } from 'react-icons/fa';
import NavMobile from './NavMobile';
import MovieSvg from '../assets/images/movie-clapperboard-svgrepo-com.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebugValue, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUserCastings } from '../redux/actions/userActions';
import { CgProfile } from 'react-icons/cg';
import { MdLocalMovies, MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { castingSelector } from '../redux/slices/castings';
import { getCastings } from '../redux/actions/castingActions';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { IoNotificationsSharp } from 'react-icons/io5';
import { resetError } from '../redux/slices/user';
import { BsBoxArrowInRight } from 'react-icons/bs';

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
	const { isCastingEdited } = useSelector(castingSelector);

	const { enrolledCastings } = useSelector((state) => state.user);
	const { castings } = useSelector((state) => state.castings);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	const NavLink = ({ path, children }) => {
		return (
			<Link
				onClick={onClose}
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
	const navigate = useNavigate();
	const colorModeValue = useColorModeValue('teal.600', 'teal.200');
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const toast = useToast();
	const [filterCastings, setFilterCastings] = useState([]);

	const logoutHandler = async () => {
		await dispatch(logout());
		navigate('/');
		toast({ description: 'Wylogowano pomyślnie', status: 'success', isClosable: 'true' });
	};

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserCastings());
			dispatch(getCastings());
		}
	}, [userInfo]);

	const [isWarningVisible, setIsWarningVisible] = useState(true);

	const handleButtonClick = () => {
		// Tutaj możesz dodać dodatkową logikę obsługi kliknięcia, jeśli jest potrzebna

		// Zmiana stanu isWarningVisible na false
		setIsWarningVisible(false);
	};

	return (
		<>
			<Box
				overflowY='hidden'
				zIndex={10}
				w=''
				bg={useColorModeValue('gray.100', 'gray.900')}
				px={4}
				className='overflow-hidden'
				
			>
				<Flex h={16} className='' alignItems='center' justify='space-between'>
					<HStack>
						<Link as={ReactLink} to='/'>
							<Flex alignItems='center'>
								<Icon
									p={2}
									zIndex={333}
									boxSize={8}
									color={useColorModeValue('black.600', 'orange.200')}
									as={colorMode === 'light' ? MoonIcon : SunIcon}
									alignSelf='center'
									onClick={(e) => {
										e.preventDefault();
										toggleColorMode();
									}}
									display={{ base: 'inline-flex', md: 'none' }}
								/>
								<Icon
									display={{ base: 'none', md: 'inline-flex' }}
									as={FaCameraRetro}
									h={6}
									w={6}
									color={useColorModeValue('teal.600', 'teal.200')}
									_hover={{ color: 'teal.500' }}
								/>
								<Text display={{ base: 'none', md: 'inline-flex' }} className='ml-1' fontWeight='extrabold'>
									Casting
									<Text
										_hover={{ color: 'teal.500' }}
										className='mr-8'
										color={useColorModeValue('teal.600', 'teal.200')}
										as='span'
									>
										&
									</Text>
								</Text>
							</Flex>
						</Link>
						<HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
							{links.map(({ linkName, path }, index) => {
								return <NavLink key={index} children={linkName} path={path}></NavLink>;
							})}
						</HStack>
					</HStack>
					<Flex alignItems={'center'} justify={'center'}>
						<Link as={ReactLink} to='/'>
							<Icon
								display={{ base: 'inline-flex', md: 'none' }}
								as={FaCameraRetro}
								h={6}
								w={6}
								color={useColorModeValue('teal.600', 'teal.200')}
							/>
							<Text display={{ base: 'inline-block', md: 'none' }} className='ml-1' fontWeight='extrabold'>
								{!userInfo ? (
									<>
										CastingStoj
										<Text color={colorModeValue} as='span'>
											&amp;
										</Text>
									</>
								) : null}
							</Text>

							<Icon
								display={{ base: 'none', md: 'inline-flex' }}
								p={2}
								boxSize={8}
								zIndex={333}
								color={useColorModeValue('black.600', 'orange.200')}
								as={colorMode === 'light' ? MoonIcon : SunIcon}
								alignSelf='center'
								onClick={(e) => {
									e.preventDefault();
									toggleColorMode();
								}}
							></Icon>
						</Link>

						{userInfo ? (
							<>
								<Menu>
									<Text ml='2'></Text>
									<MenuButton
										as={Button}
										ml={{ base: '1', lg: '0' }}
										px='4'
										py='2'
										transition='all .3s'
										onClick={handleButtonClick}
									>
										{userInfo?.firstName}
										{enrolledCastings.length > 0 &&
											enrolledCastings.filter((casting) => casting.isEdited).length > 0 && (
												<IoNotificationsSharp className='text-orange-600 inline-block mb-4' />
											)}{' '}
										<ChevronDownIcon />
									</MenuButton>
									<MenuList>
										<MenuItem></MenuItem>
										<MenuItem as={ReactLink} to='/profile'>
											<CgProfile />
											<Text ml='2'>Profil </Text>
										</MenuItem>
										<MenuItem as={ReactLink} to='/your-castings'>
											<MdLocalMovies />
											<Text ml='2'>
												Twoje Castingi{' '}
												{enrolledCastings.length > 0 &&
													enrolledCastings.filter((casting) => casting.isEdited).length > 0 && (
														<Badge
															rounded='full'
															ml='1px'
															px='1.5'
															mx='.8'
															mt='-4'
															fontSize='0.75em'
															color='white'
															bg='red'
														>
															{enrolledCastings.filter((casting) => casting.isEdited).length}
														</Badge>
													)}
											</Text>
										</MenuItem>

										{userInfo.isAdmin === 'true' && (
											<>
												<MenuDivider />
												<MenuItem as={ReactLink} to={'/admin-console'}>
													<MdOutlineAdminPanelSettings />
													<Text ml={'2'}>Admin</Text>
												</MenuItem>
											</>
										)}

										<MenuDivider />
										<MenuItem onClick={logoutHandler}>
											<MdLogout />
											<Text ml={2}>Wyloguj</Text>
										</MenuItem>
									</MenuList>
								</Menu>
							</>
						) : (
							<>
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
									onClick={() => {
										dispatch(resetError());
									}}
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
									onClick={() => {
										dispatch(resetError());
									}}
								>
									Załóż Konto <BsBoxArrowInRight className='ml-1' />
								</Button>
							</>
						)}
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
			<AnimatePresence>{isOpen ? <NavMobile onClose={onClose} links={links} /> : null}</AnimatePresence>
		</>
	);
};

export default Navbar;

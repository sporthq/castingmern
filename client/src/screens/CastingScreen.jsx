import { useParams, Link as ReactLink, redirect, useNavigate } from 'react-router-dom';

import {
	Box,
	Image,
	Text,
	Wrap,
	Stack,
	useToast,
	Spinner,
	AlertIcon,
	Alert,
	AlertTitle,
	AlertDescription,
	Flex,
	FormControl,
	Divider,
	Button,
	Heading,
} from '@chakra-ui/react';
import { StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getCasting } from '../redux/actions/castingActions';
import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { enrollCastingUser, enrollUnregisterUserCasting } from '../redux/actions/enrolledActions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import { Helmet } from 'react-helmet-async';
import NotFound from './NotFound';
const FrameButton = motion(Button);
const MotionFormControl = motion(FormControl);

const CastingScreen = () => {
	const [imageWidth, setImageWidth] = useState('');
	const [imageHeight, setImageHeight] = useState('');
	const [showEnrollToast, setShowEnrollToast] = useState(false);
	const { id } = useParams();

	const toast = useToast();
	// redux
	const dispatch = useDispatch();
	const castings = useSelector((state) => state.castings);
	useSelector((state) => state.castings);
	const { enrolledCasting, error: enrollError, loading: loadingEnroll } = useSelector((state) => state.enrolled);
	const { userInfo, enrolledCastings } = useSelector((state) => state.user);
	const { loading, error, casting } = castings;

	const imageRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getCasting(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (enrollError && showEnrollToast) {
			toast({ description: `${enrollError}`, status: 'error', isClosable: true });
			setShowEnrollToast(false);
		} else if (enrolledCastings && showEnrollToast) {
			toast({ description: 'Zapisano na casting', status: 'success', isClosable: true });
		}
	}, [enrollError, enrolledCastings, toast, showEnrollToast]);

	const handleImageSize = (e) => {
		setImageHeight(e.target.naturalHeight);
		setImageWidth(e.target.naturalWidth);
	};

	const handleEnrollButtonClick = () => {
		dispatch(
			enrollCastingUser(id, {
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
				email: userInfo.email,
				phoneNumber: userInfo.phoneNumber,
			})
		);

		setShowEnrollToast(true);
	};

	const castingTitle = casting ? `${casting.movieName} - Szczegóły Castingu ` : 'Szczegóły Castingu';
	const castingDescription = casting
		? `Sprawdź szczegóły castingu do filmu ${casting.mobvieName}. Dowiedz się o wymaganiach, terminach i sposobach zgłoszenia!`
		: '';
	if (loading) {
		// Wyświetlanie innego komponentu lub komunikatu ładowania
		return (
			<Stack direction='row' display='flex' minH={'80vh'} justify={'center'} spacing={4}>
				<Spinner mt={20} thickness='2px' speed='0.65s ' emptyColor='gray.200' color='orange.500' size='xl' />
			</Stack>
		);
	}
	if (!casting) {
		const errorParam = encodeURIComponent('Casting nie istnieje');
		navigate(`/not-found?error=${errorParam}`, { replace: true });
		return null;
	}
	return (
		<>
			<Helmet>
				<title>{castingTitle}</title>
				<meta name='description' content={castingDescription} />
				<link rel='canonical' href='/' />
			</Helmet>

			<Wrap spacing='30px' justify='center' minH='100vh' mt={50}>
				{loading ? (
					<Stack direction='row' spacing={4}>
						<Spinner mt={20} thickness='2px' speed='0.65s ' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				) : error ? (
					<Alert status='error'>
						<AlertIcon />
						<AlertTitle>Upps!</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				) : (
					casting && (
						<>
							<Flex bg='' direction={{ base: 'column' }} justify='center' align='center' paddingBottom='16'>
								<Heading
									mb={7}
									textAlign={'center'}
									as={'h1'}
									fontSize={{ base: '4xl', sm: '5xl', md: '5xl', lg: '6xl' }}
								>
									Casting do filmu {casting.movieName}
								</Heading>
								<Box
									// boxShadow='2xl'
									rounded='md'
									// maxW={{ base: '3xl', lg: '5xl' }}
									// mx='auto'
									width={{ lg: '100%', '2xl': '70%' }}
									px={{ base: '4', md: '8', lg: '12' }}
									py={{ base: '6', md: '8', lg: '12' }}
								>
									<Flex
										direction={{ base: 'column', lg: 'row' }}
										justify='center'
										align={{ base: 'center', lg: 'center' }}
										bg=''
									>
										<Image
											ref={imageRef}
											rounded='md'
											src={casting && casting.image.filePath}
											mb={{ base: '3', lg: '0' }}
											height={{ base: '20%' }}
											onLoad={handleImageSize}
											alt={casting.movieName}
											maxW={{
												base: imageHeight > imageWidth ? '200px' : '300px',

												md: imageHeight > imageWidth ? '300px' : '400px',
												lg: imageHeight > imageWidth ? '200px' : '350px',
												xl: imageHeight > imageWidth ? '200px' : '450px',
											}}
											objectFit='cover' // Dodany styl, aby obrazek byl wyciagniety na caly kontener
										/>

										<Flex bg='' align='flex-end' direction={'column'} px={{ lg: '70px' }}>
											<Text
												fontSize={{ base: 'sm', sm: 'md', lg: 'md', xl: 'lg' }}
												marginTop={{ base: '3', lg: '3' }}
												maxW={{ base: '100%' }}
												textAlign={{ base: 'center', sm: 'left' }}
											>
												{casting.description}
											</Text>
											<Text
												fontSize={{ base: 'md', sm: 'md', lg: 'lg', xl: 'lg' }}
												mt={{ base: '2', lg: '1' }}
												textAlign={'right'}
											>
												<strong>Miejsce:</strong> {casting.town}
											</Text>
										</Flex>
									</Flex>
								</Box>
								<Divider marginTop={{ base: '5', lg: '3' }} />

								{userInfo ? (
									<Button
										color='white'
										_hover={{ bg: 'orange.300' }}
										bg={'orange.400'}
										display='flex'
										mt='30px'
										fontSize={'sm'}
										fontWeight={700}
										onClick={handleEnrollButtonClick}
										isLoading={loadingEnroll}
									>
										Zapisz się!
									</Button>
								) : (
									<>
										<Text px={'2'} textAlign={'center'} fontSize={{ md: 'xl' }} mt='4'>
											Aby dodać zgłoszenie musisz{' '}
											<Button
												fontSize={{ md: 'xl' }}
												as={ReactLink}
												variant={'link'}
												colorScheme='orange'
												to='/rejestracja'
											>
												Załóżyć Konto
											</Button>{' '}
										</Text>
										<Formik
											initialValues={{ email: '', firstName: '', lastName: '' }}
											validationSchema={Yup.object({
												email: Yup.string().email('Niepoprawny email').required('Adres email jest wymagany'),
												firstName: Yup.string().required('Imię jest wymagane'),
												lastName: Yup.string().required('Nazwisko jest wymagane'),
											})}
											onSubmit={(values) => {
												dispatch(enrollUnregisterUserCasting(id, values.firstName, values.lastName, values.email));
												if (enrollError) {
													toast({ description: `${enrollError}`, status: 'error', isClosable: true });
												} else {
													toast({ description: 'Zapisano na casting', status: 'success', isClosable: true });
												}
											}}
										>
											{(formik) => (
												<Stack
													as='form'
													px={{ base: '4', md: '8', lg: '12' }}
													py={{ base: '6', md: '8', lg: '12' }}
													marginTop={{ base: '4', lg: '6px' }}
													w={{ base: 'full' }}
													maxW={{ lg: 'lg' }}
													onSubmit={formik.handleSubmit}
												>
													{error && (
														<Alert
															status='error'
															flexDirection='column'
															alignItems='center'
															justifyContent='center'
															textAlign='center'
														>
															<AlertIcon />
															<AlertTitle>Upps!</AlertTitle>
															<AlertDescription>{error}</AlertDescription>
														</Alert>
													)}
													<FormControl>
														<TextField type='text' name='firstName' placeholder='Imię' label='Imię' />

														<TextField type='text' name='lastName' placeholder='Nazwisko' label='Nazwisko' />

														<TextField type='text' name='email' placeholder='Email' label='Email' />
													</FormControl>
													<Button
														isDisabled={'false'}
														color='white'
														_hover={{ bg: 'orange.300' }}
														bg={'orange.400'}
														display='flex'
														fontSize={'sm'}
														fontWeight={700}
														marginLeft='auto'
														type='submit'
														marginTop={'30'}
													>
														Wyślij
													</Button>
												</Stack>
											)}
										</Formik>
									</>
								)}
							</Flex>
						</>
					)
				)}
			</Wrap>
		</>
	);
};

export default CastingScreen;

import { useParams } from 'react-router-dom';
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
	Badge,
	Heading,
	HStack,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Divider,
	Button,
} from '@chakra-ui/react';
import { StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiCheckShield, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getCasting } from '../redux/actions/castingActions';
import { useEffect, useRef, useState } from 'react';
import CastingCard from '../components/CastingCard';
import { AnimatePresence, motion } from 'framer-motion';
import { enrollCastingUser, enrollUnregisterUserCasting } from '../redux/actions/enrolledActions';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../components/TextField';

const FrameButton = motion(Button);
const MotionFormControl = motion(FormControl);
const CastingScreen = () => {
	const [imageWidth, setImageWidth] = useState('');
	const [imageHeight, setImageHeight] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [showEnrollToast, setShowEnrollToast] = useState(false);
	
	let { id } = useParams();

	const toast = useToast();
	// redux
	const dispatch = useDispatch();
	const castings = useSelector((state) => state.castings);
	const { enrolledCasting, error: enrollError } = useSelector((state) => state.enrolled);
	const { userInfo } = useSelector((state) => state.user);
	const { loading, error, casting } = castings;

	const imageRef = useRef();

	useEffect(() => {
		dispatch(getCasting(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (enrollError && showEnrollToast) {
			toast({ description: `${enrollError}`, status: 'error', isClosable: true });
			setShowEnrollToast(false);
		} else if (enrolledCasting && showEnrollToast) {
			toast({ description: 'Zapisano na casting', status: 'success', isClosable: true });
		}
	}, [enrollError, enrolledCasting, toast, showEnrollToast]);

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
			})
		);
		setShowEnrollToast(true);
	};

	return (
		<>
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
								<Box
									// boxShadow='2xl'
									rounded='md'
									// maxW={{ base: '3xl', lg: '5xl' }}
									// mx='auto'
									px={{ base: '4', md: '8', lg: '12' }}
									py={{ base: '6', md: '8', lg: '12' }}
								>
									<Flex direction={{ base: 'column', lg: 'row' }} align='center'>
										<Image
											ref={imageRef}
											rounded='md'
											src={casting && casting.image}
											// maxW={{ base: '300px' }}
											height={{ base: '20%' }}
											// h='450px'
											onLoad={handleImageSize}
											// maxW={imageHeight > imageWidth ? '200px' : 'full'}
											maxW={{
												base: imageHeight > imageWidth ? 'full' : 'full',
												// sm: imageHeight > imageWidth ? 'full' : '500px',
												// md: imageHeight > imageWidth ? 'full' : '600px',
												lg: imageHeight > imageWidth ? '200px' : '400px',
												xl: imageHeight > imageWidth ? '200px' : '600px',
											}}
										/>

										<Flex bg='' direction={'column'} px={{ lg: '70px' }}>
											<Text
												fontWeight='bold'
												fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
												marginTop={{ base: '5', lg: '0' }}
												maxW={{ base: 'full' }}
											>
												{casting.town}
											</Text>
											<Divider marginTop={{ base: '3', lg: '3' }} />
											<Text
												fontSize={{ base: 'md', sm: 'lg', lg: 'md' }}
												marginTop={{ base: '3', lg: '3' }}
												maxW={{ base: imageWidth }}
											>
												{casting.description}
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
										
									>
										Zapisz się!
									</Button>
								) : (
									<Formik
										initialValues={{ email: '', firstName: '', lastName: '' }}
										validationSchema={Yup.object({
											email: Yup.string().email('Nie poprawny email').required('Adres email jest wymagany'),
											firstName: Yup.string().required('Imię jest wymagane'),
											lastName: Yup.string().required('Nazwisko jest wymagane'),
										})}
										onSubmit={(values) => {
											dispatch(
												enrollUnregisterUserCasting(
													id,

													values.firstName,
													values.lastName,
													values.email
												)
											);
											if (enrollError) {
												toast({ description: `${enrollError}`, status: 'error', isClosable: 'true' });
											} else {
												toast({ description: ' Zapisano na castng', status: 'success', isClosable: 'true' });
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
												maxW={{ lg: 'full' }}
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
													<TextField type='text' name='firstName' placeholder='Imię ' label='Imię' />

													<TextField type='text' name='lastName' placeholder='Nazwisko' label='Nazwisko' />

													<TextField type='text' name='email' placeholder='Email' label='Email' />
												</FormControl>
												<Button
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

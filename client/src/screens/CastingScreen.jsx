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

const FrameButton = motion(Button);
const MotionFormControl = motion(FormControl);
const CastingScreen = () => {
	const [imageWidth, setImageWidth] = useState('');
	const [imageHeight, setImageHeight] = useState('');
	const [showForm, setShowForm] = useState(false);
	let { id } = useParams();

	const toast = useToast();
	// redux
	const dispatch = useDispatch();
	const castings = useSelector((state) => state.castings);
	const { loading, error, casting } = castings;

	const imageRef = useRef();
	useEffect(() => {
		dispatch(getCasting(id));
	}, [dispatch, id]);

	const handleImageSize = (e) => {
		setImageHeight(e.target.naturalHeight);
		setImageWidth(e.target.naturalWidth);
	};

	return (
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
											fontSize={{ base: '2xl',sm:'3xl',
											 lg: '4xl' }}
											marginTop={{ base: '5', lg: '0' }}
											maxW={{ base: 'full' }}
										>
											{casting.town}
										</Text>
										<Divider marginTop={{ base: '3', lg: '3' }} />
										<Text
											fontSize={{ base: 'md',sm:'lg', lg: 'md' }}
											marginTop={{ base: '3', lg: '3' }}
											maxW={{ base: imageWidth }}
										>
											{casting.description}
										</Text>
										{/* <FrameButton
											color='white'
											_hover={{ bg: 'orange.300' }}
											bg={'orange.400'}
											alignSelf='flex-end'
											mt='30px'
											fontSize={'sm'}
											fontWeight={700}
											onClick={() => {
												setShowForm(!showForm);
											}}
										>
											Zapisz się
										</FrameButton> */}
									</Flex>
								</Flex>
							</Box>
							<Divider marginTop={{ base: '5', lg: '3' }} />

							 
								<MotionFormControl
									initial={{ y: '-50', opacity: '0' }}
									animate={{ y: '30px', opacity: '1', transition: { duration: 0.3 } }}
									// exit={{ y: '-50px', opacity: '0', transition:  { y:{duration:.1}, opacity: { duration: 10 }, delay:.5 } }}
									px={{ base: '4', md: '8', lg: '12' }}
									py={{ base: '6', md: '8', lg: '12' }}
									marginTop={{ base: '4', lg: '2px' }}
									w={{ base: 'full' }}
									maxW={{ lg: 'full' }}
								>
									<FormLabel>Imię: </FormLabel>
									<Input placeContent='Imię'></Input>
									<FormLabel>Nazwisko: </FormLabel>
									<Input placeContent='Nazwisko'></Input>
									<FormLabel>O sobię: </FormLabel>
									<Textarea placeContent='O sobię'></Textarea>
									<Button
										color='white'
										_hover={{ bg: 'orange.300' }}
										bg={'orange.400'}
										display='flex'
										mt='30px'
										fontSize={'sm'}
										fontWeight={700}
										marginLeft='auto'
									>
										Wyślij
									</Button>
								</MotionFormControl>
							
						</Flex>
					</>
				)
			)}
		</Wrap>
	);
};

export default CastingScreen;

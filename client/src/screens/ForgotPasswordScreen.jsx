import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useToast,
} from '@chakra-ui/react';

import { useEffect, React } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import TextField from '../components/TextField';
import { forgotPasword } from '../redux/actions/userActions';
import { resetSendEmail } from '../redux/slices/user';
import { BsBoxArrowInRight } from 'react-icons/bs';
import { HiLogin } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';

const ForgotPasswordScreen = () => {
	const toast = useToast();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { loading, error, sendEmail } = user;
	const headingBR = useBreakpointValue({ base: '2xl', md: '3xl' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	useEffect(() => {
		if (sendEmail && !error) {
			toast({ status: 'success', description: 'Wiadomość wysłana, sprawdź pocztę' });
		}

		dispatch(resetSendEmail());
	}, [dispatch, error, sendEmail, resetSendEmail]);
	return (
		<>
		<Helmet>
				<meta name='robots' content='noindex' />
				<link rel='canonical' href='/' />
			</Helmet>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={Yup.object({
					email: Yup.string().email('Nie poprawny email').required('Adres email jest wymagany'),
				})}
				onSubmit={(values, { resetForm }) => {
					dispatch(forgotPasword(values.email));
					resetForm();
				}}
			>
				{(formik) => (
					<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
						<Stack spacing='5'>
							<Stack spacing='6'>
								<Stack spacing={{ base: '2', md: '4' }} textAlign='center'>
									<Heading size={headingBR}>Zapomniałeś hasło? </Heading>
									<Text>Podaj swój adres e-mail, żeby zresetować hasło</Text>
								</Stack>
							</Stack>
							<Box
								py={{ base: '0', md: '8' }}
								px={{ base: '4', md: '10' }}
								bg={{ boxBR }}
								boxShadow={{ base: 'none', md: 'xl' }}
							>
								<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
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
									<Stack spacing='50'>
										<FormControl>
											<TextField type='text' name='email' placeholder='Email' label='Email' />
											<Flex justifyContent='space-between'>
												<Button as={ReactLink} to='/login' variant='outline' colorScheme='blackAlpha' size='sm'>
													<HiLogin /> Zaloguj
												</Button>
												<Button as={ReactLink} to='/rejestracja' variant='outline' colorScheme='blackAlpha' size='sm'>
													Założ Konto <BsBoxArrowInRight className='ml-1' />
												</Button>
											</Flex>
										</FormControl>
									</Stack>
									<Stack spacing='6'>
										<Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
											Zresetuj hasło
										</Button>
									</Stack>
								</Stack>
							</Box>
						</Stack>
					</Container>
				)}
			</Formik>
		</>
	);
};

export default ForgotPasswordScreen;

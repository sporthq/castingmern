import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useBreakpointValue,
	useToast,
	

	FormErrorMessage,
	
} from '@chakra-ui/react';

import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { register } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

import CustomFileButton from '../components/CustomFileButton';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import {Helmet} from 'react-helmet-async'

const RegistrationScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, loading, userInfo, sendConfirmMail } = useSelector((state) => state.user);
	const redirect = '/castingi';
	const toast = useToast();
	const headingBR = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({
				description: 'Konto założone pomyślnie!',
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, toast]);

	return (
		<> 
		<Helmet>
				<meta name='robots' content='noindex' />
				<link rel='canonical' href='/rejestracja' />
			</Helmet>
		<Formik
			initialValues={{
				email: '',
				password: '',
				confirmPassword: '',
				firstName: '',
				lastName: '',
				image: null,
				phoneNumber: '',
				acceptTerms: false,
			}}
			validationSchema={Yup.object({
				firstName: Yup.string().required('Imię jest wymagane'),
				lastName: Yup.string().required('Nazwisko jest wymagane'),
				email: Yup.string().email('Niepoprawny email').required('Adres email jest wymagany'),
				phoneNumber: Yup.string()
					.matches(/^\d{9,}$/, 'Numer telefonu musi mieć co najmniej 9 cyfr')
					.required('Wpisz swój numer telefonu!'),
				password: Yup.string().min(6, 'Hasło musi zawierać co najmniej 6 znaków').required('Hasło jest wymagane'),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same')
					.required('Potwierdzenie hasła jest wymagane'),
				acceptTerms: Yup.boolean().oneOf([true], 'Musisz zaakceptować regulamin!'),
			})}
			onSubmit={(values) => {
				console.log(values);
				dispatch(
					register(values.firstName, values.lastName, values.email, values.password, values.image, values.phoneNumber)
				);
			}}
		>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack bg='' spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Załóż konto</Heading>
								<HStack spacing='1' justify='center'>
									<Text color='muted'>Masz już konto?</Text>
									<Button as={ReactLink} to='/login' variant='link' colorScheme='orange'>
										Zaloguj
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={boxBR}
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
								<Stack spacing='6'>
									<FormControl>
										<TextField type='text' name='firstName' placeholder='Twoje imię' label='Twoje imię' />
										<TextField type='text' name='lastName' placeholder='Twoje nazwisko' label='Twoje nazwisko' />
										<TextField type='text' name='email' placeholder='Email' label='Email' />

										<TextField type='number' name='phoneNumber' placeholder='Numer Telefonu' label='Numer Telefou' />

										<FormLabel htmlFor='image'>Zdjęcie</FormLabel>
										<Field name='image'>
											{({ form }) => (
												<CustomFileButton
													onChange={(file) => form.setFieldValue('image', file)}
													previewImage={formik.values.image}
												/>
											)}
							

										</Field>
 
										<PasswordTextField  type='password' name='password' placeholder='Hasło' label='Hasło' />
										<PasswordTextField
											type='password'
											name='confirmPassword'
											placeholder='Powtórz hasło'
											label='Powtórz hasło'
										/>
									</FormControl>
									<FormControl id='acceptTerms' isInvalid={formik.touched.acceptTerms && formik.errors.acceptTerms}>
										<Checkbox
											name='acceptTerms'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isChecked={formik.values.acceptTerms}
										>
											Akceptuję regulamin
										</Checkbox>
										{formik.touched.acceptTerms && formik.errors.acceptTerms && (
											<FormErrorMessage>{formik.errors.acceptTerms}</FormErrorMessage>
										)}
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Zarejestruj
									</Button>
								</Stack>
								{sendConfirmMail && (
									<Alert
										status='info'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'
									>
										<AlertIcon />
										<AlertTitle>Potwierdź adres e-mail!</AlertTitle>
										<AlertDescription>
											Sprawdź pocztę i klknij w link powierdzający aby dokończyć rejestrację
										</AlertDescription>
									</Alert>
								)}
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
		</>
	);
};

export default RegistrationScreen;

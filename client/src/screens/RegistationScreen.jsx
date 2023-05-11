import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Chackbox,
	Container,
	FormControl,
	Heading,
	HStack,
	Stack,
	Text,
	useBreakpointValue,
	useToast,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const RegistationScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error, loading, userInfo } = useSelector((state) => state.user);
	const redirect = '/castings';
	const toast = useToast();
	const headingBR = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({ description: 'Konto założone pomyślnie!', status: 'success', isClosable: 'true' });
		}
	}, [userInfo, redirect, error, navigate, toast]);
	return (
		<Formik
			initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
			validationSchema={Yup.object({
				firstName: Yup.string().required('Imię  jest wymagane'),
				lastName: Yup.string().required('Nazwisko jest wymagane'),
				email: Yup.string().email('Nie poprawny email').required('Adres email jest wymagany'),
				password: Yup.string()
					.min(1, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane'),
				confirmPassword: Yup.string()
					.min(1, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane')
					.oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
			})}
			onSubmit={(values) => {
				dispatch(register(values.firstName, values.lastName, values.email, values.password));
			
			}}
		>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Załóż konto </Heading>
								<HStack spacing='1' justify='center'>
									<Text color='muted'>Masz już konto ? </Text>
									<Button as={ReactLink} to='/login' variant='link' colorScheme='orange'>
										Zaloguj
									</Button>
								</HStack>
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
										<TextField type='text' name='firstName' placeholder='Twoję imię' label='Twoję imię' />
										<TextField type='text' name='lastName' placeholder='Twoje Nazwisko' label='Twoje Nazwisko' />
										<TextField type='text' name='email' placeholder='Email' label='Email' />
										<PasswordTextField type='password' name='password' placeholder='Hasło' label='Hasło' />

										<PasswordTextField
											type='password'
											name='confirmPassword'
											placeholder='Powtórz hasło'
											label='Powtórz hasło'
										/>
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Zarejestruj
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default RegistationScreen;

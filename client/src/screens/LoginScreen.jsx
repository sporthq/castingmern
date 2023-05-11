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

import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import { login } from '../redux/actions/userActions';

// TODO zmień długość hasła
const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const redirect = '/castings';
	const toast = useToast();

	const user = useSelector((state) => state.user);
	const { loading, error, userInfo } = user;
	const headingBR = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	useEffect(() => {
		if (userInfo) {
			if (location.state?.from) {
				navigate(location.state.from);
			} else {
				navigate(redirect);
			}
			toast({ description: 'Witaj! Udało Ci się zalogować!', status: 'success', isClosable: 'true' });
		}
	}, [userInfo, redirect,error, navigate, location.state, toast ]);
	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={Yup.object({
				email: Yup.string().email('Nie poprawny email').required('Adres email jest wymagany'),
				password: Yup.string()
					.min(1, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane'),
			})}
			onSubmit={(values) => {
				dispatch(login(values.email, values.password));
				console.log(values);
			}}
		>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Zaloguj się </Heading>
								<HStack spacing='1' justify='center'>
									<Text color='muted'>Nie masz konta ? </Text>
									<Button as={ReactLink} to='/register' variant='link' colorScheme='orange'>
										Załóż konto
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
								<Stack spacing='5'>
									<FormControl>
										<TextField type='text' name='email' placeholder='Email' label='Email' />
										<PasswordTextField type='password' name='password' placeholder='Hasło' label='Hasło' />
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Zaloguj
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

export default LoginScreen;

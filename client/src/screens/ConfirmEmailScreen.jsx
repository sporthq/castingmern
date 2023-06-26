import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	Heading,
	Stack,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from '../redux/actions/userActions';
import { resetError } from '../redux/slices/user';
import { Link as ReactLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ConfirmEmailScreen = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { loading, error, success } = user;
	const headingBR = useBreakpointValue({ base: '2xl', md: '3xl' });

	useEffect(() => {
		// Pobierz token weryfikacyjny z URL
		const token = window.location.pathname.split('/').pop();

		// Wywołaj akcję weryfikacji użytkownika
		dispatch(verifyUser(token));
	}, [dispatch]);

	return (
		<>
			<Helmet>
				<meta name='robots' content='noindex' />
				<link rel='canonical' href='/' />
			</Helmet>
			<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
				<Stack spacing='5'>
					<Stack spacing='6'>
						<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
							<Heading size={headingBR}>Potwierdź swój adres e-mail</Heading>
						</Stack>
					</Stack>
					<Box
						py={{ base: '0', md: '8' }}
						px={{ base: '4', md: '10' }}
						bg='bg-surface'
						boxShadow={{ base: 'none', md: 'xl' }}
					>
						<Stack spacing='6'>
							{loading && (
								<Alert
									status='info'
									flexDirection='column'
									alignItems='center'
									justifyContent='center'
									textAlign='center'
								>
									<AlertIcon />
									<AlertTitle>Trwa weryfikacja...</AlertTitle>
								</Alert>
							)}
							{error && (
								<Alert
									status='error'
									flexDirection='column'
									alignItems='center'
									justifyContent='center'
									textAlign='center'
								>
									<AlertIcon />
									<AlertTitle>Błąd weryfikacji</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
									<Button
										mt='1'
										onClick={() => {
											dispatch(resetError());
										}}
										as={ReactLink}
										to='/rejesstracja'
										variant='link'
										colorScheme='orange'
									>
										Załóż Konto
									</Button>
								</Alert>
							)}
							{success && (
								<Alert
									status='success'
									flexDirection='column'
									alignItems='center'
									justifyContent='center'
									textAlign='center'
								>
									<AlertIcon />
									<AlertTitle>Potwierdzenie udane</AlertTitle>
									<AlertDescription>{success}</AlertDescription>
									<Button
										onClick={() => {
											dispatch(resetError());
										}}
										as={ReactLink}
										to='/login'
										variant='link'
										colorScheme='orange'
									>
										Zaloguj
									</Button>
								</Alert>
							)}
						</Stack>
					</Box>
				</Stack>
			</Container>
		</>
	);
};

export default ConfirmEmailScreen;

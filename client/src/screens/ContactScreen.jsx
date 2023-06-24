import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	Heading,
	Stack,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import TextAreaField from '../components/TextAreaField';
import * as Yup from 'yup';
import axios from 'axios';
import { resetContactError, sendEmail } from '../redux/actions/contactActions';
import { Helmet } from 'react-helmet';
const ContactScreen = () => {
	const { userInfo } = useSelector((state) => state.user);
	const { error: contactError, loading: contactLoading, success } = useSelector((state) => state.contact);

	const toast = useToast();
	const dispatch = useDispatch();
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (success) {
			toast({ description: 'Wiadomość wysłana pomyślnie', status: 'success', isClosable: true });
		} else if (contactError) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
				dispatch(resetContactError());
			}, 5000); // Ukryj alert po 5 sekundach
		}
	}, [dispatch, success, contactError, toast]);
	return (
		<>
			<Helmet>
				<title>Skontaktuj się z nami || Castingi </title>
				<meta
					name='description'
					content='Skontaktuj się z nami, aby uzyskać więcej informacji na temat castingów filmowych w Warszawie. Jesteśmy dostępni przez telefon, e-mail i formularz kontaktowy. Nie przegap szansy na udział w ekscytujących produkcjach filmowych!'
				/>
			</Helmet>
			<Formik
				initialValues={{ thead: '', email: userInfo?.email || '', msg: '' }}
				validationSchema={Yup.object({
					thead: Yup.string().required('Temat jest wymagany'),
					email: Yup.string().email('Nie poprawny email').required('Adres email jest wymagany'),
					msg: Yup.string().required('Wiadomość jest wymagana'),
				})}
				onSubmit={(values, { resetForm }) => {
					dispatch(sendEmail(values));
					resetForm();
				}}
			>
				{(formik) => (
					<Container maxW='lg' py={{ base: '12', md: '24' }} minH='2xl'>
						<Stack spacing='8'>
							<Stack textAlign='center'>
								<Heading size={{ base: '2xl', lg: '3xl' }}>Napisz do nas!</Heading>
							</Stack>
						</Stack>
						<Box
							py={{ base: '4', md: '12' }}
							px={{ base: '4', md: '10' }}
							boxShadow={{ base: 'none', md: 'xl' }}
							bg='transparent'
						>
							<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
								{showError && (
									<Alert
										status='error'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'
									>
										<AlertIcon />
										<AlertTitle>Upps!</AlertTitle>
										<AlertDescription>{contactError}</AlertDescription>
									</Alert>
								)}
								<Stack spacing='50'>
									<FormControl>
										<TextField type='text' name='email' placeholder='Email' label='Email' />
										<TextField type='text' name='thead' placeholder='Temat' label='Temat' />
										<TextAreaField
											type='text'
											label='Wpisz swoje pytanie'
											name='msg'
											placeholder='Wpisz swoje pytanie'
										></TextAreaField>
									</FormControl>
								</Stack>
								<Stack>
									<Button type='submit' colorScheme='orange' isLoading={contactLoading}>
										Wyślij
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Container>
				)}
			</Formik>
		</>
	);
};

export default ContactScreen;

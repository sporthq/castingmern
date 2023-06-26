import {
	Box,
	Button,
	FormControl,
	Heading,
	HStack,
	Stack,
	Text,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Flex,
	Card,
	CardHeader,
	CardBody,
	StackDivider,
	useToast,
	Alert,
	Toast,
	Image,
	FormLabel,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router';
import { Navigate, useNavigate } from 'react-router-dom';
import { resetUpdateSucces, updateProfile } from './../redux/actions/userActions';
import CustomFileButton from '../components/CustomFileButton';
import {Helmet} from 'react-helmet-async'

const ProfileScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { userInfo, loading, error, updateSuccess } = useSelector((state) => state.user);
	const toast = useToast();

	const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

	const email = storedUserInfo?.email;
	const firstName = storedUserInfo?.firstName;
	const lastName = storedUserInfo?.lastName;
	const image = storedUserInfo?.image?.filePath;
	useEffect(() => {
		if (updateSuccess) {
			toast({ description: 'Profil zaaktualizowany', status: 'success', isClosable: 'true' });
			dispatch(resetUpdateSucces());
		}
	}, [updateSuccess, toast]);

	return userInfo ? (
		<>
		<Helmet>
				<meta name='robots' content='noindex' />
				<link rel='canonical' href='/' />
			</Helmet>
		<Formik
			initialValues={{
				email: email,
				password: '',
				firstName: firstName,
				lastName: userInfo.lastName,
				confirmPassword: '',
				phoneNumber: userInfo.phoneNumber,
				image: userInfo?.image?.filePath,
			}}
			validationSchema={Yup.object({
				firstName: Yup.string().required('Imię  jest wymagane'),
				lastName: Yup.string().required('Nazwisko jest wymagane'),
				email: Yup.string().email('Nie poprawny email').required('Adres email jest wymagany'),
				phoneNumber: Yup.string()
					.matches(/^\d{9,}$/, 'Numer telefonu musi mieć co najmniej 9 cyfr')
					.required('Wpisz swój numer telefonu!'),
				password: Yup.string()
					.min(6, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane'),
				confirmPassword: Yup.string()
					.min(6, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane')
					.oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
			})}
			onSubmit={(values) => {
				dispatch(
					updateProfile(
						userInfo._id,
						values.firstName,
						values.lastName,
						values.email,
						values.password,
						values.phoneNumber,
						values.image
					)
				);
				navigate('/profile');
			}}
		>
			{(formik) => (
				<Box
					minH='100vh'
					maxW={{ base: '3xl', lg: '7xl' }}
					mx='auto'
					px={{ base: '4', md: '8', lg: '12' }}
					py={{ base: '6', md: '8', lg: '12' }}
				>
					<Stack spacing={10} direction={{ base: 'column', lg: 'row' }} align={{ base: '', lg: 'center' }}>
						<Stack display='flex' order={{ base: '2', lg: '1' }} flex='1.5' mb={{ base: '2xl', md: 'none' }}>
							<Heading fontSize={{ base: '2xl', lg: '4xl' }} fontWeight='extrabold'>
								Profile
							</Heading>
							<Stack spacing={6}>
								<Stack spacing={6} as='form' onSubmit={formik.handleSubmit}>
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
									<Stack spacing={5}>
										<FormControl>
											<TextField type='text' name='firstName' label='Imię ' placeholder='Twoje Imię'></TextField>
											<TextField type='text' name='lastName' placeholder='Twoje Nazwisko' label='Twoje Nazwisko' />
											<TextField type='text' name='email' placeholder='Email' label='Email' />
											<TextField type='number' name='phoneNumber' placeholder='Numer Telefonu' label='Numer Telefou' />

											<FormControl>
												<FormLabel htmlFor='image' textAlign='left'>
													Edytuj Zdjęcie
												</FormLabel>
												<Field name='image'>
													{({ form }) => (
														<CustomFileButton
															onChange={(file) => form.setFieldValue('image', file)}
															previewImage={formik.values.image}
														/>
													)}
												</Field>
											</FormControl>
											<PasswordTextField type='password' name='password' placeholder='Hasło' label='Hasło' />

											<PasswordTextField
												type='password'
												name='confirmPassword'
												placeholder='Powtórz hasło'
												label='Powtórz hasło'
											/>
										</FormControl>
									</Stack>
									<Stack spacing={6}>
										<Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
											Edytuj
										</Button>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
						<Flex pb={'14'} order={{ base: '1', lg: '2' }} direction='column' align='center' flex={1}>
							<Card>
								<CardHeader textAlign='center'>
									<Heading mb={'-6'} size={{ base:'md', sm:'lg' }}>
										{firstName} {lastName}{' '}
									</Heading>
								</CardHeader>
								<CardBody>
									<Stack divider={<StackDivider></StackDivider>} spacing={4}>
										<Box textAlign='center' pt={2} fontSize={'small'}>
											<Image rounded='2xl' mb={'2'} maxW={{ base:'200px', sm:'250px' , lg:'300px'}} maxH='auto' src={image}></Image>
											Konto Założone: {new Date(userInfo.createdAt).toLocaleDateString('pl-PL')}
										</Box>
									</Stack>
								</CardBody>
							</Card>
						</Flex>
					</Stack>
				</Box>
			)}
		</Formik>
		</>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default ProfileScreen;

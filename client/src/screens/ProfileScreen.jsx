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
} from '@chakra-ui/react';

import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router';
import { Navigate , useNavigate  } from 'react-router-dom';
import { resetUpdateSucces, updateProfile } from './../redux/actions/userActions';
// import { FormControl } from '@chakra-ui/form-control';

const ProfileScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { userInfo, loading, error, updateSuccess } = useSelector((state) => state.user);
	const toast = useToast();
	useEffect(() => {
		if (updateSuccess) {
			toast({ description: 'Profil zaaktualizowany', status: 'success', isClosable: 'true' });
			dispatch(resetUpdateSucces());
		}
	}, [updateSuccess, toast]);
	return userInfo ? (
		<Formik
			initialValues={{
				email: userInfo.email,
				password: '',
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
				confirmPassword: '',
			}}
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
				dispatch(updateProfile(userInfo._id, values.firstName, values.lastName, values.email, values.password));
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
					<Stack  spacing={10} direction={{ base: 'column', lg: 'row' }} align={{ base: '', lg: 'center' }}>
						<Stack display='flex'  order={{ base:'2', lg:'1' }}  flex='1.5' mb={{ base: '2xl', md: 'none' }}>
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
						<Flex pb={'14'} order={{ base:'1', lg:'2' }} direction='column'  align='center' flex={1} >
							<Card>
								<CardHeader>
									<Heading size='md'>User Report </Heading>
								</CardHeader>
								<CardBody>
									<Stack divider={<StackDivider></StackDivider>} spacing={4}>
										<Box pt={2} fontSize={'small'}>
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
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default ProfileScreen;

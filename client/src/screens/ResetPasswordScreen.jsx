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
	
	useBreakpointValue,

} from '@chakra-ui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import {  Link as  useLocation, useParams } from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';

import { resetPassword } from '../redux/actions/userActions';

const ResetPasswordScreen = () => {
	const dispatch = useDispatch();
	const { resetToken } = useParams();
	const user = useSelector((state) => state.user);
	const { loading, error, resetPasswordSucces } = user;
	const headingBR = useBreakpointValue({ base: '2xl', md: '3xl' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });
	
	return (
		<Formik
			initialValues={{ password: '', confirmPassword: '' }}
			validationSchema={Yup.object({
				password: Yup.string()
					.min(1, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane'),
				confirmPassword: Yup.string()
					.min(1, 'Hasło jest za krótkie, musi zawierać co najmniej 6 znaków')
					.required('Hasło jest wymagane')
					.oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
			})}
			onSubmit={(values, { resetForm }) => {
				dispatch(resetPassword(resetToken, values.password));
				resetForm();
			}}
		>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='5'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Zmień hasło? </Heading>
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

								{resetPasswordSucces && (
									<Alert
										status='success'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'
									>
										<AlertIcon />
										<AlertTitle>Gratulacje!</AlertTitle>
										<AlertDescription>{resetPasswordSucces}</AlertDescription>
									</Alert>
								) }
								<Stack spacing='50'>
									<FormControl>
										<PasswordTextField
											type='password'
											name='password'
											placeholder='Nowe Hasło'
											label='Hasło'
										></PasswordTextField>
										<PasswordTextField
											type='password'
											name='confirmPassword'
											placeholder='Powtórz Hasło'
											label='Hasło'
										></PasswordTextField>
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
	);
};

export default ResetPasswordScreen;

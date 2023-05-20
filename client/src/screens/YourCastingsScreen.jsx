import { useSelector, useDispatch } from 'react-redux';
import { getUserCastings } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Alert,
	Spinner,
	Stack,
	Wrap,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Button,
	Image,
	useBreakpointValue,
	Box,
} from '@chakra-ui/react';
import { deleteEnrolledOnCasting } from '../redux/actions/userActions';

const YourCastingsScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { userInfo, error, loading, enrolledCastings } = useSelector((state) => state.user);
	


	useEffect(() => {
		if (userInfo) {
			dispatch(getUserCastings());
		}
	}, [userInfo]);


	return userInfo ? (
		<>
			{loading ? (
				<Wrap justify='center' direction='column' align='center' mt={'20'} minH='100vh'>
					<Stack direction='row' spacing={4}>
						<Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				</Wrap>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Upps!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				enrolledCastings && (
					<TableContainer minH='100vh'>
						<Table variant='striped'>
							<Thead>
								<Tr>
									<Th>Zdjęcie</Th>
									<Th>Data zapisu</Th>
									<Th>Nazwa Filmu</Th>
									<Th>Miasto</Th>
									<Th>Zrezygnuj</Th>
								</Tr>
							</Thead>
							<Tbody>
								{enrolledCastings.map((casting) => (
									<Tr className='' key={casting._id}>
										<Td>
											<Image
												className='border border-solid p-1'
												rounded='md'
												objectFit='cover'
												boxSize='50px'
												src={casting.image}
												alt={casting.movieName}
											></Image>
										</Td>
										<Td>{new Date(casting.createdAt).toLocaleDateString('pl-PL')}</Td>
										<Td>{casting.movieName}</Td>
										<Td>{casting.town}</Td>
										<Td>
											<Button
												size='sm'
												colorScheme='red'
												onClick={() => {
													dispatch(deleteEnrolledOnCasting(casting._id));
												
												}}
											>
												
												Wypisz się
											</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				)
			)}
		</>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default YourCastingsScreen;

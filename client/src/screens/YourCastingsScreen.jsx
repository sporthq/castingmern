import { useSelector, useDispatch } from 'react-redux';
import { getUserCastings } from '../redux/actions/userActions';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { FaExchangeAlt } from 'react-icons/fa';
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
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
	Text,
} from '@chakra-ui/react';
import { deleteEnrolledOnCasting } from '../redux/actions/userActions';
import { getCastings } from '../redux/actions/castingActions';
import { updateEnroll } from '../redux/actions/enrolledActions';
import { Helmet } from 'react-helmet-async';
const YourCastingsScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { userInfo, error, loading, enrolledCastings } = useSelector((state) => state.user);
	const { castings } = useSelector((state) => state.castings);
	const { loading: loadingEnroll } = useSelector((state) => state.enrolled);

	const [showDialog, setShowDialog] = useState(false); // Stan określający, czy pokazać Dialog

	const [changedProperties, setChangedProperties] = useState([]);

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserCastings());
			dispatch(getCastings());
		}
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (enrolledCastings.length > 0) {
			const savedOnCastings = castings.filter((casting) =>
				enrolledCastings.some((item) => item.casting === casting._id)
			);

			const changedProperties = [];

			savedOnCastings.forEach((casting) => {
				enrolledCastings.forEach((enroll) => {
					if (casting._id === enroll.casting) {
						if (casting.movieName !== enroll.movieName) {
							changedProperties.push({
								property: 'Nazwe filmu:',
								value: `${enroll.movieName} na  ${casting.movieName}`,
								movieName: enroll.movieName,
								id: enroll._id,
								castingId: casting._id,
							});
						}
						if (casting.town !== enroll.town) {
							changedProperties.push({
								property: 'Miasto:',
								value: `${enroll.town} na ${casting.town}`,
								movieName: enroll.movieName,
								id: enroll._id,
								castingId: casting._id,
							});
						}
					}
				});
			});

			if (changedProperties.length > 0) {
				setChangedProperties(changedProperties);
				setShowDialog(true);
			}
		}
	}, [enrolledCastings, castings]);

	const handleCloseDialog = async () => {
		for (const property of changedProperties) {
			await dispatch(updateEnroll(property.id, property.castingId));
		}

		await dispatch(getUserCastings());
		setShowDialog(false); // Zamknij Dialog
		setChangedProperties([]);
	};

	const handleClosePopup = () => {
		setShowDialog(false);
	};
	return userInfo ? (
		<>
			<Helmet>
				<meta name='robots' content='noindex' />
				{/* <link rel='canonical' href='/' /> */}
			</Helmet>
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
									<Tr key={casting._id}>
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
												isLoading={loadingEnroll}
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
			<AlertDialog isOpen={showDialog} onClose={handleClosePopup} isCentered>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader fontWeight={'extrabold'}>
						{' '}
						<WarningIcon color={'orange'} mr={'2'} />
						<WarningIcon color={'orange'} mr={'2'} />
						<WarningIcon color={'orange'} mr={'2'} /> Zmiany w castingach
					</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						{changedProperties.map((property, index) => (
							<Text key={index}>
								<FaExchangeAlt className='display: inline  mr-1 text-orange-600' /> Zmieniono{' '}
								<strong>{property.property}</strong> w castingu o nazwie <strong>{property.movieName}</strong>
								:
								<br />Z <strong>{property.value}</strong>
								<br />
								<br />
								<Button
									size='sm'
									mt={'-3'}
									mb={'4'}
									colorScheme='red'
									isLoading={loadingEnroll}
									onClick={() => {
										dispatch(deleteEnrolledOnCasting(property.id));
										handleClosePopup();
									}}
								>
									Zrezygnuj
								</Button>
							</Text>
						))}
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button colorScheme='blue' onClick={handleCloseDialog}>
							OK
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default YourCastingsScreen;

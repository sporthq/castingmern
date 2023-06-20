
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Image,
	Spinner,
	Stack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Wrap,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getAllEnrolledUsers } from '../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';

const UserEnroledCastingTab = () => {
	const dispatch = useDispatch();
	const { error, loading, enrolledUserList } = useSelector((state) => state.admin);
	const [sortedByMovieName, setSortedByMovieName] = useState(false);
	const [sortedByEmail, setSortedByEmail] = useState(false);
	const [sortedUserList, setSortedUserList] = useState([]);

	const [headerModal, setHeaderModal] = useState('');

	const [selectedUserImage, setSelectedUserImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		dispatch(getAllEnrolledUsers());
	}, [dispatch]);

	useEffect(() => {
		if (enrolledUserList) {
			setSortedUserList([...enrolledUserList]);
		}
	}, [enrolledUserList]);

	const sortListByMovieName = () => {
		const sortedList = [...sortedUserList].sort((a, b) => {
			if (a.movieName < b.movieName) return -1;
			if (a.movieName > b.movieName) return 1;
			return 0;
		});
		setSortedByMovieName(!sortedByMovieName);
		setSortedByEmail(false);
		setSortedUserList(sortedList);
	};

	const sortListByEmail = () => {
		const sortedList = [...sortedUserList].sort((a, b) => {
			if (a.email < b.email) return -1;
			if (a.email > b.email) return 1;
			return 0;
		});
		setSortedByEmail(!sortedByEmail);
		setSortedByMovieName(false);
		setSortedUserList(sortedList);
	};

	const openImageModal = (image, firstName) => {
		setSelectedUserImage(image);
		setHeaderModal(firstName);
		setIsModalOpen(true);
	};

	const closeImageModal = () => {
		setSelectedUserImage(null);
		setIsModalOpen(false);
	};
	return (
		<Box>
			{error && (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Upps!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			{loading ? (
				<Wrap justify='center'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				</Wrap>
			) : (
				<Box>
					<TableContainer>
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th>Zdjęcie</Th>
									<Th>Plakat Filmu</Th>
									<Th onClick={sortListByMovieName} style={{ cursor: 'pointer' }}>
										Nazwa filmu{' '}
										{sortedByMovieName ? (
											<Icon as={AiOutlineArrowUp} color='red.500' />
										) : (
											<Icon as={AiOutlineArrowDown} color='red.500' />
										)}
									</Th>
									<Th>Imię</Th>
									<Th>Nazwisko</Th>
									<Th>Zarejestrowany</Th>
									<Th onClick={sortListByEmail} style={{ cursor: 'pointer' }}>
										Email{' '}
										{sortedByEmail ? (
											<Icon as={AiOutlineArrowUp} color='red.500' />
										) : (
											<Icon as={AiOutlineArrowDown} color='red.500' />
										)}
									</Th>
									<Th>Nr telefonu</Th>
								</Tr>
							</Thead>
							<Tbody>
								{sortedUserList &&
									sortedUserList.map((user) => (
										<Tr key={user._id}>
											<Td>
												{/* <Image rounded='full' w='55px' h='55px' objectFit='cover' src={user.userImage} /> */}
												<Image
													rounded='full'
													w='55px'
													h='55px'
													objectFit='cover'
													src={user.userImage}
													onClick={() => openImageModal(user.userImage, user.firstName)}
													cursor='pointer'
												/>
											</Td>
											<Td>
												<Image rounded='full' w='55px' h='55px' objectFit='cover' src={user.image} />
											</Td>
											<Td>{user.movieName}</Td>
											<Td>{user.firstName}</Td>
											<Td>{user.lastName}</Td>
											<Td>{new Date(user.createdAt).toLocaleDateString('pl-PL')}</Td>
											<Td>{user.email}</Td>
											<Td>{user?.phoneNumber}</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</TableContainer>
					<Modal isOpen={isModalOpen} onClose={closeImageModal} size='xl'>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>{headerModal}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Image src={selectedUserImage} alt='Powiększone zdjęcie' />
							</ModalBody>
							<ModalFooter>
								<Button colorScheme='blue' onClick={closeImageModal}>
									Zamknij
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Box>
			)}
		</Box>
	);
};

export default UserEnroledCastingTab;

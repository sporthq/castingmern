// UserTab.js

import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Image,
	Spinner,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Wrap,
	useDisclosure,
	useToast,
	Text,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers, deleteUser, resetErrorAndRemoval } from './../redux/actions/adminActions';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';

const UserTab = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const [userToDelete, setUserToDelete] = useState('');
	const dispatch = useDispatch();
	const { error, loading, userRemoval, userList } = useSelector((state) => state.admin);
	const { userInfo } = useSelector((state) => state.user);
	const toast = useToast();

	const [headerModal, setHeaderModal] = useState('');

	const [selectedUserImage, setSelectedUserImage] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 10;
	const [sortedUserList, setSortedUserList] = useState('');
	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(resetErrorAndRemoval());
		if (userRemoval) {
			toast({
				description: 'Użytkownik usunięty',
				status: 'success',
				isClosable: true,
			});
		}
	}, [userRemoval, dispatch, toast]);

	const openDeleteConfirmBox = (user) => {
		setUserToDelete(user);
		onOpen();
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

	useEffect(() => {
		if (userList?.length > 0) {
			const sorted = [...userList].sort((a, b) => {
				// Sortuj użytkowników na podstawie daty rejestracji
				const dateA = new Date(a.createdAt);
				const dateB = new Date(b.createdAt);
				return dateB - dateA;
			});
			setSortedUserList(sorted);
		}
	}, [userList]);

	// Obliczanie indeksu pierwszego i ostatniego użytkownika na aktualnej stronie
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = sortedUserList?.slice(indexOfFirstUser, indexOfLastUser);

	// Funkcja obsługująca zmianę strony
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Obliczanie liczby stron
	const totalPages = Math.ceil(sortedUserList?.length / usersPerPage);

	return (
		<>
			<Box>
				{error && (
					<Alert status='error'>
						<AlertIcon></AlertIcon>
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
										<Th textAlign='center'>Imię</Th>
										<Th textAlign='center'>Nazwisko</Th>
										<Th textAlign='center'>Data rejestracji</Th>
										<Th textAlign='center'>Email</Th>
										<Th textAlign='center'>Zweryfikowany</Th>
										<Th textAlign='center'>Admin</Th>
										<Th textAlign='center'>Actions</Th>
										{/* <Th>Nr telefonu</Th> */}
									</Tr>
								</Thead>

								{sortedUserList ? (
									<Tbody className=''>
										{currentUsers.map((user) => (
											<Tr key={user._id}>
												<Td textAlign='center'>
													<Image
														rounded='full'
														w='55px'
														h='55px'
														objectFit='cover'
														src={user?.image?.filePath}
														onClick={() => openImageModal(user?.image?.filePath, user.firstName)}
														cursor='pointer'
													/>
												</Td>
												<Td textAlign='center'>
													{user.firstName}
													{user._id === userInfo._id ? ' (Ty)' : ''}
												</Td>
												<Td textAlign='center'>{user.lastName}</Td>
												<Td textAlign='center'>{new Date(user.createdAt).toLocaleDateString('pl-PL')}</Td>
												<Td textAlign='center'>{user.email}</Td>
												<Td textAlign='center'>
													{user?.isVerified === true ? (
														<CheckCircleIcon color='green.500' />
													) : (
														<CheckCircleIcon color='red.500' />
													)}
												</Td>
												<Td textAlign='center'>
													{user.isAdmin === 'true' ? <CheckCircleIcon color='orange.500' /> : ''}
												</Td>
												<Td textAlign='center'>
													<Button
														isDisabled={user._id === userInfo._id}
														variant='outline'
														onClick={() => openDeleteConfirmBox(user)}
													>
														<DeleteIcon mr='5px' /> Usuń{' '}
													</Button>
												</Td>
											</Tr>
										))}
									</Tbody>
								) : (
									<Tbody className='absolute inset-0 flex items-center justify-center'>
										<Tr>
											<Td colSpan={5}>
												<Spinner size='xl' />
											</Td>
										</Tr>
									</Tbody>
								)}
							</Table>
							<Text marginTop={6}>
								Liczba użytkowników{' '}
								<Text color='orange' fontWeight='bold' as='span'>
									{userList?.length}
								</Text>
							</Text>
						</TableContainer>
						<ConfirmRemovalAlert
							isOpen={isOpen}
							onOpen={onOpen}
							onClose={onClose}
							cancelRef={cancelRef}
							itemToDelete={userToDelete}
							deleteAction={deleteUser}
						/>
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
			<Stack direction='row' spacing={2} mt={4} mb={4} justify='center'>
				{Array.from({ length: totalPages }, (_, index) => {
					console.log(index);
					// Warunki do wyrenderowania przycisku, kropek lub nic
					if (
						index < 3 || // Trzy pierwsze strony
						(currentPage === 1 && index >= currentPage - 1 && index <= currentPage + 1) || // Dla strony 1
						(currentPage > 1 && index >= currentPage - 2 && index <= currentPage) || // Aktualna strona oraz dwie poprzednie dla stron większych niż 1
						index === totalPages - 1 // Ostatnia strona
					) {
						return (
							<Button
								key={index}
								onClick={() => handlePageChange(index + 1)}
								colorScheme={currentPage === index + 1 ? 'orange' : 'gray'}
							>
								{index + 1}
							</Button>
						);
					} else if (index === totalPages - 2) {
						// Kropki po trzech pierwszych stronach
						return (
							<span style={{alignSelf: 'flex-end'}} key='dots'>
								...
							</span>
						);
					}
					return null; // Pomijaj pozostałe strony
				})}
			</Stack>
		</>
	);
};

export default UserTab;

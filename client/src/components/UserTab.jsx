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
	useEffect(() => {
		console.log(userList);
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

	const openDeleteConfrimBox = (user) => {
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

	return (
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
							<Thead >
								<Tr >
									<Th >Zdjęcie</Th>
									<Th textAlign="center">Imię</Th>
									<Th textAlign="center">Nazwisko</Th>
									<Th textAlign="center">Data rejestracji</Th>
									<Th textAlign="center">Email</Th>
									<Th textAlign="center">Zweryfikowany</Th>
									<Th textAlign="center">Admin</Th>
									<Th textAlign="center">Actions</Th>
									{/* <Th>Nr telefonu</Th> */}
								</Tr>
							</Thead>
							<Tbody className=''>
								{userList &&
									userList.map((user) => {
										return (
											<Tr key={user._id}>
												<Td textAlign="center">
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
												<Td textAlign="center" >
													{user.firstName}
													{user._id === userInfo._id ? ' (Ty)' : ''}
												</Td>
												<Td  textAlign="center" >{user.lastName}</Td>
												<Td textAlign="center">{new Date(user.createdAt).toLocaleDateString('pl-PL')}</Td>
												<Td textAlign="center">{user.email}</Td>
												<Td textAlign="center"  >
													{user?.isVerified === true ? (
														<CheckCircleIcon color='green.500' />
													) : (
														<CheckCircleIcon color='red.500' />
													)}
												</Td>

												<Td textAlign="center" >{user.isAdmin === 'true' ? <CheckCircleIcon color='orange.500' /> : ''}</Td>
												<Td textAlign="center">
													<Button
														isDisabled={user._id === userInfo._id}
														variant='outline'
														onClick={() => openDeleteConfrimBox(user)}
													>
														<DeleteIcon mr='5px' /> Usuń{' '}
													</Button>
												</Td>
											</Tr>
										);
									})}
							</Tbody>
						</Table>
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
	);
};

export default UserTab;

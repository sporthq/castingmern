import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

const ConfirmRemovalAlert = ({ isOpen, onClose, cancelRef, itemToDelete, deleteAction }) => {
	const dispatch = useDispatch();
	const onDeleteItem = () => {
		dispatch(deleteAction(itemToDelete._id));
		onClose();
	};
	const isUser = itemToDelete.hasOwnProperty('firstName');
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Usuń {itemToDelete.movieName || itemToDelete.firstName}
					</AlertDialogHeader>
					<AlertDialogBody>Jesteś pewny? {!isUser ? <p>Usuwając casting usuwasz również zapisy na niego!</p>: ''}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>Anuluj</Button>
                        <Button colorScheme='red' onClick={onDeleteItem} ml={3}>Usuń {itemToDelete.movieName || itemToDelete.firstName}</Button>
                    </AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default ConfirmRemovalAlert;

import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Text,
	useColorModeValue,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';

const TestDisclaimer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
		if (!hasSeenDisclaimer) {
			setIsModalOpen(true);
			localStorage.setItem('hasSeenDisclaimer', 'true');
		}
	}, []);

	return (
		<>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Strona testowa</ModalHeader>
						<ModalBody>
							<Text>Ta strona jest wersją testową, a wszelkie castingi i informacje zawarte na niej są fikcyjne.</Text>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme='orange' onClick={handleCloseModal}>
								Rozumiem
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};

export default TestDisclaimer;

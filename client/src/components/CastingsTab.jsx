import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Spinner,
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
	Accordion,
	AccordionItem,
	AccordionButton,
	Text,
	AccordionPanel,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCastings, resetCastingError } from '../redux/actions/castingActions';

import CastingTableItem from './CastingTableItem';
import AddNewCasting from './AddNewCasting';


const CastingsTab = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();

	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.admin);
	const { castings, castingUpdate } = useSelector((state) => state.castings);
	const [sortedCastings, setSortedCastings] = useState([]);
	const toast = useToast();

	useEffect(() => {
		dispatch(getCastings());
		dispatch(resetCastingError());
		if (castingUpdate) {
			toast({ description: 'Casting został zaktualizowany', status: 'success', isClosable: true });
		}
	}, [, dispatch, toast, castingUpdate]);

	useEffect(() => {
		if (castings.length > 0) {
			const sorted = [...castings].sort((a, b) => {
				// Sortuj castingi na podstawie daty dodania
				const dateA = new Date(a.createdAt);
				const dateB = new Date(b.createdAt);
				return dateB - dateA;
			});
			setSortedCastings(sorted);
		}
	}, [castings]);
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
					<Accordion allowToggle>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex='1' textAlign='right'>
										<Text mr='8px' fontWeight='bold'>
											{' '}
											Dodaj nowy casting{' '}
										</Text>
									</Box>
								</AccordionButton>
							</h2>
							<AccordionPanel pb='4'>
								<Table>
									<Tbody>
										<AddNewCasting />
									</Tbody>
								</Table>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Table variant='simple' size='lg'>
						<Thead>
							<Tr>
								<Th>Zdjęcie</Th>
								<Th>Opis</Th>
								<Th>Nazwa filmu i Miasto</Th>
								<Th>Ostatnio dodany</Th>
								<Th>Akcje</Th>
							</Tr>
						</Thead>
						<Tbody>
							{sortedCastings.map((casting,index) => (
								<CastingTableItem key={casting._id} casting={casting} index={index} />
							))}
						</Tbody>
					</Table>
				</Box>
			)}
		</Box>
	);
};

export default CastingsTab;

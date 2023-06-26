// import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import {
	Center,
	WrapItem,
	Wrap,
	Box,
	Spinner,
	Stack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Heading,
} from '@chakra-ui/react';

import CastingCard from '../components/CastingCard';

import { useDispatch, useSelector } from 'react-redux';

import { getCastings } from '../redux/actions/castingActions';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
const CastingsScreen = () => {
	const dispatch = useDispatch();
	const castingList = useSelector((state) => state.castings);
	const { loading, error, castings } = castingList;

	const [sortedCastings, setSortedCastings] = useState([]);

	useEffect(() => {
		dispatch(getCastings());
	}, [dispatch]);

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
		<>
			<Helmet>
				<title>Lista Castingów</title>
				<meta
					name='description'
					content='Zobacz naszą listę aktualnych castingów filmowych. Dołącz do nas i miej szansę na wystąpienie w filmie! Przeglądaj castingi różnych produkcji i zapisz się już dziś.'
				/>
				<link rel='canonical' href='/' />
			</Helmet>
			<Heading as='h1' fontSize={{ base: '4xl', sm: '5xl', md: '5xl', lg: '6xl' }} my={20} textAlign='center'>
				Lista Castingów
			</Heading>

			<Wrap spacing={65} align={'baseline'} justify='center' minHeight='100vh' mt={'12'} pb={20}>
				{loading ? (
					<Stack direction='row' spacing={4}>
						<Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				) : error ? (
					<Alert status='error'>
						<AlertIcon />
						<AlertTitle>Upps!</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				) : (
					<>
						{sortedCastings.map((casting) => (
							<WrapItem key={casting._id}>
								<Center className='xs:p-[10px]' maxW='550px' maxH='550px'>
									<CastingCard casting={casting} />
								</Center>
							</WrapItem>
						))}
					</>
				)}
			</Wrap>
		</>
	);
};

export default CastingsScreen;

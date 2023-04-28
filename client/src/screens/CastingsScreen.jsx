// import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import { Center, WrapItem, Wrap, Box, Spinner, Stack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

import CastingCard from '../components/CastingCard';

import { useDispatch, useSelector } from 'react-redux';

import { getCastings } from '../redux/actions/castingActions';

import { useEffect } from 'react';
const CastingsScreen = () => {
	const dispatch = useDispatch();
	const castingList = useSelector((state) => state.castings);
	const { loading, error, castings } = castingList;

	useEffect(() => {
		dispatch(getCastings());
	}, [dispatch]);
	return (
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
				castings.map((casting) => (
					<WrapItem key={casting._id}>
						{/* <Center w='550px' h='550px'> */}
						<Center maxW='550px' maxH='550px'>
							<CastingCard casting={casting} />
						</Center>
					</WrapItem>
				))
			)}
		</Wrap>
	);
};

export default CastingsScreen;

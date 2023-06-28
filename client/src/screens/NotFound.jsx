import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink, useSearchParams  } from 'react-router-dom';

const NotFound = () => {
	const [searchParams] = useSearchParams();
	const error = searchParams.get('error');

	
	let errorMsg = 'Strona o podanym adresie nie istnieje';
	if (error === 'Casting nie istnieje') {
		errorMsg = 'Nie ma takiego castingu';
	}

	console.log(error);
	return (
		<Box minH={'2xl'} mt={130} display='flex' flexDirection='column' textAlign='center' alignItems='center'>
			<Heading mb={{ base: 2, md: 4 }}>Błąd 404 - Strona nie odnaleziona</Heading>
			<Text mb={{ base: 2, md: 4 }}>{errorMsg}</Text>
			<Button as={ReactLink} colorScheme='orange' to={!error ? '/' : '/castingi'}>
				{!error  ? ' Wróć do strony głównej' : 'Wróć do listy castingów'}
			</Button>
		</Box>
	);
};

export default NotFound;

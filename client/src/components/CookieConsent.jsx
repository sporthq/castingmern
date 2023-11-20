import React from 'react';
import { useCookies } from 'react-cookie';
import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['cookieConsent']);
	const giveCookieConsent = (e) => {
		e.preventDefault();
		setCookie('cookieConsent', true, { path: '/' });
	};

	return (
		<Box
			position='fixed'
			left={'50%'}
			transform='translateX(-50%)'
			bottom={0}
			width='100%'
			p={4}
			bg={useColorModeValue('gray.100', 'gray.900')}
			textAlign='center'
			className='flex-col md:flex md:flex-row justify-center items-center'
		>
			<Text>
				Kontynuując przeglądanie tej strony internetowej, zgadzasz się na korzystanie z plików cookie zgodnie z naszą
				<Link to='/'>polityką prywatności </Link>
			</Text>
			<Button mt={3} ml={6} colorScheme={'orange'} onClick={giveCookieConsent}>
				Akceptuje
			</Button>
		</Box>
	);
};

export default CookieConsent;

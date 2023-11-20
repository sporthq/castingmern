import {
	Button,
	ButtonGroup,
	Container,
	Divider,
	IconButton,
	Input,
	Stack,
	Text,
	Tooltip,
	useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = ({children}) => (
	<Container as='footer' role='contentinfo'>
		<Divider bg={useColorModeValue('gray.600', 'gray.600')} h='.1px' py={'.5px'} />
		<Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
			<Text fontSize='sm' color='subtle'>
				&copy; {new Date().getFullYear()} Created by <Tooltip label="Jesteś zainteresowny współpracą? Napisz do mnie na FB lub Twitterze!" aria-label='A tooltip'>
 Sebastian Nowak
</Tooltip>
			</Text>
			<ButtonGroup variant='ghost'>
				<IconButton
					as='a'
					href='https://www.facebook.com/sebastian.nowak.75/'
					target='_blank'
					rel='noopener'
					aria-label='LinkedIn'
					icon={<FaFacebook fontSize='1.25rem' />}
				/>
				<IconButton
					target='_blank'
					rel='noopener'
					as='a'
					href='https://github.com/sporthq'
					aria-label='GitHub'
					icon={<FaGithub fontSize='1.25rem' />}
				/>
				<IconButton
					target='_blank'
					rel='noopener'
					as='a'
					href='https://twitter.com/Seba1_01'
					aria-label='Twitter'
					icon={<FaTwitter fontSize='1.25rem' />}
				/>
			</ButtonGroup>
		</Stack>
		{/* {children} */}
	</Container>
);

export default Footer;

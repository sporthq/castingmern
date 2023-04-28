import {
	Flex,
	Circle,
	Box,
	Image,
	Badge,
	Icon,
	Button,
	Tooltip,
	Stack,
	Link,
	HStack,
	Text,
	useColorMode,
	useColorModeValue,
	Divider,
} from '@chakra-ui/react';
import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { MdCameraRoll } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';

import { motion } from 'framer-motion';
const FramerImage = motion(Image);

const MAX_WORDS_SHORT = 8;
const MAX_WORDS_LONG = 15;

const CastingCard = ({ casting }) => {
	const imageRef = useRef();
	const [maxWords, setMaxWords] = useState(MAX_WORDS_SHORT);
	const [imageWidth, setImageWidth] = useState();



	const bgProvider = useColorModeValue('orange.800', 'orange.800');



	useEffect(() => {
		const handleSizeWordBox = () => {
			console.log(imageRef);
			const width = imageRef.current.getBoundingClientRect().width;

			console.log('width' + width);
			setImageWidth(width);
			console.log(width);
			if (width < 400) {
				setMaxWords(MAX_WORDS_SHORT);
			} else {
				setMaxWords(MAX_WORDS_LONG);
			}
		};

		
		if (imageRef.current.complete) {
			// Obraz jest już w pełni załadowany
			handleSizeWordBox();
		  } else {
			console.log('czekamy na ladowanie');
			// Obraz nie jest jeszcze załadowany, słuchaj zdarzenia onLoad
			imageRef.current.onload = handleSizeWordBox;
		  }
		// handleSizeWordBox(); // pierwsze wywołanie
		window.addEventListener('resize', handleSizeWordBox);
		return () => window.removeEventListener('resize', handleSizeWordBox);
	}, [imageWidth]);

	return (
		<Stack
			// ref={imageRef}
			p={2}
			spacing='3px'
			bg={useColorModeValue('gray.100', 'gray.900')}
			// w="200px"
			h='450px'
			borderWidth={'1px'}
			rounded={'lg'}
			shadow={'lg'}
			position={'relative'}
			overflow='hidden'
			
		>
			{/* zielone kólko z prawej  */}
			{/* {casting.isNew && <Circle size='10px ' position={'absolute'} top={2} right={2} bg='green'></Circle>} */}
			<Link as={ReactLink} to={`/casting/${casting._id}`}>
				<FramerImage
					ref={imageRef}
					whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
					src={casting.image}
					alt={casting.movieName}
					roundedTop='lg'
					maxH='290px'
					className='overflow-hidden mb-1'
				></FramerImage>
			</Link>
			<Flex alignItems='baseline' className='w-full pb-1'>
				<Box flex={1} maxH={'5'} alignItems='' className='my-1'>
					{casting.isNew && (
						<Badge rounded='full' px='2' colorScheme='green' className=''>
							NEW!
						</Badge>
					)}
				</Box>
				<Text className={`font-semibold ${maxWords <= MAX_WORDS_SHORT ? 'text-sm' : 'text-lg'}`}>{casting.town}</Text>
			</Flex>

			<Divider bg={useColorModeValue('gray.600', 'gray.600')} h='.1px' py={'.5px'} className='' />

			<Text className='py-1 pl-1' maxW={imageWidth}>
				{casting.description.split(' ').slice(0, maxWords).join(' ').replace(/[.,]+$/, '')}
				{(maxWords === MAX_WORDS_SHORT || maxWords === MAX_WORDS_LONG) && '...'}
			</Text>
			<Link className='font-bold text-right' as={ReactLink} to={`/casting/${casting._id}`} py='2' cursor='pointer'>
				Czytaj dalej...
			</Link>
		</Stack>
	);
};

export default CastingCard;

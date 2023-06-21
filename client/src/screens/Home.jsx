import {
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Heading,
	Hide,
	Image,
	Show,
	Text,
	VStack,
	useColorModeValue,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

import { easeInOut, motion } from 'framer-motion';
import homeImg from '../assets/images/claps-removebg.png';
import homeImgLarge from '../assets/images/claps-large.png';
import homeImgMedium from '../assets/images/claps-medium.png';
import homeImgSmall from '../assets/images/claps-small.png';

import TransitionEffect from '../components/TransitionEffect';
import Footer from '../components/Footer';

const FrameButton = motion(Button);
const Home = () => {
	const quote = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,

			transition: {
				// duration: 0.5,
				delay: 0.5,
				staggerChildren: 0.08,
			},
		},
	};

	const singleWord = {
		initial: {
			opacity: 0,
			y: 50,
		},
		animate: {
			opacity: 1,
			y: 0,

			transition: {
				duration: 0.75,
			},
		},
	};

	const AnimatedText = ({ text, className = '' }) => {
		return (
			// <div className=' w-full mx-auto py-4 flex items-center justify-center text-center overflow-hidden'>
			<div className=' w-[95%] 2xl:w-[80%] mx-auto py-4 flex items-start justify-center text-center overflow-hidden '>
				<motion.h1
					variants={quote}
					initial='initial'
					animate='animate'
					className={`inline-block w-full text-dark font-bold    ${className}`}
				>
					{text.split(' ').map((word, index) => (
						<motion.span variants={singleWord} className='inline-block' key={word + '-' + index}>
							{word}&nbsp;
						</motion.span>
					))}
				</motion.h1>
			</div>
		);
	};

	const FrameImg = motion(Image);

	return (
		<>
			<TransitionEffect />
			<Flex
				direction={{ base: 'column' }}
				justify={{ base: 'end', lg: 'center' }}
				alignContent='center'
				alignItems='center'
				bg={{ lg: '' }}
				mx={{ lg: 'auto' }}
				// className='border border-sky-500  '
				position={'relative'}
			>
				<Box
					bg=''
					w={{ base: '100%', lg: 'auto' }}
					h={{ base: 'fit-content', lg: '50%' }}
					// paddingTop={{ '2xl': "15px" }}
					// p='-20'
					// className='text-5xl  '
					fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '6xl', xl: '7xl', '2xl': '7xl' }}
				>
					<AnimatedText className='pt-6  ' text='Witaj na naszej stronie. Znajdź casting dla siebie!' />
				</Box>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					// bg={{ xl: 'blue.100' }}

					alignItems={{ base: 'center', xl: 'center' }}
					justify={{ base: 'center', md: 'space-around', xl: 'space-between',  }}
					mt={'10'}
					h='100%'
					// backgroundColor="red.500"
				>
					<Box
						// ml="-64"
						px={{ base: '20px' }}
						w={{ base: '100%', sm: '75%', md: '75%', lg: '70%', xl: '50%', '2xl': '35%' }}
						bg={''}
						// marginLeft={'-140px'}
						marginLeft={{ base: '-180px', sm: '-380px', md: '-130px', lg: '-140px', xl: '-130px' }}
						backgroundColor=""
						marginRight={{ "2xl": '125px' }}
					>
						<FrameImg
							initial={{ rotate: '-45', x: '-500px' }}
							animate={{ rotate: 0, x: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							srcSet={`${homeImgSmall} 450w, ${homeImgMedium} 768w, ${homeImgLarge} 1280w`}
						/>
					</Box>

					<Box   
						className='hidden xl:block self-center '>
						<Center mt={'10'} pb={'40px'}>
							<FrameButton
								whileHover={{
									y:-3,
									transition: { duration: 0.1 },
								}}
								whileTap={{ scale: 0.9 }}
								as={ReactLink}
								to='/castings'
								variant={{ base: 'solid' }}
								fontWeight='bold'
								color={'white'}
								bg={'orange.400'}
								_hover={{ bg: 'orange.300' }}
								fontSize={{ md: 'lg', lg: 'xl' }}
								p={{ md: '25px', lg: '30px' }}
							>
								Pokaż castingi &rarr;
							</FrameButton>
						</Center>
					</Box>

					<VStack
						spacing={{ base: '20px', lg: '40px' }}
						bg=''
						w={{ base: '100%', md: '50%', lg: '60%', '2xl': '40%' }}
						pr={{ base: '20px', '2xl': '20x' }}
						mr={{ '2xl': '0px' }}
					>
						<Heading
							fontSize={{ base: '4xl', sm: '5xl', md: '5xl', lg: '6xl' }}
							className='xs:underline  xs:decoration-orange-400 xs:underline-offset-5'
							mt={8}
							mb={-2}
						>
							Informacje
						</Heading>
						<Text
							className=' '
							width='90%'
							textAlign='center'
							mt={10}
							fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
							color={useColorModeValue('blackAlpha.700', 'whiteAlpha.800')}
						>
							Zapraszamy do naszej strony, gdzie oferujemy rejestrację na castingi dla statystów filmowych. Jeśli
							marzysz o udziale w produkcjach filmowych, to jest to świetna okazja dla Ciebie. Współpracujemy z wieloma
							reżyserami i producentami filmowymi, którzy szukają statystów do swoich projektów.
						</Text>

						<Center mt={'10'} pb={'40px'} className='xl:hidden' visibility={{ xl: 'hidden' }}>
							<Button
								as={ReactLink}
								to='/castings'
								variant={{ base: 'solid' }}
								fontWeight='bold'
								color={'white'}
								bg={'orange.400'}
								_hover={{ bg: 'orange.300' }}
								fontSize={{ md: 'lg', lg: 'xl' }}
								p={{ md: '25px', lg: '30px' }}
							>
								Pokaż castingi &rarr;
							</Button>
						</Center>
					</VStack>
				</Flex>
			</Flex>

			{/* button nie wiem czy bedzie przydany - pokaz wszyskie castingi  */}
			{/* <Button
				as={ReactLink}
				rounded='xl'
				to={'/castings'}
				colorScheme='orange'
				ml='auto'
				order={3}
				w='1/2'
				mt={'14'}
				fontWeight='semibold'
			>
				Zobacz Wszystkie Castingi
			</Button> */}
		</>
	);
};

export default Home;

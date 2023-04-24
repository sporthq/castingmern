import { Button, Heading, Text } from '@chakra-ui/react';
import {motion} from 'framer-motion'
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
				duration: 1,
			},
		},
	};

	const AnimatedText = ({ text, className = '' }) => {
		return (
			<div className=' w-full mx-auto py-4 flex items-center justify-center text-center overflow-hidden'>
				<motion.h1
					variants={quote}
					initial='initial'
					animate='animate'
					className={`inline-block w-full text-dark font-bold capitalize text-6xl ${className}`}
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
	return (
		<>
			
			<Flex bg="red"> 

                 <AnimatedText className='py-6 mx-10' text='Witaj na naszej stronie, znajdź casting dla siebie!' />
			</Flex>
		
		</>
	);
};

export default Home;

// import { Center, Wrap, WrapItem } from '@chakra-ui/react';
import { Center, WrapItem, Wrap, Box } from '@chakra-ui/react';
import { castings } from '../castings';
import CastingCard from '../components/CastingCard';
const CastingsScreen = () => {
	return (
		// <Wrap spacing={30} align={"baseline"} justify='center' minHeight='100vh'>
		<Wrap spacing={65}  align={"baseline"} justify='center' minHeight='100vh' mt={"12"} pb={20}>
		
			{castings.map((casting) => (
        
				<WrapItem key={casting._id}>
					{/* <Center w='550px' h='550px'> */}
					<Center maxW='550px' maxH='550px'>
						<CastingCard  casting={casting}/>
					</Center>
				</WrapItem>
			))}
		</Wrap>
	);
};

export default CastingsScreen;

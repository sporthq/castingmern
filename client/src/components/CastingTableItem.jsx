import { useState, useRef } from 'react';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateCasting, deleteCasting } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import {
	Badge,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Image,
	Input,
	Switch,
	Td,
	Text,
	Textarea,
	Tooltip,
	Tr,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
const CastingTableItem = ({ casting, index }) => {
	

	const cancelRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [movieName, setMovieName] = useState(casting.movieName);
	const [town, setTown] = useState(casting.town);
	const [imageFile, setImageFile] = useState(casting.image?.filePath);
	const [imagePreview, setImagePreview] = useState(casting.image?.filePath);
	const [description, setDescription] = useState(casting.description);
	const [isNewCasting, setIsNewCasting] = useState(casting.isNewCasting);

	const [castingIsEdited, setCastingIsEdited] = useState(true)
	const [castingToDelete, setCastingToDelete] = useState('');
	
	
	const dispatch = useDispatch();


	const onSaveCasting = () => {

		dispatch(updateCasting(movieName, imageFile, town, description, isNewCasting, casting._id,castingIsEdited ));
	};

	const openDeleteConfrimBox = (casting) => {
		setCastingToDelete(casting);
		onOpen();
	};

	const handleTownChange = (e) => {
		console.log(e.target.value);
		const newTownValue = e.target.value;

		setTown(newTownValue);
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];

		console.log(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const newImage = {
					file: file,
					preview: reader.result,
				};
				console.log(newImage);
				setImageFile(file);
				setImagePreview(newImage.preview);
			};
			reader.readAsDataURL(file);
		}
	};


	const handleImageClick = () => {
		document.getElementById(`imageInput-${index}`).click();
	};
	return (
		<>
			<Tr>
				<Td>
					<input
						type='file'
						id={`imageInput-${index}`}
						name='image'
						accept='image/*'
						style={{ display: 'none' }}
						onChange={handleImageChange}
					/>
					{/* <Input size='sm' value={image} onClick={handleImageClick} readOnly /> */}
					<Tooltip label={casting.image?.fileName} fontSize='sm'>
					<Image src={imagePreview} boxSize='100px' fit='contain' onClick={handleImageClick} />
					</Tooltip>
					
				</Td>
				<Td>
					<Textarea
						w='270px'
						h='120px'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						size={'sm'}
					></Textarea>
				</Td>
				<Td>
					<Flex direction='column' gap='2'>
						<Input size='sm' value={movieName} onChange={(e) => setMovieName(e.target.value)}></Input>

						<Input size='sm' value={town} onChange={handleTownChange}></Input>
					</Flex>
				</Td>
				<Td>
					<Flex direction='column' gap='2'>
						<FormControl display={'flex'} alignItems='center'>
							<FormLabel htmlFor='castingIsNewFlag' mb={'0'} fontSize='sm'>
								Dodaj
								<Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
									New
								</Badge>
								do castingu
							</FormLabel>
							<Switch
								id='castingIsNewFlag'
								onChange={() => setIsNewCasting(!isNewCasting)}
								isChecked={isNewCasting}
							></Switch>
						</FormControl>
						
						<Switch display='none' disabled id='isCastingEdited'  isChecked={castingIsEdited} onChange={()=>setCastingIsEdited(!castingIsEdited)}></Switch>
					</Flex>
				</Td>
				<Td>
					<VStack>
						<Button colorScheme='red' w='160px' variant='outline' onClick={openDeleteConfrimBox}>
							<DeleteIcon mr='5px' />
							Usuń Casting
						</Button>
						<Button colorScheme='green' w='160px' variant='outline' onClick={onSaveCasting}>
							<MdOutlineDataSaverOn className='mr-[5px]' />
							Zapisz zmiany
						</Button>
					</VStack>
				</Td>
				<Td display={'none'}>
					<ConfirmRemovalAlert
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						cancelRef={cancelRef}
						itemToDelete={casting}
						deleteAction={deleteCasting}
					/>
				</Td>
			</Tr>
		</>
	);
};

export default CastingTableItem;

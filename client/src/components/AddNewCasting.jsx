import { useEffect, useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCasting } from '../redux/actions/adminActions';
import {
	Badge,
	Button,
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
} from '@chakra-ui/react';

const AddNewCasting = () => {
	const dispatch = useDispatch();

	const { error } = useSelector((state) => state.admin);

	console.log(error);
	const [movieName, setMovieName] = useState('');
	const [town, setTown] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [isNewCasting, setIsNewCasting] = useState(true);
	const [imagePreview, setImagePreview] = useState('');

const [isCastingEdited, setIsCastingEdited] = useState(false)
	console.log(image);
	const createNewCasting = () => {
		
		

		console.log(image);
		console.log(movieName);
		dispatch(uploadCasting( movieName, image, town, description, isNewCasting , isCastingEdited,resetFormValues))
		  
	  };
	const resetFormValues = () => {
		setMovieName('');
		setTown('');
		setImage('');
		setDescription('');
		setIsNewCasting(true);
		setImagePreview('')
	};

	const hadnleImageChange = e => {
		const file = e.target.files[0]

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const newImage = {
					file: file,
					preview: reader.result,
				};
				console.log(newImage);
				setImage(file);
				setImagePreview(newImage.preview);
			};
			reader.readAsDataURL(file);
		}
	}
	const handleImageClick = () => {
		document.getElementById(`image`).click();
	};
	return (
	
		<Tr>
			<Td>
				<Text fontSize='sm'>Dodaj Zdjęcie</Text>
				<Tooltip label={'Ustaw nazwę zdjęcia'} fontSize='sm'>
					<Input id='image' display='none' name='image' type='file' size='sm' onChange={hadnleImageChange}></Input>

				</Tooltip>
					<Image onClick={handleImageClick} src={imagePreview ? imagePreview : `https://placehold.co/100x100?text=++`} boxSize='100px' fit='contain'  /> 
			</Td>
			<Td>
				<Text fontSize='sm'>Opis</Text>
				<Textarea value={description} w='270px' h='120px' size='sm' onChange={(e) => setDescription(e.target.value)} />
			</Td>
			<Td>
				<Text fontSize='sm'>Nazwa filmu</Text>
				<Input size='sm' value={movieName}  onChange={(e) => setMovieName(e.target.value)}></Input>
				<Text fontSize='sm'>Miasto</Text>
				<Input size='sm' value={town} onChange={(e) => setTown(e.target.value)}></Input>
			</Td>
			<Td>
				<Text> </Text>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='castingIsNewFlag' mb='0' fontSize='sm'>
						Dodaj{' '}
						<Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
							New
						</Badge>
						do castingu
					</FormLabel>
					<Switch id='castingIsNewFlag' onChange={() => setIsNewCasting(!isNewCasting)} isChecked={isNewCasting} />
				</FormControl>
			</Td>
			<Td>
				<VStack>
					<Button variant='outline' w='160px' colorScheme='green' onClick={() => createNewCasting()}>
						<MdDriveFolderUpload />
						<Text ml='2'>Zapisz Casting</Text>
					</Button>
				</VStack>
			</Td>
		</Tr>
		
	);
};

export default AddNewCasting;

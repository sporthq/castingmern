import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import UserTab from '../components/UserTab';
import CastingsTab from '../components/CastingsTab';
import UserEnroledCastingTab from './../components/UserEnroledCastingTab';
const AdminConsole = () => {
	const { userInfo } = useSelector((state) => state.user);
	const location = useLocation();
	return userInfo && userInfo.isAdmin === 'true' ? (
		<Box p={'20px'} minH='100vh'>
			<Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
				<Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' mb={{ base: 12, md: 'none' }}>
					<Heading fontSize='2xl' fontWeight='extrabold'>
						Panel Administracyjny{' '}
					</Heading>
					<Tabs siez='md' variant='enclosed'>
						<TabList>
							<Tab>Użytkownicy</Tab>
							<Tab>Castingi</Tab>
							<Tab>Zapisy na Castingi</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<UserTab></UserTab>
							</TabPanel>
							<TabPanel>
								<CastingsTab></CastingsTab>
							</TabPanel>
							<TabPanel>
								<UserEnroledCastingTab></UserEnroledCastingTab>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Stack>
			</Stack>
		</Box>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default AdminConsole;

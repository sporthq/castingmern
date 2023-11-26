import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Heading, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import UserTab from '../components/UserTab';
import CastingsTab from '../components/CastingsTab';
import UserEnroledCastingTab from './../components/UserEnroledCastingTab';
import { Helmet } from 'react-helmet-async';

const AdminConsole = () => {
	const { userInfo, loading } = useSelector((state) => state.user);
	console.log(loading);
	const location = useLocation();

	return (
		<>
			{userInfo && userInfo?.isAdmin === 'true' ? (
				<>
					<Helmet>
						<meta name='robots' content='noindex' />
						<link rel='canonical' href='/admin-console' />
					</Helmet>
					<Box p={'20px'} minH='100vh'>
						<Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
							<Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' mb={{ base: 12, md: 'none' }}>
								<Heading fontSize='2xl' fontWeight='extrabold'>
									Panel Administracyjny{' '}
								</Heading>
								<Tabs size='md' variant='enclosed'>
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
				</>
			) : (
				<Box display='flex' justifyContent='center' alignItems='center' minH='100vh'>
					<Spinner size='xl'/>
					<Navigate to='/login' replace={true} state={{ from: location }} />
				</Box>
			)}
		</>
	);
};

export default AdminConsole;

import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from 'common/components/Header/Header';
import {ErrorSnackbar} from 'common/components/ErrorSnackBar';
import {useAppSelector} from 'app/store';
import {getIsAppAppMakingRequest} from 'app/selectors';
import {Backdrop, CircularProgress} from '@mui/material';

export const MainLayout = () => {
		const isAppMakeRequest = useAppSelector(getIsAppAppMakingRequest)
		return (
				<>
						<Header/>
						{isAppMakeRequest &&
								<Backdrop sx={{color: '#fff', zIndex: 10}}
								          open={isAppMakeRequest}>
										<CircularProgress color="inherit"/>
								</Backdrop>
						}
						<Outlet/>
						<ErrorSnackbar/>
				</>
		);
};
